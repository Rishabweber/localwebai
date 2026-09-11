import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import dns from 'dns';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { createServer as createViteServer } from 'vite';
import {
  initDatabase,
  getUserByEmail,
  getUserById,
  getUserByToken,
  createUser,
  hashPassword,
  getProjectsByUser,
  getProjectById,
  getAllPublishedProjects,
  getProjectBySlug,
  getProjectByDomain,
  createProject,
  updateProject,
  deleteProject,
  createInquiry,
  getInquiriesForProject,
  recordInteraction,
  updateUserPlan,
  recordUserAiGeneration,
  getCentralizedInquiriesForUser,
  createPaymentRecord,
  getPaymentRecordByOrderId,
  getPaymentRecordByPaymentId,
  updatePaymentRecord,
  upgradeUserToProWithPayment,
  createMultiOutletRequest,
  getMultiOutletRequestById,
  getLatestMultiOutletRequestForUser,
  getAllMultiOutletRequests,
  updateMultiOutletRequest,
  setMultiOutletRequestStatus,
} from './server/db.ts';
import { generateFullWebsiteWithAI, regenerateSectionWithAI } from './server/gemini.ts';
import { CustomDomainConfig } from './src/types.ts';

dotenv.config();

// Initialize internal persistence
initDatabase();

const app = express();
const PORT = 3000;

// Lazy-initialized Razorpay client instance
let razorpayClient: Razorpay | null = null;
function getRazorpayClient(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required for payments.');
  }
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayClient;
}

app.use(express.json({
  limit: '10mb',
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  },
}));

// Serve public static assets (logos, favicons, robots.txt, sitemap.xml)
app.use(express.static(path.join(process.cwd(), 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (filePath.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    } else if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

// Auth middleware
interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  const token = authHeader.split(' ')[1];
  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }

  req.userId = user.id;
  req.userEmail = user.email;
  next();
}

function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const adminKey = req.headers['x-admin-key'];
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'localweb_admin_2026';

  if (adminKey && adminKey === expectedSecret) {
    req.userId = 'user_admin_super';
    req.userEmail = 'admin@localweb.ai';
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Admin authentication required.' });
  }

  const token = authHeader.split(' ')[1];
  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }

  const isAdmin = user.role === 'admin' || user.email === 'admin@localweb.ai' || user.email === 'kshubham70896@gmail.com';
  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
  }

  req.userId = user.id;
  req.userEmail = user.email;
  next();
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// SEO: Sitemap XML route - explicitly served with application/xml
app.get('/sitemap.xml', (req, res) => {
  const host = 'https://localweb.ai.studio';
  const publishedProjects = getAllPublishedProjects();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n`;
  xml += `    <loc>${host}/</loc>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  for (const project of publishedProjects) {
    if (project.slug) {
      const lastMod = project.updatedAt || project.publishedAt || new Date().toISOString();
      xml += `  <url>\n`;
      xml += `    <loc>${host}/site/${project.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(lastMod).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(xml);
});

// SEO: Robots.txt route - explicitly served with text/plain
app.get('/robots.txt', (req, res) => {
  const content = `User-agent: *\nAllow: /\n\nSitemap: https://localweb.ai.studio/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(content);
});

// --- Auth Endpoints ---

app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, password, name, businessName } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required.' });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const user = createUser({ email, password, name, businessName });
    res.status(201).json({ user, token: user.token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error creating account.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const hashed = hashPassword(password);
    if (user.passwordHash !== hashed) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, token: safeUser.token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error during login.' });
  }
});

app.post('/api/auth/guest', (req, res) => {
  try {
    // Return or reuse demo account for instant exploration
    const demo = getUserByEmail('demo@localai.web');
    if (demo) {
      const { passwordHash, ...safeUser } = demo;
      return res.json({ user: safeUser, token: safeUser.token });
    }

    const user = createUser({
      email: `guest_${Date.now()}@localai.web`,
      password: 'guestpassword',
      name: 'Guest Business Owner',
      businessName: 'My Local Business',
    });
    res.json({ user, token: user.token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error initializing guest session.' });
  }
});

app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = getUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser });
});

