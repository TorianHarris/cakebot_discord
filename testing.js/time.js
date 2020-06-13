module.exports = {
	name: 'time',
	aliases: ['alert', 'timer'],
	description: `Change the time Cakebot does it's daily alerts`,
	args: true,
	usage: '',
	cooldown: 5,
	execute(message, args, Data) {
		Data.find((err, data) => {
			if(err) return message.channel.send('sorry couldnt find any bdays');
			data.forEach(d => {
				message.channel.send(d.bday.toString())
			});
			// return message.channel.send(data[0].bday.toString())
			//console.log(data.bday)
		})
		// message.channel.send(bdays);
    }
}