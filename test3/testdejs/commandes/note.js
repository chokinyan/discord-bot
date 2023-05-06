const {SlashCommandBuilder,ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const fs = require('node:fs');
const {testz} = require('../donné & autre/note')
const path = require("node:path");

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("note")
        .setDescription("donner un screen de tes notes"),

    async excute(interaction){
        //await interaction.reply({content : "veuillez patienter",ephemeral : true});
        const choix = new ActionRowBuilder()
            .setComponents(
                new StringSelectMenuBuilder()
                .setCustomId('note')
                .setPlaceholder("Choisi le trimestre qui te conviens")
                .setOptions(
                    {
                        label : "premier trimestre",
                        setDescription : "note du premier trimestre",
                        value : "1"
                    },
                    {
                        label : "deuxieme trimestre",
                        setDescription : "note du deuxieme trimestre",
                        value : "2"
                    },
                    {
                        label : "troisieme trimestre",
                        setDescription : "note du troisieme trimestre",
                        value : '3'
                    }
                )
            );
        //await interaction.editReply({content : "",components : [choix],ephemeral : true});
        await interaction.reply({content : "",components : [choix],ephemeral : true});
    },
    
    async excomp(interaction){

        await interaction.update({content : "veuillez patienter",components : []});
        
        testz().then(async () =>{
            await interaction.editReply({files : [{attachment: `test3/testdejs/image/note${interaction.values}.png` }],content : "",ephemeral : true});
        });
        
        const imagePath = path.join(__dirname, 'image');
        const imageFiles = fs.readdirSync(imagePath).filter(file => file.startsWith("note"));

        for (const file of imageFiles) {
	    const filePath = path.join(imagePath, file);
        fs.unlinkSync(filePath);
        };
        
    }
};