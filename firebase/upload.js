const firebase = require('./firebase');
const { v4: uuidv4 } = require('uuid');

const upload = async (buffer, mimetype) => {
  try {
    const destination = `Afrisplash/${uuidv4()}`;
    const bucket = firebase.storage().bucket('mylangcoach-1e26a.appspot.com');

    // Upload to firebase storage
    const file = bucket.file(destination);
    await file.save(buffer, {
      metadata: {
        contentType: mimetype
      }
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2070'
    });

    return {
      status: true,
      data: url
    };
  } catch (error) {
    return {
      status: false,
      error: error
    };
  }
};

module.exports = upload;
