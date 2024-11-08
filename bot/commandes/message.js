const {SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const puppeteer = require('puppeteer');
const {testz} = require('../fichier_utilitaire/objet_mess_return');

module.exports = {
    data : command = new SlashCommandBuilder()
        .setName("message")
        .setDescription("donne le message"),

    async excute(interaction){
        await interaction.reply({content : "Veuillez patienter le temps de la connexion",ephemeral : true});
        const choix = new ActionRowBuilder()
            .setComponents(
                new StringSelectMenuBuilder()
                .setCustomId('message')
                .setPlaceholder("Choisi l'objet du message a afficher")
                .setOptions((await testz()))
            );
        await interaction.editReply({content : "testetsest",components : [choix]});
    },

    async excomp(interaction){
        await interaction.update({content : "Le message vous serras envoyé en message privé"});
        await interaction.user.send({content : await testz(rec_mess = true,num = interaction.values)});
    },
};