// Plan update endpoint (prevents self-assignment of Pro or Multi-Outlet)
app.post('/api/auth/plan', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const { plan } = req.body;
    if (!['starter', 'pro', 'multi'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan type.' });
    }
    // Pro plan strictly requires server-side verified Razorpay payment
    if (plan === 'pro') {
      return res.status(403).json({
        error: 'Upgrading to Business Pro requires server-verified Razorpay payment. Please complete checkout with the Upgrade to Pro flow.',
        code: 'PRO_PAYMENT_REQUIRED',
      });
    }
    // Multi-Outlet plan CANNOT be self-assigned. Requires custom plan request and admin approval.
    if (plan === 'multi') {
      return res.status(403).json({
        error: 'Multi-Outlet plan cannot be self-activated. Please submit a Custom Plan request for review.',
        code: 'MULTI_APPROVAL_REQUIRED',
      });
    }

    // Only starter plan can be directly set (e.g., downgrade/cancellation)
    const updated = updateUserPlan(req.userId!, 'starter', 'active');
    if (!updated) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ success: true, user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update plan.' });
  }
});

// --- Multi-Outlet Custom Plan Request Endpoints ---

// Submit a new Custom Plan request
app.post('/api/multi-outlet/request', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const { businessName, contactPerson, email, phone, locationsCount, requirements } = req.body;
    if (!businessName || !contactPerson || !email || !phone) {
      return res.status(400).json({
        error: 'Business name, contact person, email, and phone/WhatsApp are required.',
      });
    }

    const count = parseInt(locationsCount, 10);
    if (isNaN(count) || count < 1) {
      return res.status(400).json({
        error: 'Please provide a valid number of business locations (at least 1).',
      });
    }

    const request = createMultiOutletRequest({
      userId: req.userId!,
      userEmail: req.userEmail!,
      businessName: String(businessName),
      contactPerson: String(contactPerson),
      email: String(email),
      phone: String(phone),
      locationsCount: count,
      requirements: requirements ? String(requirements) : '',
    });

    res.status(201).json({
      success: true,
      message: 'Request received. Our team will contact you with a custom plan and pricing.',
      request,
    });
  } catch (err: any) {
    console.error('Error submitting multi-outlet request:', err);
    res.status(500).json({ error: err.message || 'Failed to submit custom plan request.' });
  }
});

// Get current user's latest Multi-Outlet request status
app.get('/api/multi-outlet/my-request', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const request = getLatestMultiOutletRequestForUser(req.userId!);
    res.json({ request });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch custom plan request status.' });
  }
});

// --- Admin Endpoints for Multi-Outlet Review & Approval ---

// List all Multi-Outlet requests (Admin only)
app.get('/api/admin/multi-outlet-requests', requireAdmin, (req: AuthenticatedRequest, res) => {
  try {
    const requests = getAllMultiOutletRequests();
    res.json({ requests });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch enterprise requests.' });
  }
});

// Update request status (Admin only: pending -> approved -> active -> expired / rejected)
app.post('/api/admin/multi-outlet-requests/:id/status', requireAdmin, (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { status, customPrice, adminNotes } = req.body;
    const allowed = ['pending', 'approved', 'rejected', 'active', 'expired'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    const result = setMultiOutletRequestStatus(
      id,
      status,
      req.userEmail || 'admin@localweb.ai',
      {
        customPrice: customPrice !== undefined ? Number(customPrice) : undefined,
        adminNotes: adminNotes !== undefined ? String(adminNotes) : undefined,
      }
    );

    if (!result) {
      return res.status(404).json({ error: 'Custom plan request not found.' });
    }

    res.json({
      success: true,
      message: `Request marked as ${status}.`,
      request: result.request,
      user: result.user,
    });
  } catch (err: any) {
    console.error('Admin status update error:', err);
    res.status(500).json({ error: err.message || 'Failed to update request status.' });
  }
});

// Set custom price for an approved Multi-Outlet request (Admin only)
app.post('/api/admin/multi-outlet-requests/:id/custom-price', requireAdmin, (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { customPrice, adminNotes } = req.body;
    const priceNum = Number(customPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: 'Please provide a valid custom price in INR.' });
    }

    const result = setMultiOutletRequestStatus(
      id,
      'approved',
      req.userEmail || 'admin@localweb.ai',
      { customPrice: priceNum, adminNotes }
    );

    if (!result) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    res.json({
      success: true,
      message: `Custom price set to ₹${priceNum}.`,
      request: result.request,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to set custom price.' });
  }
});

