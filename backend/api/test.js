// api/test.js
export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Test environment variables
    const envCheck = {
      EMAIL_SERVER_HOST: !!process.env.EMAIL_SERVER_HOST,
      EMAIL_SERVER_USER: !!process.env.EMAIL_SERVER_USER,
      EMAIL_SERVER_PASSWORD: !!process.env.EMAIL_SERVER_PASSWORD,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
      NODE_VERSION: process.version
    };

    console.log('Environment check:', envCheck);

    res.status(200).json({
      status: 'success',
      message: 'Test function working',
      environment: envCheck,
      method: req.method,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Test function error:', error);
    res.status(500).json({
      error: 'Test function failed',
      details: error.message
    });
  }
}