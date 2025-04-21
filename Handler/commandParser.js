const config = require('../config');

// Definisi fungsi untuk parsing command
const parseCommand = (m) => {
  const prefixes = config.prefix || ['.', '/', '!'];
  
  let body = '';
  if (m.message?.conversation) body = m.message.conversation;
  else if (m.message?.extendedTextMessage?.text) body = m.message.extendedTextMessage.text;
  else if (m.message?.imageMessage?.caption) body = m.message.imageMessage.caption;
  else if (m.message?.videoMessage?.caption) body = m.message.videoMessage.caption;

  const prefix = prefixes.find(p => body.startsWith(p));
  if (!prefix) return {};

  const withoutPrefix = body.slice(prefix.length).trim();
  const [command, ...args] = withoutPrefix.split(/\s+/);

  return {
    prefix,
    command,
    args,
    full: withoutPrefix,
    body
  };
};

module.exports = {
  parseCommand
};