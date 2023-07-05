const request = require('request');
const {anime_id} = require('./donné & autre/config.json');

(()=>{
    const parametre = {
        url : "https://api.myanimelist.net/v2/anime?q='one piece'&offset=0&nsfw=true",
        headers : {
            "X-MAL-CLIENT-ID" : anime_id
        },
    };
    request.get(parametre,(err,_rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            console.log(body);
        }
    })
})();