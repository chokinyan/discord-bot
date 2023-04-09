require("ffmpeg-static");
const ytdl = require("ytdl-core")
const {SlashCommandBuilder} = require("discord.js");
const {joinVoiceChannel, createAudioPlayer,createAudioResource} = require("@discordjs/voice");
//--------------------------------------------------------------------------------------------------------------------------------
Player = createAudioPlayer()
//----------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    data : test = new SlashCommandBuilder()
        .setName("voc")
        .setDescription("sound play")
        .addStringOption(option =>
            option.setName("sound")
            .setDescription("youtube url")
            .setRequired(true)
        ),

    async excute(interaction,stop = false,pause = false){
        if(stop == true){
            interaction.reply("ok pas besoin d'etre aussi violent je ferme ma guelle");
            Player.stop();
        }
        else if(pause == true){
            interaction.reply("ok j'att ton truc");
            Player.pause();
        }
        else{
            interaction.reply("Je vais donc vous jouez une petite musique lez go !");

            //const ressource = createAudioResource(soundlist[interaction.options.getInteger("sound")].path);
            //soundqueu.push(ressource);
            const stream = ytdl(interaction.options.getString('sound'), {filter : 'audioonly'});
            const ressource = createAudioResource(stream);

            const voiceconn = joinVoiceChannel({
                channelId : interaction.member.voice.channelId,
                guildId :interaction.guildId,
                adapterCreator : interaction.guild.voiceAdapterCreator
            });
            

            
            const subcon = voiceconn.subscribe(Player);
            Player.play(ressource);
            //voiceconn.receiver.createStram
            //Player.on(AudioPlayerStatus.Playing, () =>{
            //    console.log(subcon)
            //});
        }
    }
};