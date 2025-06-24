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

       

      </style>
    </head>
    <body>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000;">
        <tr>
          <td align="center">
            <div class="container">
              <div class="header">
                <div class="logo">
                  <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/logo.png" alt="316 Group Logo" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
                <img src="${emailHeroImageUrl}" alt="${downloadFileName} Preview" class="hero-image" />
                <h1 class="greeting">Hey ${firstName} ${lastName}</h1>
                <p class="subtitle">
                  ${introText}
                </p>
              </div>
               
               <div class="download-section">
                 <h2 class="download-title">Here's your free file download</h2>
                 <h3 style="font-size: 18px; margin-bottom: 20px; font-weight: 600; color: #ffffff;">${downloadFileName}</h3>
                 <table style="margin: 0 auto 30px auto;">
                   <tr>
                     <td style="background-color: #0B68EC; border: 2px solid #FFFFFF; border-radius: 8px; text-align: center;">
                       <a href="${downloadFileUrl}" style="display: inline-block; color: #FFFFFF; padding: 16px 32px; text-decoration: none; font-weight: 700; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Download E-Book</a>
                     </td>
                   </tr>
                 </table>
                 <p class="note">
                   Take a look at it and if you have any questions<br>
                   <a href="mailto:contact@316group.com" class="contact-link" style="color: #C2F232;">Contact us at any time!</a>
                 </p>
                 <p class="note">
                   Keep Dreaming Big! Your <strong style="color: #FFFFFF;">316 Team</strong>
                 </p>
               </div>
               <hr style="border: 1px solid #4b5563; margin: 20px 0;">
               <div style="text-align: center; padding: 30px 20px 20px;">
                 <table style="margin: 0 auto; border-spacing: 15px;">
                   <tr>
                     <td>
                       <a href="https://linkedin.com/company/316group" style="display: inline-block; padding: 8px; border-radius: 50%; border: 1px solid #ffffff; width: 32px; height: 32px; text-decoration: none;" title="LinkedIn">
                         <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/linkedin-svgrepo-com.png" alt="LinkedIn" width="24" height="24" style="width: 24px; height: 24px; display: block; margin: 0 auto;" />
                       </a>
                     </td>
                     <td>
                       <a href="https://instagram.com/316group" style="display: inline-block; padding: 8px; border-radius: 50%; border: 1px solid #ffffff; width: 32px; height: 32px; text-decoration: none;" title="Instagram">
                         <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/instagram-svgrepo-com.png" alt="Instagram" width="24" height="24" style="width: 24px; height: 24px; display: block; margin: 0 auto;" />
                       </a>
                     </td>
                     <td>
                       <a href="https://facebook.com/316group" style="display: inline-block; padding: 8px; border-radius: 50%; border: 1px solid #ffffff; width: 32px; height: 32px; text-decoration: none;" title="Facebook">
                         <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/facebook-svgrepo-com.png" alt="Facebook" width="24" height="24" style="width: 24px; height: 24px; display: block; margin: 0 auto;" />
                       </a>
                     </td>
                   </tr>
                 </table>
               </div>
               <div style="text-align: center; margin-bottom: 15px;">
                 <img src="${process.env.NEXT_PUBLIC_SERVER_URL}/assets/logo.png" alt="316 Group" style="width: 100px; height: 40px; object-fit: contain;" />
               </div>
              <p style="font-size: 12px; color: #ffffff; margin-bottom: 20px; text-align: center; padding: 10px 10px 10px;">
                2023 316 Group. All rights reserved | Policy
              </p>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
