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
          color: #d1d5db;
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
          background-color: #10b981;
          color: #000000;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 30px;
          transition: all 0.2s;
          border: 2px solid #10b981;
        }
        .download-button:hover {
          background-color: #059669;
          border-color: #059669;
          transform: translateY(-1px);
        }
        .note {
          font-size: 14px;
          color: #d1d5db;
          margin-bottom: 20px;
        }
        .contact-link {
          color: #10b981;
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
          background-color: #1f2937;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
          border: 1px solid #374151;
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
          color: #9ca3af;
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
          <h2 class="download-title">Here's your free PDF</h2>
          <h3 style="font-size: 18px; color: #10b981; margin-bottom: 20px; font-weight: 600;">${downloadFileName}</h3>
          <a href="${downloadFileUrl}" class="download-button">Download E-Book</a>
          <p class="note">
            Take a look at it and if you have any questions<br>
            <a href="mailto:contact@316group.com" class="contact-link">Contact us at any time!</a>
          </p>
          <p class="note">
            Keep Dreaming Big! Your <strong style="color: #10b981;">316 Team</strong>
          </p>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <a href="https://linkedin.com/company/316group" class="social-link" title="LinkedIn">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://instagram.com/316group" class="social-link" title="Instagram">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com/316group" class="social-link" title="Facebook">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
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
