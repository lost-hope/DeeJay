const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('play').setDescription('Replies with Pong!'),
	async execute(client, interaction) {
		if (!interaction.member.voice.channelID) {
			await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
			console.log(interaction.member.voice.channelID);
		} else {
			await interaction.reply({ content: 'You are in a voice channel!', ephemeral: true });
		}
	}
};
