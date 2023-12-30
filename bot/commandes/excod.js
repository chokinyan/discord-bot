const {SlashCommandBuilder,ActionRowBuilder,StringSelectMenuBuilder} = require("discord.js");

const language = new ActionRowBuilder().
    setComponents(
        new StringSelectMenuBuilder().setCustomId("language")
        .setPlaceholder("choisit le language de programation")
        .setOptions(
            {
                label : "python",
                value : "python"
            },
            {
                label : "javascript",
                value : "javascript"
            }
        )
    );

module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("excod")
        .setDescription("execute du code dans certain language"),

    async excute(interaction){
        await interaction.reply({content : "choose your langue",components : [language]});
    },

    async excomp(interaction){
        await interaction.update({content : `send your code ${interaction.values}`,components : []});
    }
};