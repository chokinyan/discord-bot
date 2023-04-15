const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear message")
        .addIntegerOption(option =>
            option.setName("nombre")
            .setDescription("nombre de message a clear")
            .setRequired(true)
        ),

    async excute(interaction){
        await interaction.showModal();

    },
};