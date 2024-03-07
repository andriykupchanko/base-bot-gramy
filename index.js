const { Bot } = require("grammy");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken);

bot.command("start", ctx => ctx.reply("Welcome! Up and running."));
bot.on("message", ctx => ctx.reply("Got    another message!"));

bot.start();
