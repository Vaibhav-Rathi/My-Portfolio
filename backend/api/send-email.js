// api/send-email.js
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });

  // Email to the form submitter (confirmation email)
  const userMailOptions = {
    from: process.env.EMAIL_FROM,
    to: email, // Send to the person who filled the form
    subject: `Thank You for Reaching Out - Vaibhav Rathi`,
    html: `
      <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
            <td align="center" style="padding: 40px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 600;">
                        Thank You for Reaching Out!
                    </h1>
                    <p style="margin: 15px 0 0 0; color: #f0f0f0; font-size: 18px;">
                        Your message has been received
                    </p>
                    </td>
                </tr>
                
                <!-- Body -->
                <tr>
                    <td style="padding: 40px;">
                    <!-- Greeting -->
                    <p style="color: #2c3e50; font-size: 20px; line-height: 1.6; margin-bottom: 20px;">
                        Hello <strong>${name}</strong>,
                    </p>
                    
                    <p style="color: #2c3e50; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                        Thank you for visiting my portfolio and taking the time to reach out. I appreciate your interest in my web development services.
                    </p>
                    
                    <p style="color: #2c3e50; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
                        I've received your message and will review it carefully. You can expect to hear back from me within <strong>24-48 hours</strong>.
                    </p>
                    
                    <!-- What to Expect Box -->
                    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 6px; margin: 30px 0; border-left: 4px solid #667eea;">
                        <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">
                        What happens next?
                        </h3>
                        <ul style="color: #555; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li>I'll review your requirements and project details</li>
                        <li>I'll prepare a personalized response addressing your needs</li>
                        <li>We can schedule a call to discuss your project further</li>
                        <li>I'll provide you with a timeline and quote if applicable</li>
                        </ul>
                    </div>
                    
                    <!-- Contact Information -->
                    <div style="background-color: #fff; padding: 25px; border-radius: 6px; margin: 30px 0; border: 1px solid #e0e0e0;">
                        <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">
                        Need immediate assistance?
                        </h3>
                        <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0;">
                        Feel free to reach out directly:
                        </p>
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px;">
                        <tr>
                            <td style="padding: 8px 0;">
                            <a href="mailto:vaibhavrathi1000@gmail.com" style="color: #667eea; text-decoration: none; font-size: 15px;">vaibhavrathi1000@gmail.com</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;">
                            <a href="tel:+917678273889" style="color: #667eea; text-decoration: none; font-size: 15px;">+91 7678273889</a>
                            </td>
                        </tr>
                        </table>
                    </div>
                    
                    <!-- Message Copy -->
                    <div style="background-color: #f5f3ff; padding: 20px; border-radius: 6px; margin-top: 30px;">
                        <h4 style="color: #7f8c8d; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase;">
                        Your Message:
                        </h4>
                        <p style="color: #2c3e50; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>
                    </div>
                    
                    <!-- About Me Section -->
                    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 6px; margin-top: 30px;">
                        <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">
                        A bit about me:
                        </h3>
                        <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0;">
                        I'm not just another web dev who copies from Stack Overflow. I build stuff that works, looks clean, and actually makes sense to users. 
                        React, Next.js, Tailwind — all in my toolbox. I love turning messy ideas into smooth digital experiences. Fast learner, quick debugger, and allergic to bad UI.
                        If you're after someone who codes like it's art but delivers like it's business — I'm your guy. Let's build something that matters.
                        </p>
                    </div>
                    
                    <!-- Signature -->
                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                        <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0;">
                        Looking forward to working with you!
                        </p>
                        <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-top: 15px;">
                        Best regards,<br>
                        <strong style="font-size: 18px; color: #667eea;">Vaibhav Rathi</strong><br>
                        <span style="color: #7f8c8d; font-size: 14px;">Full Stack Web Developer</span>
                        </p>
                    </div>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                    <!-- Social Links -->
                    <div style="margin-bottom: 20px;">
                        <a href="https://github.com/Vaibhav-Rathi/" style="display: inline-block; margin: 0 10px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 24px; height: 24px;">
                        </a>
                        <a href="https://x.com/Vaibhav_Rathi5" style="display: inline-block; margin: 0 10px;">
                        <img src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?semt=ais_items_boosted&w=740" alt="Twitter" style="width: 24px; height: 24px;">
                        </a>
                    </div>
                    
                    <p style="margin: 0 0 5px 0; color: #7f8c8d; font-size: 14px;">
                        © 2025 Vaibhav Rathi. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #95a5a6; font-size: 13px;">
                        This is an automated response from my portfolio website
                    </p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
    `
  };

  // Email notification to yourself
  const notificationMailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: `New Portfolio Contact from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #2c3e50; padding: 30px; border-radius: 8px 8px 0 0;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                      New Contact Form Submission
                    </h2>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 30px;">
                    <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 20px 0;">
                      Contact Details:
                    </h3>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                        <strong>Name:</strong> ${name}
                      </p>
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                        <strong>Email:</strong> <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
                      </p>
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0;">
                        <strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </p>
                    </div>
                    
                    <h3 style="color: #2c3e50; font-size: 18px; margin: 20px 0;">
                      Message:
                    </h3>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background-color: #e8f4f8; border-radius: 6px;">
                      <p style="color: #2c3e50; font-size: 14px; margin: 0;">
                        <strong>Quick Actions:</strong><br>
                        <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">→ Reply to ${name}</a>
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                      This is an automated notification from your portfolio contact form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  try {
    console.log('Attempting to send emails...');
    
    // Send confirmation email to the user
    await transporter.sendMail(userMailOptions);
    console.log('Confirmation email sent to user:', email);
    
    // Send notification email to yourself
    await transporter.sendMail(notificationMailOptions);
    console.log('Notification email sent to:', process.env.EMAIL_FROM);
    
    res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      code: error.code 
    });
  }
}