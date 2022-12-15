const googleAPI = require('googleapis');

const oauth2Client = new googleAPI.Auth.OAuth2Client({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.CLIENT_URI
});

module.exports = oauth2Client;
