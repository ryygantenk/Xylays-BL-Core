const { useMultiFileAuthState } = require('./lib/connection');
const path = require('path');

async function getSession(sessionId = 'default') {
  const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, `../sessions/${sessionId}`));
  return { state, saveCreds };
}

module.exports = getSession;