const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const emailSender = async (
  email_view, // the name of the view template to use in /mail/views/*hbs
  sender_email,
  sender_pass,
  from,
  recipient,
  subject,
  body
) => {
  const MAIL_HOST = process.env.MAIL_HOST;
  const MAIL_PORT = process.env.MAIL_PORT;

  const transport = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    auth: {
      user: sender_email,
      pass: sender_pass
    }
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  let mailOptions = {
    from: from,
    to: recipient,
    subject: subject,
    html: body
    // template: email_view,
    // context: { body, recipient, subject, username }
  };

  if (email_view != 'blank') {
    const handlebarsOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./views'),
        defaultLayout: false
      },
      viewPath: path.resolve('./mail/views'),
      extName: '.hbs'
    };

    transport.use('compile', hbs(handlebarsOptions));

    mailOptions['template'] = email_view;
    mailOptions['context'] = { body, recipient, subject };
  }

  try {
    await transport.sendMail(mailOptions);
    //TODO: implenment Proper Logging
    return {
      status: true,
      message: 'Email sent'
    };
  } catch (error) {
    //TODO: implenment Proper Logging
    return {
      status: false,
      message: 'Email not sent',
      error: error.message,
      data: { recipient, subject, body }
    };
  }
};

module.exports = emailSender;
