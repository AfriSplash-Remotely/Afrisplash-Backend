const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const emailSender = async (
  sender_email,
  sender_pass,
  recipient,
  subject,
  body
) => {
  const MAIL_HOST = process.env.MAIL_HOST;

  const transport = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: sender_email,
      pass: sender_pass
    }
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.resolve('./template'),
      defaultLayout: false
    },
    viewPath: ''
  };

  transport.use('compile', hbs(handlebarsOptions));

  const mailOptions = {
    from: '',
    to: recipient,
    subject: subject,
    template: 'email',
    context: { body }
  };

  try {
    await transport.sendMail(mailOptions);

    return {
      status: true,
      message: 'Email sent'
    };
  } catch (error) {
    return {
      status: false,
      message: 'Email not sent'
    };
  }
};

module.exports = emailSender;
