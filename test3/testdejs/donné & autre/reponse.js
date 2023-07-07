let tg = 0
let mecrelouid = 0

module.exports = {
    reponse : function reponse(message,client){
        let croispas = Math.floor(Math.random()*101);
        if (message.content.includes(client.user)){
            message.reply("Ils se prend pour qui celui-la a tag la planete là")
        }
        else if(croispas == 100){
            message.reply("Je te crois pas, je suis le meilleur des philosophe");
        }
        else if(message.content.includes("noir")){
           message.reply(`beurk t'es sérieux la ? Hein ${message.author}`);
        }
        else if(message.author.id == mecrelouid && tg != 4){
            tg ++;
        }
        else if(message.author.id == mecrelouid && tg == 4){
            message.reply("Ollaaaa il va la fermer sa gueul celui la");
            tg = 0;
        }
        else if(message.author.id != mecrelouid){
            mecrelouid = message.author.id;
            tg = 0;
        }
    }
};