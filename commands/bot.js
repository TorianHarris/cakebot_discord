module.exports = {
	name: 'bot',
	aliases: [],
	description: 'Hello',
	args: false,
	// usage: '[command name]',
	cooldown: 5,
	execute(message) {
        message.channel.send('Hi I’m a bot! Beep boop 🤖');
    }
}