require("ffmpeg-static");
const {SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuInteraction} = require("discord.js");
const voc = require("./voc");

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("test")
    .setDescription("creator bod exclu for test"),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            interaction.reply("not anable to do this command");
        }
        else{
            const waw = new ActionRowBuilder()
                .setComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder("Rien n'a été selectionné")
                    .setOptions(
                        {
                            label : 'test',
                            description : 'test1',
                            value : 'test1'
                        },
                        {
                            label : 'test2',
                            description : 'test2',
                            value : 'test2'
                        }
                    ),
                );
            
            await interaction.reply({content :'test',components : [waw], ephemeral: true});
        };
    },

    async excomp(interaction){
        //console.log(interaction);
        await interaction.update({content : `${interaction.values}`});
    },

};