import 'dotenv/config';

import { createBot } from './src/bot/createBot';
import { getConfig } from './src/config';

async function bootstrap(): Promise<void> {
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

bootstrap().catch((error: unknown) => {
    console.error('Failed to start bot:', error);
    process.exit(1);
});
