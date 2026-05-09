const TelegramBot = require('node-telegram-bot-api');
const Groq = require('groq-sdk');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
      model: 'llama3-8b-8192',
    });

    const answer =
      chatCompletion.choices[0]?.message?.content ||
      'Javob topilmadi';

    bot.sendMessage(chatId, answer);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, 'Xatolik chiqdi 😢');
  }
});
