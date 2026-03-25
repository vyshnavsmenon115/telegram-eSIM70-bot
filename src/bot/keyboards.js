const { Markup } = require('telegraf');

const buildFaqKeyboard = ({ faqs, miniAppLink }) =>
    Markup.inlineKeyboard([
        ...faqs.map((faq) => [Markup.button.callback(faq.question, `faq:${faq.id}`)]),
        [Markup.button.url('Buy eSIM', miniAppLink)],
        [Markup.button.callback('Contact Support Team', 'contact_support')],
    ]);

const buildMainKeyboard = ({ miniAppLink }) =>
    Markup.inlineKeyboard([
        [Markup.button.url('Open App', miniAppLink)],
        [Markup.button.callback('Help', 'show_help')],
    ]);

module.exports = {
    buildFaqKeyboard,
    buildMainKeyboard,
};
