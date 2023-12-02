const errorMail = (code, heading, message)=>{
    return `<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
      body{
      font-family:'Poppins', sans-serif
      }
      </style>
    </head>
    <body class="bg-light">
      <div class="container">
        <div class="card my-10">
          <div class="card-body">
            <h1 class="h3 mb-2">${code}</h1>
            <h5 class="text-red">${heading}</h5>
            <hr>
            <div class="space-y-3">
              <p class="text-gray-700">
                ${message}
              </p>
              <p class="text-gray-700">
                we are sorry
              </p>
            </div>
            <hr>
            <a class="btn btn-primary" href="https://vidcut.onrender.com" target="_blank">Try Again</a>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}

const videoReminderMail = (name, url)=>{
return `<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  body{
  font-family:'Poppins', sans-serif
  }
  </style>
</head>
<body class="bg-light">
  <div class="container">
    <div class="card my-10">
      <div class="card-body">
        <h1 class="h3 mb-2">Your video is ready</h1>
        <h5 class="text-teal-700">Click the button below to download</h5>
        <hr>
        <div class="space-y-3">
           <p class="text-gray-700">
            Your ${name} video is ready
          </p>
          <p class="text-gray-700">
            Thank you for using our service
          </p>
        </div>
        <hr>
        <a class="btn btn-priamry" href="${url}" target="_blank">Download</a>
      </div>
    </div>
  </div>
</body>
</html>`
}

module.exports = {errorMail, videoReminderMail}