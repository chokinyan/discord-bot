const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("avenir")
        .setDescription("tu vas faire quoi"),

    async excute(interaction){
        interaction.reply({files : [{ attachment: "test3/testdejs/video/avenir.mp4" }] });
    },
};