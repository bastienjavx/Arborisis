require('dotenv').config();

module.exports = {
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    guildId: process.env.DISCORD_GUILD_ID,
  },
  api: {
    port: parseInt(process.env.BOT_PORT || '3001', 10),
    host: process.env.BOT_HOST || '127.0.0.1',
    laravelUrl: process.env.LARAVEL_API_URL || 'http://localhost/api',
    laravelToken: process.env.LARAVEL_INTERNAL_TOKEN,
  },
};
