const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('TOKEN_KAMU', { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Halo, ini bot ryy WA+Telegram!');
});