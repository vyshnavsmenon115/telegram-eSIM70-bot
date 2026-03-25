import { Markup } from 'telegraf';

import type { FaqItem } from '../data/faqs';

interface FaqKeyboardOptions {
    faqs: FaqItem[];
    miniAppLink: string;
}

interface MainKeyboardOptions {
    miniAppLink: string;
}

export const buildFaqKeyboard = ({ faqs, miniAppLink }: FaqKeyboardOptions) =>
    Markup.inlineKeyboard([
        ...faqs.map((faq) => [Markup.button.callback(faq.question, `faq:${faq.id}`)]),
        [Markup.button.url('Buy eSIM', miniAppLink)],
        [Markup.button.callback('Contact Support Team', 'contact_support')],
    ]);

export const buildMainKeyboard = ({ miniAppLink }: MainKeyboardOptions) =>
    Markup.inlineKeyboard([
        [Markup.button.url('Open App', miniAppLink)],
        [Markup.button.callback('Help', 'show_help')],
    ]);
