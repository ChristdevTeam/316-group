export interface EmailTemplateProps {
  firstName: string
  lastName: string
  emailHeroImageUrl: string
  downloadFileUrl: string
  downloadFileName?: string
  introText?: string
}
export const generateDownloadEmailTemplate = ({
  firstName,
  lastName,
  emailHeroImageUrl,
  downloadFileUrl,
  downloadFileName = 'Your 2025 e-commerce Playbook',
  introText = 'Thank you for your interest in our latest E-Book on efficient E-Commerce.<br>Discover the best strategies to reduce your shipping costs and returns!',
}: EmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your ${downloadFileName} is Ready</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #000000;
          color: #ffffff;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #000000;
        }
        .header {
          text-align: center;
          padding: 40px 20px 20px;
        }
        .logo {
          width: 120px;
          height: 48px;
          margin-bottom: 30px;
        }
        .hero-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 2px solid #374151;
        }
        .greeting {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .subtitle {
          font-size: 16px;
          color: #fefefe;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .download-section {
          text-align: center;
          padding: 0 20px 40px;
        }
        .download-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .download-button {
          display: inline-block;
          background-color: #0B68EC;
          color: #FFFFFF;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 30px;
          transition: all 0.2s;
          border: 2px solid #FFFFFF;
        }
        .download-button:hover {
          background-color: #0861ED;
          border-color: #FFFFFF;
          transform: translateY(-1px);
        }
        .note {
          font-size: 14px;
          color: #d1d5db;
          margin-bottom: 20px;
        }
        .contact-link {
          color: #C2F232;
          text-decoration: none;
          font-weight: 600;
        }
        .contact-link:hover {
          color: #34d399;
        }
        .footer {
          text-align: center;
          padding: 30px 20px 20px;
          border-top: 1px solid #4b5563;
          margin-top: 20px;
        }
        .footer-text {
          font-size: 14px;
          color: #d1d5db;
          margin-bottom: 20px;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
          border: 1px solid #ffffff;
        }
        .social-link:hover {
          background-color: #10b981;
          border-color: #10b981;
          transform: translateY(-2px);
        }
        .social-icon {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }
        .company-logo {
          width: 100px;
          height: 40px;
          display: inline-block;
          margin-bottom: 15px;
        }
        .copyright {
          font-size: 12px;
          color: #efefef;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/logo.svg" alt="316 Group Logo" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          <img src="${emailHeroImageUrl}" alt="${downloadFileName} Preview" class="hero-image" />
          <h1 class="greeting">Hey ${firstName} ${lastName}</h1>
          <p class="subtitle">
            ${introText}
          </p>
        </div>
        
        <div class="download-section">
          <h2 class="download-title">Here's your free file download</h2>
          <h3 style="font-size: 18px; margin-bottom: 20px; font-weight: 600;">${downloadFileName}</h3>
          <a href="${downloadFileUrl}" class="download-button">Download E-Book</a>
          <p class="note">
            Take a look at it and if you have any questions<br>
            <a href="mailto:contact@316group.com" class="contact-link">Contact us at any time!</a>
          </p>
          <p class="note">
            Keep Dreaming Big! Your <strong style="color: #FFFFFF;">316 Team</strong>
          </p>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="https://linkedin.com/company/316group" class="social-link" title="LinkedIn">
             <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/linkedin-svgrepo-com.png" alt="LinkedIn" width="32" height="32" />
            </a>
            <a href="https://instagram.com/316group" class="social-link" title="Instagram">
              <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/instagram-svgrepo-com.png" alt="Instagram" width="32" height="32" />
            </a>
            <a href="https://facebook.com/316group" class="social-link" title="Facebook">
              <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/facebook-svgrepo-com.png" alt="Facebook" width="32" height="32" />
            </a>
          </div>
          <div class="company-logo">
            <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/logo.svg" alt="316 Group" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          <p class="copyright">
            2023 316 Group. All rights reserved | Policy
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
