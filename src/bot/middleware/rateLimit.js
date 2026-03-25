const RATE_LIMIT_WINDOW_MS = 10 * 1000;
const RATE_LIMIT_MAX_EVENTS = 6;
const RATE_LIMIT_BLOCK_MESSAGE_MS = 30 * 1000;

const createRateLimitMiddleware = () => {
    const rateLimitState = new Map();

    const getRateLimitKey = (ctx) => {
        const chatId = ctx.chat?.id;
        const userId = ctx.from?.id;

        if (chatId && userId) {
            return `${chatId}:${userId}`;
        }

        return chatId || userId || null;
    };

    const cleanupRateLimitState = (now) => {
        for (const [key, entry] of rateLimitState.entries()) {
            if (entry.blockUntil <= now && entry.events.length === 0) {
                rateLimitState.delete(key);
            }
        }
    };

    const handleRateLimitedUpdate = async (ctx) => {
        if (ctx.callbackQuery) {
            try {
                await ctx.answerCbQuery('Too many requests. Please wait a moment.', {
                    show_alert: false,
                });
            } catch (error) {
                console.error('Failed to answer rate-limited callback query:', error);
            }

            return;
        }

        const key = getRateLimitKey(ctx);
        if (!key) {
            return;
        }

        const entry = rateLimitState.get(key);
        const now = Date.now();

        if (!entry) {
            return;
        }

        if ((entry.lastWarnedAt || 0) + RATE_LIMIT_BLOCK_MESSAGE_MS > now) {
            return;
        }

        entry.lastWarnedAt = now;

        try {
            await ctx.reply('Too many requests. Please wait a few seconds and try again.');
        } catch (error) {
            console.error('Failed to send rate limit warning:', error);
        }
    };

    return async (ctx, next) => {
        const key = getRateLimitKey(ctx);

        if (!key) {
            return next();
        }

        const now = Date.now();
        cleanupRateLimitState(now);

        const entry = rateLimitState.get(key) || {
            events: [],
            blockUntil: 0,
            lastWarnedAt: 0,
        };

        entry.events = entry.events.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

        if (entry.blockUntil > now) {
            rateLimitState.set(key, entry);
            await handleRateLimitedUpdate(ctx);
            return;
        }

        entry.events.push(now);

        if (entry.events.length > RATE_LIMIT_MAX_EVENTS) {
            entry.blockUntil = now + RATE_LIMIT_WINDOW_MS;
            entry.events = [];
            rateLimitState.set(key, entry);
            await handleRateLimitedUpdate(ctx);
            return;
        }

        rateLimitState.set(key, entry);
        await next();
    };
};

module.exports = {
    createRateLimitMiddleware,
};
