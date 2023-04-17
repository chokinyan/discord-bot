const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder, ButtonStyle} = require("discord.js");
const { REST, Routes } = require('discord.js');
const { clientId,token} = require('../donné & autre/config.json');

//const rest = new REST().setToken(token);

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("delcom")
        .setDescription("remove a commande")
        .addStringOption(option =>
            option.setName("id")
            .setDescription("commande id")
            .setRequired(true)
        ),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            interaction.reply("not anable to do this command");
        }
        else{
            const validation = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                    .setCustomId("validation")
                    .setLabel("yes")
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId("nvalidation")
                    .setLabel("no")
                    .setStyle(ButtonStyle.Primary)
                );
            await interaction.reply({content : `supprimer la commande dont l'id est : ${interaction?.options?.getString('id')} ?`,components : [validation],ephemeral : true});
        };
        

    },

    async excomp(interaction){
        if (interaction?.component?.label == "yes"){
            /*REST.delete(Routes.applicationCommand(clientId, interaction?.options?.getString('id')))
	        .then(() => interaction.update({content : 'Successfully deleted application command', ephemeral : true}))
	        .catch(interaction.update({content : `${error}`, ephemeral : true}));*/
            await interaction.update({content : 'Successfully deleted application command', ephemeral : true})
        }
        else{
            //console.log(await interaction?.message?.delete(interaction?.message)); 
            interaction
        };
    },
};