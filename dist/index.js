"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const createBot_1 = require("./src/bot/createBot");
const config_1 = require("./src/config");
async function bootstrap() {
    const config = (0, config_1.getConfig)();
    const bot = (0, createBot_1.createBot)(config);
    await bot.telegram.setMyCommands([
        { command: 'start', description: 'Start the bot' },
        { command: 'menu', description: 'Show the main menu' },
        { command: 'help', description: 'Get help' },
        { command: 'faq', description: 'Browse FAQs' },
    ]);
    await bot.launch();
    console.log('Bot running...');
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
bootstrap().catch((error) => {
    console.error('Failed to start bot:', error);
    process.exit(1);
});
