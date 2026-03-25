export interface AppConfig {
    botToken: string;
    miniAppLink: string;
    supportTeamEmail: string;
}

const requiredEnvVars = ['BOT_TOKEN', 'BOT_URL'] as const;

const getMissingEnvVars = (): string[] =>
    requiredEnvVars.filter((name) => !process.env[name]);

export const getConfig = (): AppConfig => {
    const missingEnvVars = getMissingEnvVars();

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    return {
        botToken: process.env.BOT_TOKEN as string,
        miniAppLink: process.env.BOT_URL as string,
        supportTeamEmail: process.env.SUPPORT_TEAM_EMAIL || 'support@esim70.com',
    };
};
