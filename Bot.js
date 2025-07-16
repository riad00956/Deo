const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('🎉 Bot is now running and ready to help you!'));

bot.command('hello', (ctx) => ctx.reply('👋 Hello from your hosted bot!'));

bot.launch();
console.log('✅ Telegram Bot launched successfully.');