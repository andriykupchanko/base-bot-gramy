const { Bot, GrammyError, HttpError } = require("grammy");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken);

bot.command("start", ctx => ctx.reply("Welcome! Up and running."));

bot.on("message", ctx => ctx.reply("Got another message!"));

bot.catch(err => {
  const ctx = err.ctx;
  console.log(`Error while handling update ${ctx.update.update_id}:`);
  if (err instanceof GrammyError) {
    console.error("Client error:", err.description);
  } else if (err instanceof HttpError) {
    console.error("Server error:", err.statusCode);
  } else {
    console.error("Unknown error:", err);
  }
});
bot.start();
