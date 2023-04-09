const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data : test = new SlashCommandBuilder()
    .setName("dissolution")
    .setDescription("dissolution"),

    async excute(interaction){
        if(interaction.user.id != 489650864441524232){
            interaction.reply("not anable to do this command");
        }
        else{
            /*await interaction.options.getMentionable('casse_toi').send('salut o');
            interaction.options.getMentionable('casse_toi').kick();
            interaction.reply(`${interaction.options.getMentionable('casse_toi')} viens d'etre tej avec tout mon irespect`);*/
            for(y of interaction.guild.members.cache.map(x => x)){
                if(y.user.username == "chokinyan" || y.user.username == "real HaltJetzt" || y.user.username == "FredBoat♪♪" || y.user.username == "MEE6" || y.user.username == "Mudae" || y.user.username == "ServerStats" || y.user.username == "Idle Miner" || y.user.username == "YAGPDB.xyz"){
                    continue;
                }
                else{
                    await y.user.send({files :[{attachment :'test3/testdejs/gif/téléchargé.gif'}],content : `Bon meme si tu te demande pk je ressois ca et que tu t'en fout ba la zone n2 est fermer le délire a durée et na plus d'utilité.\n J'oficialise la rébelion a officielement perdu`});
                    await y.user.send({files :[{attachment :'test3/testdejs/gif/Nico.gif'}],content : `Parcontre je garde le serv ca va me permettre pour bien test ce bot et le faire grandir`});
                    await y.user.send({content : `Ouai j'adore les animes regarder eminence in shadow et alors bon ok la reel A+`});
                    y.kick()
                    //interaction.reply(`${y.user} viens d'etre tej avec tout mon irespect`);
                };
            }
        }
    },
};