const fs = require("fs");
const NodeRSA = require("node-rsa");

const decryptData = (data) => {
  const privateKeyPem = fs.readFileSync("private.pem", "utf8");
  const privateKey = new NodeRSA(privateKeyPem);

  const decryptedData = privateKey.decrypt(data, "utf8");
  return decryptedData;
};

module.exports = decryptData;