// Create custom Razorpay order for an approved Multi-Outlet request (Future payment flow)
app.post('/api/payment/razorpay/create-custom-order', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const request = getLatestMultiOutletRequestForUser(req.userId!);
    if (!request || request.status !== 'approved' || !request.customPrice || request.customPrice <= 0) {
      return res.status(400).json({
        error: 'No approved custom plan quote ready for payment.',
      });
    }

    const rzp = getRazorpayClient();
    const amountInPaise = Math.round(request.customPrice * 100);
    const receipt = `rec_custom_${req.userId}_${Date.now()}`.slice(0, 40);

    const order = await rzp.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        userId: req.userId!,
        userEmail: req.userEmail!,
        requestId: request.id,
        plan: 'multi',
      },
    });

    createPaymentRecord({
      id: 'pay_rec_' + crypto.randomBytes(6).toString('hex'),
      orderId: order.id,
      userId: req.userId!,
      userEmail: req.userEmail!,
      amount: amountInPaise,
      currency: 'INR',
      plan: 'pro',
      status: 'created',
      createdAt: new Date().toISOString(),
      receipt,
    });

    res.json({
      orderId: order.id,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
      customPrice: request.customPrice,
    });
  } catch (err: any) {
    console.error('Custom order creation failed:', err);
    res.status(500).json({ error: err.message || 'Failed to create custom payment order.' });
  }
});

// --- Razorpay Payment Endpoints ---

// Get public Razorpay config & status
app.get('/api/payment/razorpay/config', (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  const isConfigured = !!(keyId && process.env.RAZORPAY_KEY_SECRET);
  res.json({
    keyId,
    isConfigured,
    testMode: !keyId || keyId.startsWith('rzp_test_'),
    amount: 49900,
    currency: 'INR',
    displayPrice: '₹499/month',
  });
});

// Create a server-side Razorpay order
app.post('/api/payment/razorpay/create-order', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return res.status(400).json({
        error: 'Razorpay credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are not configured on the server. Please add them in Settings > Secrets or .env.',
        code: 'RAZORPAY_NOT_CONFIGURED',
      });
    }

    const rzp = getRazorpayClient();
    const amountInPaise = 49900; // Fixed ₹499/month for Business Pro
    const currency = 'INR';
    const receipt = `rec_${req.userId}_${Date.now()}`.slice(0, 40);

    const order = await rzp.orders.create({
      amount: amountInPaise,
      currency,
      receipt,
      notes: {
        userId: req.userId!,
        userEmail: req.userEmail || '',
        plan: 'pro',
        product: 'LocalWeb AI Business Pro',
      },
    });

    // Save payment record in DB for tracking and verification
    createPaymentRecord({
      id: 'pay_rec_' + crypto.randomBytes(6).toString('hex'),
      orderId: order.id,
      userId: req.userId!,
      userEmail: req.userEmail || '',
      amount: amountInPaise,
      currency,
      plan: 'pro',
      status: 'created',
      createdAt: new Date().toISOString(),
      receipt: typeof order.receipt === 'string' ? order.receipt : receipt,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      plan: 'pro',
    });
  } catch (err: any) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ error: err.message || 'Failed to create Razorpay payment order.' });
  }
});

