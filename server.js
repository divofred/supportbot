require('dotenv').config();
const express = require('express');
const app = express();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(bot.webhookCallback('/secret-path'));

app.get('/', (req, res) => {
  res.send('This is a Telegram bot!');
});

bot.start(ctx => ctx.reply('Welcome send us message and we will respond ASAP'));
bot.help(ctx => ctx.reply('Call me baby, +234 812 688 7684'));

bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.on('text', msg => {
  let text = msg.message.text.toLowerCase().includes('reply');
  if (text) {
    let newTExt = msg.message.text.split(' ')[1];
    let newMessage = msg.message.text.split('next ')[1];
    console.log(newMessage);
    let brand = parseInt(newTExt);
    try {
      msg.telegram.sendMessage(brand, newMessage);
    } catch {
      ctx.telegram.sendMessage(926840081, `Error`);
    }
  } else {
    msg.telegram.sendMessage(
      926840081,
      `Text ${msg.message.text}, Id ${msg.chat.id}`
    );
  }
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});
const PORT = process.env.PORT || 5000;
bot.launch();
app.listen(PORT, () => console.log('Listening on port', PORT));
