const fs = require('fs');
const path = require('path');

function loadCommands(dir = path.join(__dirname, '../Handler/commandParser')) {
  const commands = new Map();
  const files = fs.readdirSync(dir);

  for (let file of files) {
    if (!file.endsWith('.js')) continue;
    const command = require(path.join(dir, file));
    if (command.name) {
      commands.set(command.name, command);
    }
  }

  return commands;
}

module.exports = loadCommands;