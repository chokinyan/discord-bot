require("ffmpeg-static");
const {SlashCommandBuilder} = require("discord.js");
const voc = require("./voc");

module.exports = {
    data : command = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("attend stp"),

    async excute(interaction){
        voc.excute(interaction = interaction,stop = false,pause = true);
    },
};