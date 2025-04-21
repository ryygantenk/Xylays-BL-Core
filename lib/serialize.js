const baileys = require('Xylays-BL-Core');

exports.serialize = async (sock, msg) => {
  msg = msg || {};
  const type = Object.keys(msg.message || {})[0];
  const content = msg.message[type];
  const isCmd = (msg.message?.conversation || content?.text || '').startsWith('.');
  const text = msg.message?.conversation || content?.text || '';
  const command = isCmd ? text.trim().split(/ +/).shift().toLowerCase().slice(1) : null;
  const args = isCmd ? text.trim().split(/ +/).slice(1) : [];

  return {
    chat: msg.key.remoteJid,
    sender: msg.key.participant || msg.key.remoteJid,
    text,
    command,
    args,
    type,
    msg,
    fromMe: msg.key.fromMe
  };
};