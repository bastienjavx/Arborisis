const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { api } = require('../services/api');
const { COLORS } = require('../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Affiche le titre en cours sur la radio Arborisis'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const { data } = await api.get('/internal/discord/radio/now-playing');

      const embed = new EmbedBuilder()
        .setTitle('📻 Radio Arborisis')
        .setDescription(`En cours : **${data.title || 'Inconnu'}**`)
        .setColor(COLORS.info)
        .addFields(
          { name: 'Créateur', value: data.creator || 'N/A', inline: true },
          { name: 'Durée', value: data.duration || 'N/A', inline: true },
        )
        .setURL('https://arborisis.com/radio')
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      if (error.response?.status === 404) {
        await interaction.editReply({ content: '📻 Aucune lecture en cours sur la radio.' });
      } else {
        console.error('[Command:radio]', error);
        await interaction.editReply({ content: '❌ Impossible de récupérer les infos radio.' });
      }
    }
  },
};
