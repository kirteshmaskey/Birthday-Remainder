require('dotenv').config();
require('./db/conn');
const cron = require('node-cron');
const cors = require('cors');
const express = require('express');
const router = require('./routes/router');
const authRouter = require('./routes/authRouter');
const nodemailer = require('nodemailer');
const { getMailSubject } = require('./models/mailSubjects');
const { getMailBody } = require('./models/mailBody');
const bd = require('./models/birthdaySchema');



const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', router);

const port = process.env.PORT;




const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});


const sendBirthdayWishMail = async(email, name, senderName) => { 
  const subject = getMailSubject(name);
  const mailBody = getMailBody();
  await transporter.sendMail({
    from: 'kkmkittu36@gmail.com',
    to: email,
    subject: subject,
    html: `<p>Dear ${name},</p>
           <br />
           <p>${mailBody}</p>
           <br>
           <p>Warmest regards,</p>
           <p>${senderName}</p>`
  })
};


const checkTodaysBirthday = async () => {
  // get todays date
  const today = new Date();
  const t_dd = today.getDate();
  const t_mm = today.getMonth();

  const birthdays = await bd.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: "$dob" }, t_dd] },
        { $eq: [{ $month: "$dob" }, t_mm + 1] }
      ]
    }}).populate("userId");
  
    const length = Object.keys(birthdays).length;

  for(let i=0; i<length; i++) {
    const { name, email, userId } = birthdays[i];
    sendBirthdayWishMail(email, name, userId.name);
  }
};

// checkTodaysBirthday();
// setInterval(() => {
//   checkTodaysBirthday();
// }, 24 * 60 * 60 * 1000);

cron.schedule('0 1 * * *', function() {
  checkTodaysBirthday();
});

app.listen(port, ()=>{
  console.log(`Server running on port ::: ${port}`);
});