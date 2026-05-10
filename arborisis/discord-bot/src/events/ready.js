const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[Discord] Connecté en tant que ${client.user.tag}`);
    client.user.setActivity('les sons de la nature', { type: ActivityType.Listening });
  },
};
