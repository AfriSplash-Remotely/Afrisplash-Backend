const dotenv = require('dotenv');
dotenv.config({ path: './.env/config.env' });

const serviceConfigs = {
  type: 'service_account',
  project_id: 'mylangcoach-1e26a',
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email:
    'firebase-adminsdk-f2hq1@mylangcoach-1e26a.iam.gserviceaccount.com',
  client_id: '104229233184731093568',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f2hq1%40mylangcoach-1e26a.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};

module.exports = serviceConfigs;
