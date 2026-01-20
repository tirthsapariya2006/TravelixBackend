const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./firebaseServiceAccount.json")
  )
});

module.exports = admin;
