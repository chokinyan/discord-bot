const {SlashCommandBuilder,ActionRowBuilder,ButtonBuilder, ButtonStyle} = require("discord.js");
const { REST, Routes } = require('discord.js');
const { clientId,token} = require('../donné & autre/config.json');
const {sleep} = require('../donné & autre/wait')

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

    async excomp(interaction,id){
        if (interaction?.component?.label == "yes") {
            const rest = new REST().setToken(token);
            rest.delete(Routes.applicationCommand(clientId, id))
                .then(() => interaction.update({ content: 'Successfully deleted application command', ephemeral: true }).then(async msg => {
                    await sleep(5);
                    msg.delete();
                }))
                .catch(x=>{interaction.update({ content: `${x}`, ephemeral: true })});
        }
        else{
            interaction.update("ok").then(msg => {
                msg.delete();
            })
        };
    },
};