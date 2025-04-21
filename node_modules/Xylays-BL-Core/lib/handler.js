const fs = require('fs');
const path = require('path');

const loadCommands = () => {
  const commands = {};
  const files = fs.readdirSync(path.join(__dirname, '../Handler/commandParser'));

  for (const file of files) {
    const command = require(`../Handler/commandParser/${file}`);
    commands[command.name] = command;
  }

  return commands;
};

module.exports = { loadCommands };