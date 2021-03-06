const Attendance = require("../models/attendanceCode");
const nodemailer = require('nodemailer');
const config = require('config');

exports.randomString = (length) => {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.makeAttendanceCode = (code) => {
    var dt = new Date();
    dt2 = dt;
    console.log(dt2.toString());
    dt2.setHours(dt2.getHours() + 6);
    console.log(dt2.toString());
    // console.log("here 1")
    let newCode = new Attendance({
        code: code.toUpperCase(),
        createdAt: dt,
        expiry: dt2
    });
    newCode.save()
    console.log(newCode)
};

exports.mailer = (to, subject, html) => {
  var nodemailer = require('nodemailer');
  var mailOptions = {
    from: config.get("Email"),
    to: to,
    subject: subject,
    html: html
  };
var transporter = nodemailer.createTransport({
  service: config.get("EmailProvider"),
  auth: {
    user: config.get("Email"),
    pass: config.get("EmailPassword")
  }
});
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});

}

exports.leaveDays = function (){
  var d = new Date(new Date().getFullYear(), 0, 1);
  var today = isToday(d);
  return today;
}

const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
}