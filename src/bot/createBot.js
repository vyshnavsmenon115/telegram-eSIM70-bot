const { Telegraf } = require('telegraf');
const { createRateLimitMiddleware } = require('./middleware/rateLimit');
const { registerHandlers } = require('./registerHandlers');

const createBot = (config) => {
    const bot = new Telegraf(config.botToken);

    bot.use(createRateLimitMiddleware());
    registerHandlers(bot, config);

    return bot;
};

module.exports = {
    createBot,
};
