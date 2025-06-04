module.exports = async function handler(req, res) {
  try {
    // Test nodemailer import
    const nodemailer = require('nodemailer');
    
    res.status(200).json({
      status: 'success',
      nodemailerLoaded: !!nodemailer,
      hasCreateTransporter: typeof nodemailer.createTransporter === 'function',
      nodemailerKeys: Object.keys(nodemailer || {}),
      packageJsonPath: require.resolve('nodemailer/package.json')
    });
  } catch (error) {
    res.status(500).json({
      error: 'Test failed',
      details: error.message,
      stack: error.stack
    });
  }
}