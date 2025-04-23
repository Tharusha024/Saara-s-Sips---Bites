import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // TLS
  secure: false, // TLS, not SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

  const sendEmail = (to, subject, text = '', html = '') => {
    const mailOptions = {
      from: process.env.EMAIL, 
      to,
      subject,
      text,
      html,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
  
  export { sendEmail };