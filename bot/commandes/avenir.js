const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("avenir")
        .setDescription("tu vas faire quoi"),

    async excute(interaction){
        interaction.reply({files : [{ attachment: "bot/video/avenir.mp4" }] });
    },
};