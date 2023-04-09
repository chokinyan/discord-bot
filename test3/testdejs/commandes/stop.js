require("ffmpeg-static");
const {SlashCommandBuilder} = require("discord.js");
const {AudioPlayer} = require("@discordjs/voice");
const voc = require("./voc");

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("s")
    .setDescription("ferme ta gueule le bot"),

    async excute(interaction){
        voc.excute(interaction = interaction,stop = true);
    },
};