const fs = require('node:fs');
const path = require('node:path')
const { REST, Routes, Client,GatewayIntentBits } = require('discord.js');
const { clientId, token } = require('./donné & autre/config.json');

module.exports = {
	reset : async function restart(guildIds){ 
		const commands = [];
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = path.join(__dirname, 'commandes');
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const command = require(`${commandsPath}\\${file}`);
			commands.push(command.data.toJSON());
		}

		// Construct and prepare an instance of the REST module
		const rest = new REST({ version: '10' }).setToken(token);

		// and deploy your commands!
		for (guildIdes of guildIds){
			(async () => {
				try {
					console.log(`Started refreshing ${commands.length} application (/) commands.`);

					// The put method is used to fully refresh all commands in the guild with the current set
					const data = await rest.put(
						Routes.applicationGuildCommands(clientId, guildIdes),
						{ body: commands },
					);

					console.log(`Successfully reloaded ${data.length} application (/) commands.`);
				} catch (error) {
					// And of course, make sure you catch and log any errors!
					console.error(error);
				}
			})()
	};
		console.log('commandes reload')
	},
}