const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

async function run(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  try {
    const answer = await run(msg.text);

    await bot.sendMessage(chatId, answer);
  } catch (err) {
    console.log(err);
    await bot.sendMessage(chatId, "Xatolik chiqdi 😢");
  }
});
