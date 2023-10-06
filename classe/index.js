//documentation : https://discord.js.org/#/
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');
const use_commands = require('./use_commands');
const compcom = [];
/* name : compent name, comm : file name \\ alwais edit after add an file with compent*/

//------------------------------------------------------------------------------------------
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.AutoModerationConfiguration,
	GatewayIntentBits.AutoModerationExecution,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.GuildEmojisAndStickers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildScheduledEvents,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildWebhooks,
	]});
//------------------------------------------------------------------------------------------

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commandes');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
};
//------------------------------------------------------------------------------------------
client.once(Events.ClientReady, () => {
	use_commands.reset(client.guilds.cache.map(guild => guild.id));
	console.log("bot is ready");
});
//------------------------------------------------------------------------------------------
client.on(Events.InteractionCreate, async interaction  => {
	
	if(interaction.component !== undefined){
		//const compot = compcom[compcom?.map(x => (interaction?.customId in x?.name))?.indexOf(true)]?.comm;
		/*if error TypeError: Cannot read properties of undefined (reading 'compot')
			go line 10
		*/
		for (const i of compcom){if (i.name.includes(interaction?.customId)){compot = i.comm}};
		try{
			/* file need same name as her commande name*/
			const command = client?.commands?.get(compot);
			for(const i of compcom){
				if(i.comm == compot){return await command["excomp"](interaction,i.id_val)};
			};
			await command["excomp"](interaction);
		}
		catch(e){
			interaction.update({content : `compent error => \n${e}`});
		};
	};
	
	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	try {
		compcom.map(x=>{
			if(interaction.commandName == "delcom"){x.id_val = (x.comm == 'delcom') ? interaction?.options?.getString('id') : x.id_val};
		});
		await command["excute"](interaction);
		return interaction;
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!',ephemeral : true});
	}
});

//------------------------------------------------------------------------------------------
client.login(token).then((token) => {
	client.user.setActivity({ activities: [{ name: 'A BAS tbate ' }], status: 'dnd' });
});

//---------------------------------------------------------------------------------------------