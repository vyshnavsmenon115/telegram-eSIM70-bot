"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMainKeyboard = exports.buildFaqKeyboard = void 0;
const telegraf_1 = require("telegraf");
const buildFaqKeyboard = ({ faqs, miniAppLink }) => telegraf_1.Markup.inlineKeyboard([
    ...faqs.map((faq) => [telegraf_1.Markup.button.callback(faq.question, `faq:${faq.id}`)]),
    [telegraf_1.Markup.button.url('Buy eSIM', miniAppLink)],
    [telegraf_1.Markup.button.callback('Contact Support Team', 'contact_support')],
]);
exports.buildFaqKeyboard = buildFaqKeyboard;
const buildMainKeyboard = ({ miniAppLink }) => telegraf_1.Markup.inlineKeyboard([
    [telegraf_1.Markup.button.url('Open App', miniAppLink)],
    [telegraf_1.Markup.button.callback('Help', 'show_help')],
]);
exports.buildMainKeyboard = buildMainKeyboard;
