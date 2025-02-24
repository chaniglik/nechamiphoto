// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'chanig847@gmail.com',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: '052tova@gmail.com',
//   to: 'chanig847@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // הוספת CORS
require('dotenv').config(); // שימוש בקובץ .env לאבטחת פרטי המייל

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // הוספת Middleware של CORS
app.use(bodyParser.json());
// מסדרים את פרטי המייל בתור משתנים מאובטחים
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // לפעמים נדרש אם יש בעיות בהצפנה
  },
});



// נקודת שליחה לקבלת נתונים ושליחת מייל
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received request:", req.body); // לוג של הנתונים שהתקבלו

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // כתובת שאליה המיילים יישלחו
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  console.log("Mail options:", mailOptions); // לוג של הגדרת המייל

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error); // הוצאת השגיאה לפלט
      res.status(500).send('Error sending email: ' + error.message); // הוצאת השגיאה כתגובה
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });  
});
console.log('Email:', process.env.EMAIL_USER);
console.log('Password:', process.env.EMAIL_PASS); // 
// מאזינים לשרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
