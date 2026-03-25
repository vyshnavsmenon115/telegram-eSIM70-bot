const { faqs } = require('../data/faqs');
const { buildFaqKeyboard, buildMainKeyboard } = require('./keyboards');

const helpIntro = 'Choose a question below and I will send the answer.';

const registerHandlers = (bot, config) => {
    const supportMessage =
        `Contact our support team at ${config.supportTeamEmail} and include your order details and device model for faster help.`;

    const reply = (ctx, text, extra) => ctx.reply(text, extra);

    const sendHelpMenu = (ctx, text = helpIntro) =>
        reply(
            ctx,
            text,
            buildFaqKeyboard({
                faqs,
                miniAppLink: config.miniAppLink,
            }),
        );

    const mainKeyboard = buildMainKeyboard({
        miniAppLink: config.miniAppLink,
    });

    bot.start(async (ctx) => {
        const firstName = ctx.from?.first_name || 'there';
        const message =
            `Welcome ${firstName}!\n\n` +
            'Use the button below to open the app and get started.';

        await reply(ctx, message, mainKeyboard);
    });

    bot.command('menu', async (ctx) => {
        await reply(ctx, 'Choose an option below to continue.', mainKeyboard);
    });

    bot.command('help', async (ctx) => {
        await sendHelpMenu(ctx);
    });

    bot.command('faq', async (ctx) => {
        await sendHelpMenu(ctx);
    });

    bot.action('show_help', async (ctx) => {
        await ctx.answerCbQuery();
        await sendHelpMenu(ctx);
    });

    bot.action('contact_support', async (ctx) => {
        await ctx.answerCbQuery();
        await sendHelpMenu(ctx, `${supportMessage}\n\nChoose another question below:`);
    });

    bot.action(/^faq:(.+)$/, async (ctx) => {
        const faqId = ctx.match[1];
        const faq = faqs.find((item) => item.id === faqId);

        await ctx.answerCbQuery();

        if (!faq) {
            await sendHelpMenu(ctx, 'I could not find that FAQ. Please choose one from the list below.');
            return;
        }

        await sendHelpMenu(ctx, `${faq.question}\n\n${faq.answer}\n\nChoose another question below:`);
    });
};

module.exports = {
    registerHandlers,
};
