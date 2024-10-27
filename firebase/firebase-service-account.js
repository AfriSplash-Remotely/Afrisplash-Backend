const dotenv = require('dotenv');
dotenv.config({ path: './.env/config.env' });

const serviceConfigs = {
  type: 'service_account',
  project_id: 'afrisplash-b5e65',
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email:
    'firebase-adminsdk-oezqa@afrisplash-b5e65.iam.gserviceaccount.com',
  client_id: '105251078870616384756',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oezqa%40afrisplash-b5e65.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};

module.exports = serviceConfigs;
