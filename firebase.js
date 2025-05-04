const admin = require('firebase-admin');
const serviceAccount = require('./your-service-account-key.json'); // Make sure this file is in the same folder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://al-master-1cd6e-default-rtdb.firebaseio.com' // Replace with your database URL
});

const db = admin.firestore();

module.exports = db;