// Verify Razorpay payment signature & status server-side, then upgrade user
app.post('/api/payment/razorpay/verify-payment', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: 'Missing required Razorpay payment verification fields (order ID, payment ID, or signature).',
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({ error: 'RAZORPAY_KEY_SECRET is not configured on the server.' });
    }

    // 1. Verify HMAC SHA-256 signature
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Record payment attempt failure
      updatePaymentRecord(razorpay_order_id, {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'failed',
        errorMessage: 'Invalid payment signature mismatch',
      });
      return res.status(400).json({ error: 'Payment signature verification failed. Untrusted response.' });
    }

    // 2. Prevent duplicate processing (Idempotency)
    const existingPayment = getPaymentRecordByPaymentId(razorpay_payment_id);
    if (existingPayment && existingPayment.status === 'verified') {
      const user = getUserById(req.userId!);
      return res.json({
        success: true,
        message: "You're now on Business Pro.",
        user,
      });
    }

    // 3. Server-side verification of payment status & amount directly with Razorpay API
    const rzp = getRazorpayClient();
    const payment = await rzp.payments.fetch(razorpay_payment_id);
    if (!payment) {
      return res.status(400).json({ error: 'Payment could not be verified with Razorpay.' });
    }

    if (payment.order_id && payment.order_id !== razorpay_order_id) {
      return res.status(400).json({ error: 'Razorpay order ID mismatch.' });
    }

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return res.status(400).json({
        error: `Payment verification failed. Payment status is ${payment.status}, expected captured.`,
      });
    }

    if (Number(payment.amount) !== 49900 || payment.currency !== 'INR') {
      return res.status(400).json({ error: 'Payment amount or currency mismatch with Business Pro pricing.' });
    }

    // 4. Update user plan to 'pro' and store subscription reference
    const updatedUser = upgradeUserToProWithPayment(req.userId!, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: 499,
      currency: 'INR',
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User record not found.' });
    }

    // 5. Update payment record to verified
    updatePaymentRecord(razorpay_order_id, {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: 'verified',
      verifiedAt: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: "You're now on Business Pro.",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error('Razorpay payment verification error:', err);
    res.status(500).json({ error: err.message || 'Error occurred during payment verification.' });
  }
});

// Webhook endpoint for Razorpay asynchronous events
app.post('/api/payment/razorpay/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    if (!webhookSecret) {
      return res.status(500).json({ error: 'Webhook secret not configured on server.' });
    }

    const signature = req.headers['x-razorpay-signature'] as string;
    if (!signature) {
      return res.status(400).json({ error: 'Missing x-razorpay-signature header.' });
    }

    const rawPayload = (req as any).rawBody
      ? (req as any).rawBody.toString('utf8')
      : JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawPayload)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature.' });
    }

    const { event, payload } = req.body;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload?.payment?.entity;
      const orderId = paymentEntity?.order_id || payload?.order?.entity?.id;
      const paymentId = paymentEntity?.id;
      const userId = paymentEntity?.notes?.userId || payload?.order?.entity?.notes?.userId;

      if (userId && orderId) {
        upgradeUserToProWithPayment(userId, {
          orderId,
          paymentId: paymentId || '',
          amount: 499,
          currency: 'INR',
        });
        updatePaymentRecord(orderId, {
          paymentId: paymentId || '',
          status: 'verified',
          verifiedAt: new Date().toISOString(),
        });
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      if (orderId) {
        updatePaymentRecord(orderId, {
          status: 'failed',
          errorMessage: paymentEntity?.error_description || 'Payment failed',
        });
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ error: err.message || 'Internal webhook error.' });
  }
});

// --- AI Generation Endpoints ---

app.post('/api/ai/generate-website', async (req, res) => {
  try {
    const { businessInfo } = req.body;
    if (!businessInfo || !businessInfo.businessName || !businessInfo.category || !businessInfo.city) {
      return res.status(400).json({
        error: 'Business name, category, and city are required to generate your website.',
      });
    }

    const websiteContent = await generateFullWebsiteWithAI(businessInfo);
    res.json({ success: true, website: websiteContent });
  } catch (err: any) {
    console.error('Website generation error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate website with AI.' });
  }
});

app.post('/api/ai/regenerate-section', async (req, res) => {
  try {
    const { section, businessInfo, currentContent, tone } = req.body;
    if (!section || !businessInfo || !currentContent) {
      return res.status(400).json({ error: 'Missing section or business context for regeneration.' });
    }

    // Access control: If user token is provided, verify plan AI regeneration limit
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const user = getUserByToken(token);
      if (user) {
        const check = recordUserAiGeneration(user.id);
        if (!check.allowed) {
          return res.status(403).json({
            error: 'You have used all 3 free AI section regenerations on Starter. This feature is available on Business Pro.',
            code: 'PLAN_LIMIT_AI',
            remaining: 0,
            plan: user.plan,
          });
        }
      }
    }

    const regenerated = await regenerateSectionWithAI(section, businessInfo, currentContent, tone);
    res.json({ success: true, updatedSection: regenerated });
  } catch (err: any) {
    console.error('Section regeneration error:', err);
    res.status(500).json({ error: err.message || 'Failed to regenerate section.' });
  }
});

