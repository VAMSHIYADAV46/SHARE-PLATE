const nodemailer = require('nodemailer');

// Create a transporter object using the Gmail SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nanidx46@gmail.com', // Your Gmail address
    pass: 'xxzx yelh ymcb qcgh',  // Your Gmail app password (see note below)
  },
});

// Define email options
const mailOptions = {
  from: 'nanidx46@gmail.com',  // Sender address
  to: 'roshanraj21424@gmail.com',   // List of recipients
  subject: 'Hello from Node.js', // Subject line
  text: 'This is a test email sent from a Node.js application.',  // Plain text body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});