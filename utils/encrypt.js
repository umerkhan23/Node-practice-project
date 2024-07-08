const NodeRSA = require("node-rsa");
const fs = require("fs");

// // Read the public key from the file
// const publicKey = fs.readFileSync("public_key.pem", "utf8");

// // Create a new instance of NodeRSA with the public key
// const key = new NodeRSA(publicKey);

// // Data to be encrypted
// const data = "This is the data to be encrypted";

// // Encrypt the data using the public key
// const encryptedData = key.encrypt(data, "base64");

// console.log("Encrypted Data:", encryptedData);

const encryptData = (data) => {
  const publicKey = fs.readFileSync("public.pem", "utf8");
  const key = new NodeRSA(publicKey);

  const encryptedData = key.encrypt(data, "base64");
  return encryptedData;
};

module.exports = encryptData;
