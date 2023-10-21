const {SlashCommandBuilder} = require("discord.js");
const {empl} = require('../donné & autre/emplois')
const fs = require('fs');


module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("emplois")
        .setDescription("donne l'emplois du temps")
        .addStringOption(option=>
            option.setName("identifiant")
            .setDescription("ton id mbn")
            .setRequired(true)
        )
        .addStringOption(option=>
            option.setName("mdp")
            .setDescription("ton mdp mbn")
            .setRequired(true)
        ),
        

    async excute(interaction){
        const id = interaction.options.getString('identifiant');
        const mdp = interaction.options.getString('mdp');
        try{
            await interaction.reply({content : "Veuillez patienter ce sera envoyer en mp",ephemeral : true});
            await empl(id,mdp);
            await interaction.user.send({files : [{ attachment: "test3/testdejs/image/emplois.png" }],content:''});
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