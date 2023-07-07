const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping of the bot"),

    async excute(interaction){
        interaction.reply({content : `${interaction.client.ws.ping}`});
    },
};