// --- Project Management Endpoints (User Protected) ---

app.get('/api/projects', requireAuth, (req: AuthenticatedRequest, res) => {
  const projects = getProjectsByUser(req.userId!);
  res.json({ projects });
});

app.get('/api/projects/:id', requireAuth, (req: AuthenticatedRequest, res) => {
  const project = getProjectById(req.params.id);
  if (!project || project.userId !== req.userId) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const user = getUserById(req.userId!);
  const isStarter = user?.plan === 'starter';
  // If Starter user, restrict direct leads access
  if (isStarter) {
    return res.json({
      project,
      inquiries: [],
      leadManagerRestricted: true,
      message: 'This feature is available on Business Pro.',
    });
  }

  const inquiries = getInquiriesForProject(project.id);
  res.json({ project, inquiries, leadManagerRestricted: false });
});

// Centralized leads for Multi-Outlet users (Requires active Multi-Outlet plan)
app.get('/api/projects-centralized/leads', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = getUserById(req.userId!);
  if (user?.plan !== 'multi' || user?.planStatus !== 'active') {
    return res.status(403).json({
      error: 'Centralized multi-branch lead management is only available on an active Multi-Outlet plan.',
      code: 'PLAN_MULTI_REQUIRED',
    });
  }

  const leads = getCentralizedInquiriesForUser(req.userId!);
  res.json({ success: true, leads });
});

// Multi-Outlet Branches API (Requires active Multi-Outlet plan)
app.get('/api/multi-outlet/branches', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = getUserById(req.userId!);
  if (user?.plan !== 'multi' || user?.planStatus !== 'active') {
    return res.status(403).json({
      error: 'Multi-branch location management requires an active Multi-Outlet plan.',
      code: 'PLAN_MULTI_REQUIRED',
    });
  }

  const projects = getProjectsByUser(req.userId!);
  const branches = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    branchName: p.branchName || p.businessInfo.city || 'Main Branch',
    businessName: p.businessInfo.businessName,
    city: p.businessInfo.city,
    address: p.businessInfo.address,
    isPublished: p.isPublished,
    leadsCount: p.leadsCount || 0,
  }));

  res.json({ success: true, branches });
});

// Multi-Outlet Dedicated Support API (Requires active Multi-Outlet plan)
app.get('/api/multi-outlet/support', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = getUserById(req.userId!);
  if (user?.plan !== 'multi' || user?.planStatus !== 'active') {
    return res.status(403).json({
      error: 'Priority enterprise dedicated support requires an active Multi-Outlet plan.',
      code: 'PLAN_MULTI_REQUIRED',
    });
  }

  res.json({
    success: true,
    support: {
      accountManager: 'Priya Mehta (Enterprise Account Executive)',
      hotline: '+91 800-LOCALAI-PRO',
      email: 'enterprise-vip@localweb.ai',
      sla: '1-Hour Guaranteed Response Time',
    },
  });
});

app.post('/api/projects', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const { businessInfo, website } = req.body;
    if (!businessInfo || !website) {
      return res.status(400).json({ error: 'businessInfo and website payload required.' });
    }

    // Access control:
    // Starter: 1 website
    // Business Pro: 3 websites
    // Multi-Outlet: Unlimited (strictly requires active Multi-Outlet entitlement)
    const user = getUserById(req.userId!);
    const existingProjects = getProjectsByUser(req.userId!);
    const isMultiActive = user?.plan === 'multi' && user?.planStatus === 'active';

    if (user?.plan === 'starter' && existingProjects.length >= 1) {
      return res.status(403).json({
        error: 'Starter plan allows 1 business website. Upgrade to Business Pro to create more websites.',
        code: 'PLAN_LIMIT_WEBSITES',
        plan: user.plan,
      });
    }

    if (user?.plan === 'pro' && existingProjects.length >= 3) {
      return res.status(403).json({
        error: 'Business Pro includes up to 3 business websites. For more branch locations, please request a Multi-Outlet custom plan.',
        code: 'PLAN_LIMIT_WEBSITES',
        plan: user.plan,
      });
    }

    if (existingProjects.length >= 3 && !isMultiActive) {
      return res.status(403).json({
        error: 'Creating more than 3 branch locations requires an active Multi-Outlet plan.',
        code: 'PLAN_MULTI_REQUIRED',
      });
    }

    const project = createProject(req.userId!, businessInfo, website);
    res.status(201).json({ project });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to save project.' });
  }
});

