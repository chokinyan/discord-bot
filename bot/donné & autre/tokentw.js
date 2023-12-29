const {twitch_id,twitch_sid} = require('./config.json');
const request = require('request');

const parametre = {
    url : "https://id.twitch.tv/oauth2/token",
    headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
    formData : {client_id : twitch_id,
            client_secret : twitch_sid,
            grant_type : 'client_credentials'
        },
    json : true
};

const gettoken = new Promise((resolve,reject)=>{
    request.post(parametre,(err,_rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            resolve(body.access_token);   
        }        
    })
})

module.exports = {gettoken};