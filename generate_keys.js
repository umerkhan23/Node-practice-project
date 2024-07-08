const rsa = require("node-rsa");
const fs = require("fs");
const path = require("path");

const key = new rsa({ b: 2048 });

const publicKey = key.exportKey("public");
const privateKey = key.exportKey("private");

fs.writeFileSync(path.join(__dirname, "public.pem"), publicKey);
fs.writeFileSync(path.join(__dirname, "private.pem"), privateKey);

console.log("Keys generated successfully");
