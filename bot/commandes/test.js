require("ffmpeg-static");
const {SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder} = require("discord.js");
const voc = require("./voc");

module.exports = {
    data : command = new SlashCommandBuilder()
    .setName("test")
    .setDescription("creator bot exclu for test")
    .addUserOption(option=>
        option.setName("testus")
        .setDescription("test")),

    async excute(interaction){
            await interaction.reply("ebfzejk");
        }

};