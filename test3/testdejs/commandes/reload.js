const {SlashCommandBuilder} = require("discord.js");
const use_commands = require("../use_commands")

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("reload")
        .setDescription("reload command of the bot"),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            interaction.reply("not anable to do this command");
        }
        else{
            use_commands.reset(interaction.client.guilds.cache.map(guild => guild.id));
            interaction.reply("Reload")
        };
    },
};