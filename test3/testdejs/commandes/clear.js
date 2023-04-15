const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear message")
        .addIntegerOption(option => {
            option.setName("nb_clear")
            .required("true")
        }),

    async excute(interaction){
        return 0;
    },
};