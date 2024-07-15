const firebase = require('firebase-admin');

const serviceAccount = require('./firebase-service-account');

// console.log(serviceAccount);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;
