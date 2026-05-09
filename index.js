const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const result = await model.generateContent(text);
    const response = result.response.text();

    bot.sendMessage(chatId, response);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, 'Xatolik chiqdi 😢');
  }
});