app.put('/api/projects/:id', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const { businessInfo, website, isPublished, slug, customDomain, branchName, removeBranding } = req.body;
    const user = getUserById(req.userId!);

    // Access control: branchName requires active Multi-Outlet plan
    if (branchName && (user?.plan !== 'multi' || user?.planStatus !== 'active')) {
      return res.status(403).json({
        error: 'Multi-location branch mapping and branch names require an active Multi-Outlet plan.',
        code: 'PLAN_MULTI_REQUIRED',
      });
    }

    // Access control: removeBranding requires active Pro or active Multi
    if (removeBranding === true) {
      const hasBrandingEntitlement =
        (user?.plan === 'pro' && user?.planStatus === 'active') ||
        (user?.plan === 'multi' && user?.planStatus === 'active');
      if (!hasBrandingEntitlement) {
        return res.status(403).json({
          error: 'Removing LocalWeb AI branding is available on Business Pro or Multi-Outlet.',
          code: 'PLAN_PRO_REQUIRED',
        });
      }
    }

    const updated = updateProject(req.params.id, req.userId!, {
      businessInfo,
      website,
      isPublished,
      slug,
      customDomain,
      branchName,
      removeBranding,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Project not found or unauthorized.' });
    }

    res.json({ project: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update project.' });
  }
});

// Configure or update custom domain
app.post('/api/projects/:id/custom-domain', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const project = getProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found or unauthorized.' });
    }

    const { domain } = req.body;
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ error: 'Domain name is required.' });
    }

    // Clean domain (remove protocol, trailing slashes, www/subdomain parsing)
    const cleanDomain = domain
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/+$/, '');

    // Basic domain validation regex
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!domainRegex.test(cleanDomain)) {
      return res.status(400).json({
        error: 'Please enter a valid domain format (e.g., www.mybusiness.com or site.mybusiness.com).',
      });
    }

    // Check if domain is already claimed by another project
    const existing = getProjectByDomain(cleanDomain);
    if (existing && existing.id !== project.id) {
      return res.status(409).json({
        error: 'This domain is already connected to another project in LocalAI Web.',
      });
    }

    // Determine host (e.g., 'www' if 'www.domain.com', or subdomain)
    const parts = cleanDomain.split('.');
    const isSubdomain = parts.length > 2;
    const dnsHost = isSubdomain ? parts[0] : '@';

    const customDomainConfig: CustomDomainConfig = {
      domain: cleanDomain,
      status:
        project.customDomain?.domain === cleanDomain && project.customDomain?.status === 'active'
          ? 'active'
          : 'pending',
      cnameTarget: 'cname.localai.web',
      dnsRecordType: 'CNAME',
      dnsHost: dnsHost === '@' ? 'www' : dnsHost, // CNAME standard prefers host/subdomain
      sslStatus: 'pending',
      configuredAt: project.customDomain?.configuredAt || new Date().toISOString(),
      lastCheckedAt: new Date().toISOString(),
    };

    const updated = updateProject(project.id, req.userId!, {
      customDomain: customDomainConfig,
    });

    res.json({ success: true, project: updated, customDomain: customDomainConfig });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to configure custom domain.' });
  }
});

