require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const miniAppLink = process.env.BOT_URL;
const supportTeamEmail = 'vyshnav@lascade.com';
const sentMessagesByChat = new Map();

if (!miniAppLink) {
    throw new Error('BOT_URL is required in the environment.');
}

const faqs = [
    {
        id: 'buy_esim',
        question: 'When should I buy my eSIM, and does it activate right away?',
        answer:
            'You can buy as soon as your trip is confirmed. Your QR code is delivered immediately after payment, but most plans activate only when you install the eSIM and connect in the destination country.',
    },
    {
        id: 'install_esim',
        question: 'How do I install my Esim70 eSIM, and how long does setup take?',
        answer:
            'Installation usually takes two to three minutes. Open the QR code from your email on another screen, scan it from your phone settings, then choose the eSIM as your travel data line.',
    },
    {
        id: 'keep_regular_sim',
        question: 'Can I keep using my regular SIM card and phone number?',
        answer:
            'Yes. Most compatible devices let you keep your physical SIM active for calls and texts while your Esim70 plan handles mobile data during the trip.',
    },
    {
        id: 'run_out_of_data',
        question: 'What happens if I run out of data before my trip ends?',
        answer:
            'You can purchase another plan any time from the website. For many destinations, topping up is also available, so you can extend your connection without starting over.',
    },
    {
        id: 'device_compatibility',
        question: 'How do I know if my phone is compatible with an eSIM?',
        answer:
            'Check your cellular settings for options like "Add eSIM" or "Add Cellular Plan." Most recent iPhones, Google Pixel models, and Samsung Galaxy flagships support eSIM.',
    },
    {
        id: 'support_abroad',
        question: 'Do you offer support if my eSIM is not working abroad?',
        answer:
            'Yes. If activation or coverage feels off, contact support with your order details and device model. We can help verify installation, APN settings, and destination network guidance.',
    },
    {
        id: 'refund_policy',
        question: 'Is there a refund policy if I bought the wrong plan?',
        answer:
            'If the QR code has not been installed or the plan has not started, we can usually review refund eligibility. Once a plan is active or consumed, refunds depend on the issue and carrier conditions.',
    },
];

const helpIntro =
    'Choose a question below and I will send the answer.';

const supportMessage =
    `Contact our support team at ${supportTeamEmail} and include your order details and device model for faster help.`;

const buildFaqKeyboard = () =>
    Markup.inlineKeyboard([
        ...faqs.map((faq) => [Markup.button.callback(faq.question, `faq:${faq.id}`)]),
        [Markup.button.url('Buy eSIM', miniAppLink)],
        [Markup.button.callback('Contact Support Team', 'contact_support')],
    ]);

const rememberSentMessage = (chatId, messageId) => {
    if (!chatId || !messageId) {
        return;
    }

    const messageIds = sentMessagesByChat.get(chatId) || [];
    messageIds.push(messageId);
    sentMessagesByChat.set(chatId, messageIds);
};

const replyAndTrack = async (ctx, text, extra) => {
    const sentMessage = await ctx.reply(text, extra);
    rememberSentMessage(ctx.chat?.id, sentMessage.message_id);
    return sentMessage;
};

const sendHelpMenu = async (ctx, text = helpIntro) => replyAndTrack(ctx, text, buildFaqKeyboard());

const buildMainKeyboard = () =>
    Markup.inlineKeyboard([
        [Markup.button.url('Open App', miniAppLink)],
        [Markup.button.callback('Help', 'show_help')],
    ]);

bot.start(async (ctx) => {
    const firstName = ctx.from?.first_name || 'there';
    const message =
        `Welcome ${firstName}!\n\n` +
        'Use the button below to open the app and get started.';

    await replyAndTrack(ctx, message, buildMainKeyboard());
});

bot.command('menu', async (ctx) => {
    const message =
        'Choose an option below to continue.';

    await replyAndTrack(ctx, message, buildMainKeyboard());
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

async function bootstrap() {
    await bot.telegram.setMyCommands([
        { command: 'start', description: 'Start the bot' },
        { command: 'menu', description: 'Show the main menu' },
        { command: 'help', description: 'Get help' },
        { command: 'faq', description: 'Browse FAQs' },
    ]);

    await bot.launch();
    console.log('Bot running...');
}

bootstrap().catch((error) => {
    console.error('Failed to start bot:', error);
    process.exit(1);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
