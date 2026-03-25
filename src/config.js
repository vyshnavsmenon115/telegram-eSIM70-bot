const requiredEnvVars = ['BOT_TOKEN', 'BOT_URL'];

const getMissingEnvVars = () => requiredEnvVars.filter((name) => !process.env[name]);

const getConfig = () => {
    const missingEnvVars = getMissingEnvVars();

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    return {
        botToken: process.env.BOT_TOKEN,
        miniAppLink: process.env.BOT_URL,
        supportTeamEmail: process.env.SUPPORT_TEAM_EMAIL || 'support@esim70.com',
    };
};

module.exports = {
    getConfig,
};
