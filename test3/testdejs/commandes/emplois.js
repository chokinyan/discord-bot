const {SlashCommandBuilder} = require("discord.js");
const {empl} = require('../donné & autre/emplois')
const fs = require('fs');


module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("emplois")
        .setDescription("donne l'emplois du temps"),

    async excute(interaction){
        try{
            await interaction.reply("Veuillez patienter");
            await empl();
            await interaction.editReply({files : [{ attachment: "test3/testdejs/image/emplois.png" }],content:''});
        }
        catch (error){
            try{
                await interaction.reply(error);
            }
            catch(e){
                await interaction.channel.send(error);
            };
        };
        try{
            fs.unlinkSync("test3/testdejs/image/emplois.png");
        }
        catch(e){
            return;
        }
    },
};