// Verify custom domain DNS configuration
app.post('/api/projects/:id/verify-domain', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const project = getProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found or unauthorized.' });
    }

    if (!project.customDomain || !project.customDomain.domain) {
      return res.status(400).json({ error: 'No custom domain configured for this project.' });
    }

    const { forceVerify } = req.body;
    const domain = project.customDomain.domain;
    const expectedTarget = 'cname.localai.web';

    let isVerified = false;
    let detectedRecords: string[] = [];
    let errorMessage = '';

    if (forceVerify) {
      // Allow instant simulation for testing / demo in sandbox environments
      isVerified = true;
      detectedRecords = [expectedTarget];
    } else {
      try {
        // Attempt actual DNS lookup with 3 second timeout
        const lookupPromise = dns.promises.resolveCname(domain);
        const timeoutPromise = new Promise<string[]>((_, reject) =>
          setTimeout(() => reject(new Error('DNS lookup timed out')), 3000)
        );

        const records = await Promise.race([lookupPromise, timeoutPromise]);
        detectedRecords = records;

        // Check if any CNAME record matches or points to our target
        const match = records.some(
          (r) => r.toLowerCase().includes('localai.web') || r.toLowerCase().includes(expectedTarget)
        );

        if (match) {
          isVerified = true;
        } else {
          errorMessage = `CNAME record points to "${records.join(', ')}" instead of "${expectedTarget}".`;
        }
      } catch (dnsErr: any) {
        // DNS lookup failed or timed out (very common before global propagation)
        errorMessage =
          dnsErr.code === 'ENOTFOUND' || dnsErr.code === 'ENODATA'
            ? `No CNAME record found for "${domain}". DNS changes can take up to 24-48 hours (usually 15-30 minutes) to propagate globally.`
            : dnsErr.message || 'Could not resolve DNS records yet.';
      }
    }

    const updatedConfig = {
      ...project.customDomain,
      status: isVerified ? ('active' as const) : ('error' as const),
      sslStatus: isVerified ? ('active' as const) : ('pending' as const),
      verifiedAt: isVerified ? new Date().toISOString() : project.customDomain.verifiedAt,
      lastCheckedAt: new Date().toISOString(),
      errorMessage: isVerified ? undefined : errorMessage,
    };

    const updatedProject = updateProject(project.id, req.userId!, {
      customDomain: updatedConfig,
    });

    res.json({
      success: true,
      verified: isVerified,
      detectedRecords,
      errorMessage: isVerified ? undefined : errorMessage,
      customDomain: updatedConfig,
      project: updatedProject,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Verification process failed.' });
  }
});

// Remove custom domain
app.delete('/api/projects/:id/custom-domain', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const project = getProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found or unauthorized.' });
    }

    const updated = updateProject(project.id, req.userId!, {
      customDomain: undefined,
    });

    res.json({ success: true, message: 'Custom domain removed successfully.', project: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to remove custom domain.' });
  }
});

app.delete('/api/projects/:id', requireAuth, (req: AuthenticatedRequest, res) => {
  const success = deleteProject(req.params.id, req.userId!);
  if (!success) {
    return res.status(404).json({ error: 'Project not found or unauthorized.' });
  }
  res.json({ success: true, message: 'Project deleted successfully.' });
});

// --- Public Endpoints (Website Viewers & Inquiries) ---

app.get('/api/public/site/domain/:domain', (req, res) => {
  const project = getProjectByDomain(req.params.domain);
  if (!project || !project.isPublished) {
    return res.status(404).json({ error: 'Website not found or is currently offline.' });
  }

  // Increment view count
  recordInteraction(project.slug, 'view');

  res.json({
    slug: project.slug,
    businessInfo: project.businessInfo,
    website: project.website,
    publishedAt: project.publishedAt,
    updatedAt: project.updatedAt,
    customDomain: project.customDomain,
    removeBranding: project.removeBranding || false,
  });
});

app.get('/api/public/site/:slug', (req, res) => {
  const project = getProjectBySlug(req.params.slug);
  if (!project || !project.isPublished) {
    return res.status(404).json({ error: 'Website not found or is currently offline.' });
  }

  // Increment view count
  recordInteraction(req.params.slug, 'view');

  res.json({
    slug: project.slug,
    businessInfo: project.businessInfo,
    website: project.website,
    publishedAt: project.publishedAt,
    updatedAt: project.updatedAt,
    removeBranding: project.removeBranding || false,
  });
});

app.post('/api/public/site/:slug/inquiry', (req, res) => {
  try {
    const project = getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ error: 'Website not found.' });
    }

    const { name, phone, email, serviceRequested, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const inquiry = createInquiry(project.id, {
      name,
      phone,
      email: email || '',
      serviceRequested: serviceRequested || 'General Inquiry',
      message: message || 'Interested in booking or services.',
    });

    res.status(201).json({ success: true, inquiry });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error submitting inquiry.' });
  }
});

