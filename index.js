const { Bot, GrammyError, HttpError, Keyboard } = require("grammy");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken);

// створюємо меню для користувача з командами
bot.api.setMyCommands([
  { command: "start", description: "Starts the bot" },
  { command: "say_hello", description: "Says hello" },
  { command: "say_hi", description: "Says hello" }
]);

bot.command("start", ctx => {
  ctx.react("👍");
  ctx.reply("Welcome\\! Up *and* _running_\\.", {
    reply_parameters: { message_id: ctx.msg.message_id },
    parse_mode: "MarkdownV2"
  });
});

// перевіряємо повідомлення чи відповідає регулярному виразу
bot.hears(/fuck/, ctx => ctx.reply("worn"));

// перевіряємо повідомлення чи відповідає повідомленню
bot.hears(["ping", "pin"], ctx => ctx.reply("pong"));
bot.hears("id", ctx => ctx.reply(ctx.from.id));

// перевіряємо повідомлення по схожості до команд
bot.command(["say_hello", "hello", "say_hi"], async ctx => {
  await ctx.reply("Hello!");
});

// філтруємо повідомлення по схожості до медіа
bot.on([":media", "::url"], async ctx => {
  await ctx.reply("Получил ссылку");
});

bot.command("mood", ctx => {
  const keyboard = new Keyboard()
    .text("🙂")
    .row()
    .text("😐")
    .row()
    .text("🙁")
    .resized()
    .oneTime();

  ctx.reply("What's your mood?", { reply_markup: keyboard });
});
// перевіряємо користувача як адмін
// bot.on("msg").filter(
//   ctx => {
//     return ctx.from.id == 617976579;
//   },
//   ctx => ctx.reply("Got a Admin message!")
// );

bot.on("message", ctx => ctx.reply("Got another message!"));

//перевіряємо чи є помилки
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
