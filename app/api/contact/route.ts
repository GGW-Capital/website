import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Build email content
    const emailContent = `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px;padding: 0; font-family: 'Google Sans', Roboto, Arial, sans-serif; background-color: #f5f5f5; margin: 0 auto; background-color: #0a0a0a; color: #ffffff;">
        <!-- Header with logo -->
        <tr>
          <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">
            <img src="https://ggwcapitalre.com/images/ggw-capital-logo.svg" alt="GGW Capital" width="150" style="max-width: 100%; height: auto;">
          </td>
        </tr>
        
        <!-- Main content -->
        <tr>
          <td style="padding: 30px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td>
                  <h2 style="margin: 0 0 20px 0; font-size: 24px; line-height: 30px; color: #D4AF37; font-weight: 600;">New Contact Form Submission</h2>
                  
                  <div style="background-color: #080808; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 24px;">
                      <span style="color: #D4AF37; font-weight: 600;">Name:</span> 
                      <span style="color: #ffffff;">${name}</span>
                    </p>
                    
                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 24px;">
                      <span style="color: #D4AF37; font-weight: 600;">Email:</span> 
                      <span style="color: #ffffff;">${email}</span>
                    </p>
                    
                    ${phone ? `
                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 24px;">
                      <span style="color: #D4AF37; font-weight: 600;">Phone:</span> 
                      <span style="color: #ffffff;">${phone}</span>
                    </p>
                    ` : ''}
                    
                    ${interest ? `
                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 24px;">
                      <span style="color: #D4AF37; font-weight: 600;">Interest:</span> 
                      <span style="color: #ffffff;">${interest}</span>
                    </p>
                    ` : ''}
                  </div>
                  
                  <div style="background-color: #080808; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 25px;">
                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 24px; color: #D4AF37; font-weight: 600;">Message:</p>
                    <p style="margin: 0; font-size: 16px; line-height: 24px; color: rgba(255, 255, 255, 0.8);">${message.replace(/\n/g, '<br/>')}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding: 20px 30px; text-align: center; font-size: 14px; background-color: #080808; color: rgba(255, 255, 255, 0.6); border-top: 1px solid rgba(212, 175, 55, 0.3);">
            <p style="margin: 0;">This email was sent from the contact form on the GGW Capital website.</p>
            <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} GGW Capital. All rights reserved.</p>
          </td>
        </tr>
      </table>
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form: ${name} - ${interest || 'General Inquiry'}`,
      html: emailContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}