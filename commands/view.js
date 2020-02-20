module.exports = {
	name: 'view',
	aliases: ['day'],
	description: `Checks a user's birthday`,
	args: false,
	usage: '[command name]',
	cooldown: 5,
	execute(message, args, Data) {
		Data.find((err, data) => {
			if(err) return message.channel.send('sorry couldnt find anty bdays');
			return message.channel.send(data[0].bday.toString())
			//console.log(data.bday)
		})
		// message.channel.send(bdays);
    }
}