export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export const faqs: FaqItem[] = [
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
