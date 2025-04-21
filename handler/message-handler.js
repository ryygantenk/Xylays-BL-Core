const util = require('util');
const fs = require('fs');
const path = require('path');
const commands = require('../lib/command');
const { serialize } = require('../lib/serialize');

module.exports = async (sock, m) => {
  const msg = m.messages[0];
  if (!msg.message || msg.key && msg.key.remoteJid === 'status@broadcast') return;

  const serialized = await serialize(sock, msg);
  if (!serialized.text) return;

  const command = commands.find(cmd => cmd.name === serialized.command);
  if (command) {
    return command.exec(sock, serialized);
  }
};