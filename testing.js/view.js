module.exports = {
	name: 'view',
	// aliases: [],
	description: `Checks a user's birthday`,
	args: false,
	// usage: '',
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