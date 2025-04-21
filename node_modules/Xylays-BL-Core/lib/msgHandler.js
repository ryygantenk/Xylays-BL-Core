const { parseCommand } = require('./Handler/commandParser');
const { loadCommands } = require('../handler/commands');

const commands = loadCommands();

module.exports = async (client, m, store) => {
  if (!m.message) return;

  const { prefix, command, args } = parseCommand(m);

  if (!command) return;

  const cmd = commands[command.toLowerCase()];
  if (cmd) {
    try {
      await cmd.run(client, m, args, store);
    } catch (e) {
      console.error('Error executing command:', e);
    }
  }
};