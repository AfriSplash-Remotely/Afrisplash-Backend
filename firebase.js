const firebase = require('firebase-admin');

const serviceAccount = require('./firebase-service-account.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;
