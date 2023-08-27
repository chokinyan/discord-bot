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
    data : test = new SlashCommandBuilder()
        .setName("excod")
        .setDescription("execute du code dans certain language"),

    async excute(interaction){
        await interaction.reply({content : "test",components : [language]});
    },

    async excomp(interaction){
        await interaction.update({content : `envoyer votre code en ${interaction.values}`,components : []});
    }
};