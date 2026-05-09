const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.toLowerCase() === 'salom') {
    bot.sendMessage(chatId, 'Va alaykum salom 😊');
  } else {
    bot.sendMessage(chatId, 'Siz yozdingiz: ' + text);
  }
});
