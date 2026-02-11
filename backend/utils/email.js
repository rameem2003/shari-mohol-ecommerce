const nodemailer = require("nodemailer");
const { TransactionalEmailsApi, SendSmtpEmail } = require("@getbrevo/brevo");

let emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.EMAIL_API_KEY;

// Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   // host: "smtp.ethereal.email",
//   // port: 587,
//   // secure: false, // true for 465, false for other ports
//   service: "gmail",
//   auth: {
//     user: "info.rolstudio.bd@gmail.com",
//     pass: "nzge yqik iagq cgkd",
//   },
// });

// Wrap in an async IIFE so we can use await.
// const sendEmail = async (to, subject, html) => {
//   //   const testAccount = await nodemailer.createTestAccount();
//   console.log("Sending Email...");

//   const info = await transporter.sendMail({
//     from: "info.rolstudio.bd@gmail.com", // sender address
//     to,
//     subject,
//     html,
//   });

//   console.log(info);
//   console.log("Message sent: %s", to);

//   //   let testUrl = nodemailer.getTestMessageUrl(info);
//   //   console.log("Preview URL: ", testUrl);
// };

const sendEmail = (to, subject, html) => {
  let message = new SendSmtpEmail();
  message.subject = subject;
  message.htmlContent = html;
  message.sender = {
    name: "Shari Mohol",
    email: "info.rolstudio.bd@gmail.com",
  };
  message.to = [{ email: to }];

  emailAPI
    .sendTransacEmail(message)
    .then((res) => {
      console.log(JSON.stringify(res.body));
    })
    .catch((err) => {
      console.error("Error sending email:", err.body);
    });
};

module.exports = sendEmail;
