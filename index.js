bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Botga xush kelibsiz 🚀');
  }

  else if (text === 'salom') {
    bot.sendMessage(chatId, 'Va alaykum salom 😊');
  }

  else {
    bot.sendMessage(chatId, 'Tushunmadim 😅');
  }
});
