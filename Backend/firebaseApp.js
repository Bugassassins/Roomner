require("dotenv").config();  
const admin = require("firebase-admin");

const serviceAccount = {
    "type": process.env.ADMIN_TYPE,
    "project_id": process.env.ADMIN_PROJECT_ID,
    "private_key_id": process.env.ADMIN_PRIVATE_KEY_ID,
    "private_key": process.env.ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.ADMIN_CLIENT_EMAIL,
    "client_id": process.env.ADMIN_CLIENT_ID,
    "auth_uri": process.env.ADMIN_AUTH_URI,
    "token_uri": process.env.ADMIN_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.ADMIN_AUTH_PROVIDER_x509_CERT_URL,
    "client_x509_cert_url": process.env.ADMIN_CLIENT_x509_CERT_URL
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.ADMIN_DATABASE_URL
});  
module.exports=admin;