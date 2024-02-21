const mongoose = require('mongoose');
const path = require('path');
const createPermissions = require('../utils/createPermissions');
mongoose.Promise = global.Promise;

// let tscFile = path.dirname('./global-bundle.pem');
let tlsCAFile = path.join(__dirname, './global-bundle.pem');

// MONGO_URI = process.env.MONGO_URI + tlsCAFile
const connect = mongoose.connection;
const connectDB = async () => {
  connect.on('connected', async () => {
    console.log('MongoDB Connection Established');

    // Call the function to create Admin Permissions
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
        tlsCAFile: require('fs').readFileSync(tlsCAFile),
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

  await mongoose
    .connect(process.env.MONGO_URI, {
      tlsCAFile: require('fs').readFileSync(tlsCAFile),
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDB, connect };
