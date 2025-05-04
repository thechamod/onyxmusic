const admin = require('firebase-admin');
const serviceAccount = require('./al-master-1cd6e-firebase-adminsdk-fbsvc-213a107551.json'); // Make sure this file is in the same folder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://al-master-1cd6e-default-rtdb.firebaseio.com' // Replace with your database URL
});

const db = admin.firestore();

module.exports = db;
