module.exports = {
	name: 'new',
	aliases: ['create'],
	description: 'This is the first command',
	args: true,
	usage: '[command name]',
	cooldown: 5,
	execute(message, args, bdays) {
        bdays.push(args[0])
        message.channel.send(`Birthday (${args[0]}) added!`);
    }
}