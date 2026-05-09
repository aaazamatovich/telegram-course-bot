const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runAI(text) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
  });

  const result = await model.generateContent(text);
  const response = await result.response;
  return response.text();
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    const answer = await runAI(text);
    bot.sendMessage(chatId, answer);
  } catch (err) {
    console.log(err);
    bot.sendMessage(chatId, 'AI ishlamayapti 😢');
  }
});
