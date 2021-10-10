const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const Discord = require('discord.js');
const { Player } = require('discord-player');
require('dotenv').config();

const client = new Client({
	intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ]
});
const player = new Player(client);

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

player.on('trackStart', (queue, track) => queue.metadata.channel.send(`Now playing the song**${track.title}**!`));

client.login(process.env.DISCORD_TOKEN);
