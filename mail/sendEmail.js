const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const sendEmail = async (options) => {
  const mailgunAuth = {
    auth: {
      api_key: process.env.MG_API_KEY,
      domain: process.env.MG_DOMAIN_NAME
    }
  };

  const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

  const mailOptions = {
    from: options.sender || `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Successfully sent email.');
    }
  });
};

module.exports = sendEmail;
