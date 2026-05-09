const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Gemini AI botga xush kelibsiz 🤖');
    return;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: text }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    const reply =
      data.candidates[0].content.parts[0].text;

    bot.sendMessage(chatId, reply);

  } catch (error) {
    console.log(error);

    bot.sendMessage(
      chatId,
      'Xatolik chiqdi 😢'
    );
  }
});
