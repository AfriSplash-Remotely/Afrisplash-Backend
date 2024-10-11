const firebase = require('firebase-admin');

const serviceAccount = require('./firebase-service-account');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;
