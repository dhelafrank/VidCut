let vidcutGradientText = `
<h1 class="text-center" style=" color: transparent;
background: linear-gradient(to right, #ff3366, #66ff66, #3366ff);
background-clip: text;
-moz-background-clip: text;
-webkit-background-clip: text;
background-size: 200% 100%;
animation: gradientAnimation 5s linear infinite;">VidCut</h1>
`   

const errorMail = (code, heading, message) => {
  return `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
        </style>
      </head>
      <body style="font-family: 'Poppins', sans-serif; background-color: #f3f4f6;">
        <div style="margin: 0 auto; max-width: 600px; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">${code}</h1>
            <h5 style="color: #e53e3e; font-size: 18px;">${heading}</h5>
            <hr style="border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 15px;">
              <p style="color: #718096; font-size: 16px;">
                ${message}
              </p>
              <p style="color: #718096; font-size: 16px;">
                We are sorry
              </p>
            </div>
            <hr style="border-top: 1px solid #e2e8f0;">
            <a style="display: inline-block; padding: 10px 15px; background-color: #3490dc; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;" href="https://vidcut.onrender.com" target="_blank">Try Again</a>
          </div>
        </div>
      </body>
    </html>
  `;
};



const videoReminderMail = (name, url) => {
  return `<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  </style>
</head>
<body style="font-family: 'Poppins', sans-serif; background-color: #f3f4f6;">
  <div style="margin: 0 auto; max-width: 600px; padding: 20px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
  <h1 style="text-align:center">VidCut</h1>
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display:flex; align-items:center; justify-content:center; flex-direction:column;">
      <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">Your ${name} video is ready</h1>
      <h5 style="color: #047857; font-size: 18px;">Click the button below to download</h5>
      <hr style="border-top: 1px solid #e2e8f0;">
      <div style="margin-bottom: 15px;">
        <p style="color: #718096; font-size: 16px;">
          Your ${name} video is ready
        </p>
        <p style="color: #718096; font-size: 16px;">
          Thank you for using our service
        </p>
      </div>
      <hr style="border-top: 1px solid #e2e8f0;">
      <a style="display: inline-block; padding: 10px 15px; background-color: #3490dc; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;" href="${url}" target="_blank">Download</a>
    </div>
  </div>
</body>
</html>`
}

module.exports = {
  errorMail,
  videoReminderMail
}