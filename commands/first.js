module.exports = {
	name: 'first',
	aliases: ['commands'],
	description: 'This is the first command',
	args: false,
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        message.channel.send('First!');
    }
}