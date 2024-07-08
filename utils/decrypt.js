const fs = require("fs");
const NodeRSA = require("node-rsa");

// // Step 1: Load the private key from private_key.pem
// const privateKeyPem = fs.readFileSync("private_key.pem", "utf8");
// const privateKey = new NodeRSA(privateKeyPem);

// // Step 2: Encrypt some data using the public key
// const publicKeyPem = fs.readFileSync("public_key.pem", "utf8");
// const publicKey = new NodeRSA(publicKeyPem);

// const dataToEncrypt = "Hello, this is a secret message!";
// const encryptedData = publicKey.encrypt(dataToEncrypt, "base64");

// console.log("Encrypted data:", encryptedData);

// // Step 3: Decrypt the data using the private key
// const decryptedData = privateKey.decrypt(encryptedData, "utf8");

// console.log("Decrypted data:", decryptedData);

const decryptData = (data) => {
  const privateKeyPem = fs.readFileSync("private.pem", "utf8");
  const privateKey = new NodeRSA(privateKeyPem);

  const decryptedData = privateKey.decrypt(data, "utf8");
  return decryptedData;
};

module.exports = decryptData;
