const NodeRSA = require("node-rsa");
const fs = require("fs");

const encryptData = (data) => {
  const publicKey = fs.readFileSync("public.pem", "utf8");
  const key = new NodeRSA(publicKey);

  const encryptedData = key.encrypt(data, "base64");
  return encryptedData;
};

module.exports = encryptData;
