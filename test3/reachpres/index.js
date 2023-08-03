const discordR = require('discord-rpc');
const fs = require('fs');
const client_id = '1130870011909656586';
const clientSecret = "uAw87DHzsnHXy7vq2bH8UIryVXpJU5EU";
const rich = new discordR.Client({transport : 'ipc'});
discordR.register(client_id);
const acti = async ()=>{
    const det = await JSON.parse(fs.readFileSync('./test3/reachpres/url.json','utf-8'));
    if(!rich){
        console.log("perso err");
        return;
    };
    rich.setActivity({
        details : `Ecoute de la musique de weeb sur ytb`,
        state : `ecoute ${det.detail}`,
        startTimestamp : Date.now(),
        largeImageKey : 'image_2023-07-18_163423094',
        largeImageText : 'test img.',
        instance : false,
        buttons : [
            {
                label : "lien de la musique",
                url : det.url
            }
        ]
    });
};

rich.on('ready',()=>{
    console.log("ready");
    acti();

    setInterval(()=>{
        acti();
    },30000);
});

rich.login({clientId : client_id,clientSecret : clientSecret}).catch(err => console.error(err));