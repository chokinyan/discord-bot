const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("spam")
        .setDescription("coucou")
        .addMentionableOption(option =>
            option.setName("spammed")
            .setDescription("qui spam")
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('combien')
            .setDescription("on le spam cb de fois")
            .setRequired(true)
            .setMinValue(1)
            ),

    async excute(interaction){
        if(interaction.options.getMentionable('spammed').id  == 489650864441524232){
            interaction.reply('Je ne peux pas avec cette personne désoler');
        }
        else{
            interaction.reply("salut on va commencer un potentiel délir", ephemeral = true);
            for(let i = 0; i < interaction.options.getInteger('combien'); i++){
            interaction.channel.send(`salut ${interaction.options.getMentionable('spammed')}`);
            };
        };
    },
};