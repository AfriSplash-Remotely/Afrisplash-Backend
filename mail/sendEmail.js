const nodemailer = require('nodemailer');
const fs = require('fs');

/**
 *
 * @param {Object} option
 * @param {String} option.to
 * @param {String} option.from
 * @param {String} option.subject
 * @param {String} option.message
 * @param {String} option.user `optional`
 * @param {String} option.pass `optional`
 * @param {String} option.port `optional`
 * @param {String} option.host `optional`
 * @returns
 */

const sendEmail = async (option) => {
  // Keys
  let user = option.user ? option.user : process.env.MAIL_USER;
  let pass = option.pass ? option.pass : process.env.MAIL_PASS;
  let port = option.port ? option.port : process.env.MAIL_PORT;
  let host = option.host ? option.host : process.env.MAIL_HOST;

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: option.name
      ? `${option.name} ${user}`
      : `${process.env.MAIL_NAME} ${process.env.MAIL_USER}`,
    to: option.to,
    subject: option.subject,
    html: option.message
  };

  return transporter.sendMail(mailOptions, (error, data) => {
    if (data) {
    //TODO: implenment Proper Logging
      return;
    }
    if (error) {
      //TODO: implenment Proper Logging
      return;
    }
  });
};

module.exports = sendEmail;
