require("ffmpeg-static");
const {SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder} = require("discord.js");
const voc = require("./voc");

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("test")
    .setDescription("creator bot exclu for test"),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            interaction.reply("not anable to do this command");
        }
        else{
            await interaction.reply("test");
            await interaction.client.users.send("343684001355137025", `GG marsterclass`).then(x=>{
                x?.reply("tg");
            });

        }      
    },

};