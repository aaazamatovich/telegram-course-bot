const TelegramBot = require('node-telegram-bot-api');

const token = process.env.AAH6MVgTwqX8eu2MCdKFVhOAh2rGr-ZJGnA;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Salom Jonibek 🚀');
});
