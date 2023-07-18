const discordR = require('discord-rpc');
const client_id = '1130870011909656586';
const clientSecret = "uAw87DHzsnHXy7vq2bH8UIryVXpJU5EU";
const rich = new discordR.Client({transport : 'ipc'});
discordR.register(client_id);
const acti = async ()=>{
    if(!rich){
        console.log("perso err");
        return;
    };
    rich.setActivity({
    details : 'test',
    state : 'test 2',
    startTimestamp : Date.now(),
    largeImageKey : 'image_2023-07-18_163423094',
    largeImageText : 'test img.',
    instance : false,
    buttons : [
        {
            label : 'test B',
            url : 'https://www.youtube.com/watch?v=DGmK_cN9370'
        }
    ]
})};

rich.on('ready',()=>{
    console.log("ready");
    acti();
});


rich.login({clientId : client_id,clientSecret : clientSecret}).catch(err => console.error(err));