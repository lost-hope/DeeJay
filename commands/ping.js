module.exports = {
	name: 'ping',
	aliases: [],
	description: 'this is a ping command!',
	execute(message, args, cmd, client, Discord) {
		message.channel.send('pong!');
	}
};
