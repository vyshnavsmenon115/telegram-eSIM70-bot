"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBot = void 0;
const telegraf_1 = require("telegraf");
const registerHandlers_1 = require("./registerHandlers");
const rateLimit_1 = require("./middleware/rateLimit");
const createBot = (config) => {
    const bot = new telegraf_1.Telegraf(config.botToken);
    bot.use((0, rateLimit_1.createRateLimitMiddleware)());
    (0, registerHandlers_1.registerHandlers)(bot, config);
    return bot;
};
exports.createBot = createBot;
