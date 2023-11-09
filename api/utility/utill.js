const crypto = require("crypto");
const data = require("../data.json");
// @ function
// export const to generate a secret key based on name, origin, and destination
const generateSecretKey = (name, origin, destination) => {
  const data = `${name}${origin}${destination}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};

// export const to encrypt a message using AES-256 encryption
const encryptMessage = (message, passkey) => {
  const cipher = crypto.createCipher("aes-256-ctr", passkey);
  let encryptedMessage = cipher.update(message, "utf8", "hex");
  encryptedMessage += cipher.final("hex");
  // Note: decryptMessage is called here, but its return value is not used or stored
  DecMess(encryptedMessage, passkey);
  return encryptedMessage;
};

const DecMess = (encryptedMessage, passkey) => {
  const decipher = crypto.createDecipher("aes-256-ctr", passkey);
  let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
  decryptedMessage += decipher.final("utf8");
  return decryptedMessage;
};

// export const to decrypt a message using AES-256 decryption
module.exports.decryptMessage = (encryptedMessage, passkey) => {
  const decipher = crypto.createDecipher("aes-256-ctr", passkey);
  let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
  decryptedMessage += decipher.final("utf8");
  return decryptedMessage;
};

// export const to generate and emit a data stream to connected clients via WebSocket
module.exports.generateAndEmitDataStream = (socket) => {
  const name = data.names[Math.floor(Math.random() * data.names.length)];
  const origin = data.cities[Math.floor(Math.random() * data.cities.length)];
  const destination =
    data.cities[Math.floor(Math.random() * data.cities.length)];

  const secretKey = generateSecretKey(name, origin, destination);
  const originalMessage = {
    name,
    origin,
    destination,
    secretKey,
    timeStamp: Date.now(),
    meta: 5,
  };
  const encryptedMessage = encryptMessage(
    JSON.stringify(originalMessage),
    secretKey
  );
  socket.emit("encrypted", { encryptedMessage, secretKey });
};

// export const to validate received data
module.exports.isDataValid = (userValue, key) => {
  const currentTime = Date.now();
  if (
    Object.keys(userValue).length === userValue.meta + 1 &&
    userValue.secretKey === key
  ) {
    const timeDifference = currentTime - userValue.timeStamp;

    if (timeDifference <= 60000) {
      return true;
    }
  }
  return false;
};
