const { downloadMediaMessage } = require('./lib/connection');
const fs = require('fs');
const path = require('path');

async function handleMediaMessage(sock, msg, type) {
  const stream = await downloadMediaMessage(msg, 'buffer', {}, { logger: sock.logger });
  const filePath = path.resolve(__dirname, `../tmp/${Date.now()}.${type}`);
  fs.writeFileSync(filePath, stream);
  return filePath;
}

module.exports = handleMediaMessage;