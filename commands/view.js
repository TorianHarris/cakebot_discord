module.exports = {
	name: 'view',
	aliases: ['day'],
	description: `Checks a user's birthday`,
	args: false,
	usage: '[command name]',
	cooldown: 5,
	execute(message, args, bdays) {
		message.channel.send(bdays);
    }
}