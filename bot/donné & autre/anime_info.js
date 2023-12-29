const {anime_id} = require('./config.json');
const request = require('request');

const anime_info = (id)=>{
    return new Promise((resolve,reject)=>{
        const parametre = {
            url : `https://api.myanimelist.net/v2/anime/${id}?fields=title,synopsis,rank,nsfw,rating`,
            headers : {"X-MAL-CLIENT-ID" : anime_id},
            json : true
        }
        request.get(parametre,(err,_rep,body)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(body);
            };
        });
    })
}

module.exports = {anime_info};