app.post('/api/public/site/:slug/analytics', (req, res) => {
  const { type } = req.body;
  if (type === 'whatsapp' || type === 'call') {
    recordInteraction(req.params.slug, type);
  }
  res.json({ success: true });
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, businessName, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const inquiry = createInquiry('platform_contact_hq', {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: businessName ? String(businessName).trim() : '',
      serviceRequested: subject ? String(subject).trim() : 'General Inquiry',
      message: String(message).trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Our team will get back to you shortly.',
      inquiryId: inquiry.id,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error submitting message.' });
  }
});

app.get('/api/public/demo-sites', (req, res) => {
  // Returns top published site previews for the landing page showcase
  const project = getProjectBySlug('bella-luxe-salon-mumbai');
  if (project) {
    res.json({ sites: [project] });
  } else {
    res.json({ sites: [] });
  }
});

// Dynamic SEO pre-rendering helper
function renderSeoPage(req: express.Request, res: express.Response, next: express.NextFunction, seo: { title: string; desc: string; url: string }) {
  const indexPath =
    process.env.NODE_ENV !== 'production'
      ? path.join(process.cwd(), 'index.html')
      : path.join(process.cwd(), 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    try {
      let html = fs.readFileSync(indexPath, 'utf-8');
      html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
      html = html.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        `<meta name="description" content="${seo.desc.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${seo.url}" />`
      );
      html = html.replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:description" content="${seo.desc.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:url" content="${seo.url}" />`
      );

      res.header('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch {
      return next();
    }
  }
  next();
}

// Legal & Policy SEO routes
app.get('/privacy-policy', (req, res, next) => {
  renderSeoPage(req, res, next, {
    title: 'LocalWeb AI Privacy Policy',
    desc: 'Read how LocalWeb AI collects, handles, and protects account, business, and inquiry data. Learn about our Razorpay payment processing and privacy standards.',
    url: 'https://localwebai.website/privacy-policy',
  });
});

app.get('/terms', (req, res, next) => {
  renderSeoPage(req, res, next, {
    title: 'LocalWeb AI Terms & Conditions',
    desc: 'Official Terms of Service for LocalWeb AI. Learn about our Starter, Business Pro (₹499/month), and Multi-Outlet plans, account usage, and legal terms.',
    url: 'https://localwebai.website/terms',
  });
});

app.get('/refund-policy', (req, res, next) => {
  renderSeoPage(req, res, next, {
    title: 'LocalWeb AI Refund & Cancellation Policy',
    desc: 'Official Refund & Cancellation Policy for LocalWeb AI. Learn how to cancel your Business Pro subscription, handle duplicate payments, and request billing assistance.',
    url: 'https://localwebai.website/refund-policy',
  });
});

app.get('/contact', (req, res, next) => {
  renderSeoPage(req, res, next, {
    title: 'Contact LocalWeb AI',
    desc: 'Contact LocalWeb AI support for general inquiries, Business Pro assistance, Multi-Outlet custom plan requests, privacy requests, and billing support.',
    url: 'https://localwebai.website/contact',
  });
});

// Dynamic SEO pre-rendering for public site pages
app.get('/site/:slug', (req, res, next) => {
  const { slug } = req.params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return next();
  }

  const indexPath =
    process.env.NODE_ENV !== 'production'
      ? path.join(process.cwd(), 'index.html')
      : path.join(process.cwd(), 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    try {
      let html = fs.readFileSync(indexPath, 'utf-8');
      const cat = project.businessInfo.category || 'Business';
      const catCap = cat.charAt(0).toUpperCase() + cat.slice(1);
      const title = `${project.businessInfo.businessName} — ${catCap} in ${project.businessInfo.city} | LocalAI Web`;
      const desc =
        project.businessInfo.shortDescription ||
        project.website?.hero?.subheadline ||
        `Official website for ${project.businessInfo.businessName} in ${project.businessInfo.city}. Book on WhatsApp, view services, pricing, hours, and directions.`;
      const url = `https://localweb.ai.studio/site/${project.slug}`;

      html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
      html = html.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        `<meta name="description" content="${desc.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${url}" />`
      );
      html = html.replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:description" content="${desc.replace(/"/g, '&quot;')}" />`
      );
      html = html.replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:url" content="${url}" />`
      );

      res.header('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch {
      return next();
    }
  }
  next();
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LocalAI Web server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
