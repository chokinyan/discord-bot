const {SlashCommandBuilder,InteractionCollector} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear message")
        .addIntegerOption(option =>
            option.setName("nombre")
            .setDescription("nombre de message a clear")
            .setRequired(true)
        ),

    async excute(interaction){
        await interaction.client.channels.cache.get(interaction.channelId).messages.fetch({ limit: interaction.options.getInteger('nombre') }).then(messages => {
            messages.map(message => message.delete());
        });
    },
};