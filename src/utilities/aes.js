const crypto = require('crypto');
require('dotenv').config( { 'path': __dirname+'/../.env' });
const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENC_KEY || '5919d07781d0ad4bc945f2eee4f42489'; // crypto.randomBytes(16).toString('hex')
const iv = Buffer.from(process.env.ENC_IV || '806518341f7a98c72a85649d0345cec5', 'hex'); // crypto.randomBytes(16).toString('hex')

const encrypt = (text) => {
    const textString = String(text);
    // This line creates a cipher object with the algorithm, secret key, and iv
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    // This line encrypts the text passed in using the cipher object and returns a buffer
    const encrypted = Buffer.concat([cipher.update(textString, 'utf-8'), cipher.final()]);
    // This line returns the buffer as a hex string
    return encrypted.toString('hex');
};

const decrypt = (hash) => {
    // This line creates a decipher object with the algorithm, secret key, and iv
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    // This line decrypts the hash passed in using the decipher object and returns a buffer
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    // This line returns the buffer as a string
    return decrypted.toString();
};

module.exports = { encrypt, decrypt };