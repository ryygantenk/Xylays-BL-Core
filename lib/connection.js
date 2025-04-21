const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('ryygantenk/Xylays-BL-Core');
const handler = require('./command-handler');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: true,
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    try {
      await handler(msg, sock);
    } catch (err) {
      console.error('Handler error:', err);
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

module.exports = { startBot };