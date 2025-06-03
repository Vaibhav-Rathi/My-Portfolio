
// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
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

  // Email options - Professional notification email for you
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: 'vaibhavrathi1000@gmail.com',
    subject: `Portfolio Contact Form - Message from ${name}`,
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
                  <td style="background-color: #2c3e50; padding: 40px; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; text-align: center;">
                      New Portfolio Contact
                    </h1>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">Contact Details</h2>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 10px 0;">
                          <strong style="color: #7f8c8d; text-transform: uppercase; font-size: 12px;">Name</strong>
                          <p style="margin: 5px 0 0 0; color: #2c3e50; font-size: 16px;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <strong style="color: #7f8c8d; text-transform: uppercase; font-size: 12px;">Email</strong>
                          <p style="margin: 5px 0 0 0; color: #2c3e50; font-size: 16px;">
                            <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <strong style="color: #7f8c8d; text-transform: uppercase; font-size: 12px;">Message</strong>
                          <div style="margin: 10px 0 0 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #3498db; border-radius: 4px;">
                            <p style="margin: 0; color: #2c3e50; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Action Button -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px;">
                      <tr>
                        <td align="center">
                          <a href="mailto:${email}" style="display: inline-block; padding: 12px 30px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 500;">
                            Reply to ${name}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                      This message was sent from your portfolio contact form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    replyTo: email
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting Vaibhav Rathi',
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
                    <td style="background-color: #2c3e50; padding: 40px; border-radius: 8px 8px 0 0; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">
                        Thank You!
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #2c3e50; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                        Hi <strong>${name}</strong>,
                      </p>
                      
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for reaching out through my portfolio. I've received your message and appreciate you taking the time to connect with me.
                      </p>
                      
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
                      </p>
                      
                      <!-- Contact Info Box -->
                      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 6px; margin: 30px 0;">
                        <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">
                          In the meantime, feel free to connect:
                        </h3>
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding: 5px 0;">
                              <strong style="color: #7f8c8d;">Phone:</strong>
                              <a href="tel:+917678273889" style="color: #3498db; text-decoration: none; margin-left: 10px;">+91 7678273889</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0;">
                              <strong style="color: #7f8c8d;">Email:</strong>
                              <a href="mailto:vaibhavrathi1000@gmail.com" style="color: #3498db; text-decoration: none; margin-left: 10px;">vaibhavrathi1000@gmail.com</a>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Your Message Copy -->
                      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 30px;">
                        <h4 style="color: #7f8c8d; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase;">
                          Your Message:
                        </h4>
                        <p style="color: #2c3e50; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>
                      
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                        Looking forward to our conversation!
                      </p>
                      
                      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-top: 20px;">
                        Best regards,<br>
                        <strong style="font-size: 18px;">Vaibhav Rathi</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0 0 10px 0; color: #7f8c8d; font-size: 14px;">
                        Connect with me:
                      </p>
                      <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                        <a href="tel:+917678273889" style="color: #3498db; text-decoration: none;">+91 7678273889</a> | 
                        <a href="mailto:vaibhavrathi1000@gmail.com" style="color: #3498db; text-decoration: none;">vaibhavrathi1000@gmail.com</a>
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
    
    await transporter.sendMail(confirmationMailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}