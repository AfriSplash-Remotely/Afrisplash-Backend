const mongoose = require('mongoose');
const path = require('path');
const createPermissions = require('../utils/createPermissions');
const fs = require('fs').promises;

mongoose.Promise = global.Promise;

const tlsCAFile = path.join(__dirname, './global-bundle.pem');
const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;

const connect = mongoose.connection;

const connectDB = async () => {
  connect.on('connected', async () => {
    console.log('MongoDB Connection Established');
    createPermissions();
  });

  connect.on('reconnected', async () => {
    console.log('MongoDB Connection Reestablished');
  });

  connect.on('disconnected', () => {
    console.log('Mongo Connection Disconnected');
    console.log('Trying to reconnect to Mongo ...');

    setTimeout(() => {
      mongoose.connect(process.env.MONGO_URI, {
        tlsCAFile: tlsCAFile,
        tls: process.env.MONGO_REPLSET ? true : false,
        replicaSet: process.env.MONGO_REPLSET,
        readPreference: process.env.MONGO_READ_PREFERENCE,
        retryWrites: false,

        //required for the certificate shit
        authMechanism: 'MONGODB-X509',
        auth: { username: USERNAME, password: PASSWORD },

        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000
      });
    }, 3000);
  });

  connect.on('close', () => {
    console.log('Mongo Connection Closed');
  });

  connect.on('error', (error) => {
    console.log('Mongo Connection ERROR: ' + error);
  });

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsCAFile: tlsCAFile,
      tls: process.env.MONGO_REPLSET ? true : false,
      replicaSet: process.env.MONGO_REPLSET,
      readPreference: process.env.MONGO_READ_PREFERENCE,
      retryWrites: false,
      //required for the certificate shit
      authMechanism: 'MONGODB-X509',
      auth: { username: USERNAME, password: PASSWORD },

      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB, connect };
