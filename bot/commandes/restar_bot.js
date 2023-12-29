const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : command = new SlashCommandBuilder()
            .setName("restart")
            .setDescription("restart bot"),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            await interaction.reply({content : "can't use this command",ephemeral : true});
        }
        else{
            await interaction.client.destroy();
            
        }
    }
};