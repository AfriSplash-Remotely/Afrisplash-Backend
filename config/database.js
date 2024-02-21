const mongoose = require('mongoose');
const path = require('path');
const createPermissions = require('../utils/createPermissions');
const fs = require('fs').promises;

mongoose.Promise = global.Promise;

const tlsCAFile = path.join(__dirname, './global-bundle.pem');
const connect = mongoose.connection;
const USERNAME = process.env.MONGO_USERNAME;
const HOST = process.env.MONGO_HOST;
const MONGO_URI = `mongodb://${encodeURIComponent(
  USERNAME
)}@${HOST}:27017/test`;

console.log(MONGO_URI);

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
      mongoose.connect(MONGO_URI, {
        tlsCAFile: tlsCAFile,
        tls: process.env.MONGO_REPLSET ? true : false,
        replicaSet: process.env.MONGO_REPLSET,
        readPreference: process.env.MONGO_READ_PREFERENCE,
        retryWrites: true,
        authMechanism: 'MONGODB-X509',
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
    await mongoose.connect(MONGO_URI, {
      tlsCAFile: tlsCAFile,
      tls: process.env.MONGO_REPLSET ? true : false,
      replicaSet: process.env.MONGO_REPLSET,
      readPreference: process.env.MONGO_READ_PREFERENCE,
      retryWrites: true,
      authMechanism: 'MONGODB-X509',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB, connect };
