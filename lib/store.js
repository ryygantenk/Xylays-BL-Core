// store.js
const { makeInMemoryStore } = require('./lib/connection');
const { default: chalk } = require('chalk');
const P = require('pino');
const fs = require('fs');

const store = makeInMemoryStore({
  logger: P().child({ level: 'silent', stream: 'store' }),
});

store?.readFromFile('./store.json');
setInterval(() => {
  store?.writeToFile('./store.json');
}, 10000);

console.log(chalk.green('[STORE]'), 'Store initialized');

module.exports = store;