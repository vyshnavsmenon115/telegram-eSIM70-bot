import { Telegraf } from 'telegraf';

import type { Context } from 'telegraf';

import type { AppConfig } from '../config';
import { registerHandlers } from './registerHandlers';
import { createRateLimitMiddleware } from './middleware/rateLimit';

export const createBot = (config: AppConfig): Telegraf<Context> => {
    const bot = new Telegraf<Context>(config.botToken);

    bot.use(createRateLimitMiddleware());
    registerHandlers(bot, config);

    return bot;
};
