const menu = require('./menu');

module.exports = [
  {
    name: 'menu',
    exec: async (sock, msg) => {
      await sock.sendMessage(msg.chat, { text: menu() }, { quoted: msg })
    }
  }
];