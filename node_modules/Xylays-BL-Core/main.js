const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('./lib/connection')

const handler = require('./command-handler')

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version, isLatest } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: true
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    try {
      await handler(msg, sock)
    } catch (err) {
      console.error('Handler error:', err)
    }
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = 
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) {
        console.log('Reconnecting...')
        startBot()
      } else {
        console.log('Connection closed. You are logged out.')
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp.')
    }
  })

  sock.ev.on('creds.update', saveCreds)
}

startBot()