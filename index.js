const TelegramBot = require('node-telegram-bot-api');

const token = process.env.8525694220:AAGXJ2SD951Ys9wlTBUClu1qRBSD6RBNs_Y;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Salom 🚀');
});
