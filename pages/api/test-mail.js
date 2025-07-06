import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'harshlad4920@gmail.com',
    pass: 'ymxpptjuuxowiif',
  },
});

transporter.sendMail({
  from: `"Harsh Test" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: "Test Email from Node.js",
  text: "This is a test email sent using Nodemailer.",
}).then(() => {
  console.log("✅ Email sent");
}).catch((err) => {
  console.error("❌ Failed to send:", err);
});
