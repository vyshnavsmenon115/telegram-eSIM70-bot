require('dotenv').config();

const { createBot } = require('./src/bot/createBot');
const { getConfig } = require('./src/config');

async function bootstrap() {
    const config = getConfig();
    const bot = createBot(config);

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
