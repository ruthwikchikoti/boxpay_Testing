import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Configuration
const BOXPAY_CONFIG = {
  merchantId: process.env.BOXPAY_MERCHANT_ID,
  apiToken: process.env.BOXPAY_TOKEN,
  businessUnit: process.env.BOXPAY_BUSINESS_UNIT || 'epicure_robotics_pvt_ltd'
};

// Create payment session
// @ts-ignore - TypeScript has issues with Express router types
router.post('/create-session', async (req: Request, res: Response) => {
  try {
    const { productName, amount, userDetails } = req.body;

    // Validate required fields
    if (!productName || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Product name and amount are required'
      });
    }

    // Generate a unique order ID
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 5)}`;

    // Get user details from request or use default values
    const userName = userDetails?.name || "Guest";
    const userPhone = userDetails?.phoneNumber || "+91 0000000000";
    const userEmail = userDetails?.email || "user@example.com";

    // Prepare session data
    const sessionData = {
      context: {
        countryCode: "IN",
        legalEntity: { code: BOXPAY_CONFIG.businessUnit },
        order_Id: orderId,
        localCode: "en-IN"
      },
      paymentType: "S",
      money: { 
        amount: amount.toString(), 
        currencyCode: "INR" 
      },
      shopper: {
        firstName: userName,
        lastName: "",
        phoneNumber: userPhone,
        email: userEmail,
        uniqueReference: `customer_${productName}_${amount}_${Date.now()}`
      },
      frontendReturnUrl: `https://kioskdev.vercel.app/zoe/success?orderId=${orderId}`,
      frontendBackUrl: `https://kioskdev.vercel.app/zoe`
    };

    // Call BoxPay API
    const url = `https://apis.boxpay.in/v0/merchants/${BOXPAY_CONFIG.merchantId}/sessions`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${BOXPAY_CONFIG.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
      const error = await response.text(); 
      console.error('BoxPay API Error:', error);
      return res.status(response.status).json({
        success: false,
        message: 'Failed to create payment session',
        error
      });
    }

    const data = await response.json();
    console.log('BoxPay Session Response:', data);

    const redirectUrl = data.url;
    
    if (!redirectUrl) {
      return res.status(500).json({
        success: false,
        message: 'No redirection URL found in the response'
      });
    }

    // Store order information locally (in a real app, save to database)
    const orderInfo = {
      orderId,
      productName,
      amount,
      sessionId: data.sessionId,
      status: 'pending',
      createdAt: new Date()
    };

    // In a real app, you would save this to your database
    console.log('Order created:', orderInfo);

    return res.json({ 
      success: true,
      redirectUrl,
      sessionId: data.sessionId,
      orderId
    });

  } catch (error: any) {
    console.error('Payment session creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

// Mock endpoint to verify payment status (in a real app, you'd use BoxPay's API)
// @ts-ignore - TypeScript has issues with Express router types
router.get('/verify/:orderId', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // In a real app, you would fetch this from your database
    console.log('Verifying payment for order:', orderId);

    // Simulate a successful payment verification
    return res.json({
      success: true,
      paymentStatus: 'COMPLETED',
      orderId
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

export default router; 