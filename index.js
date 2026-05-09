const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'AI botga xush kelibsiz 🤖');
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    bot.sendMessage(chatId, reply);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, 'Xatolik chiqdi 😢');
  }
});
