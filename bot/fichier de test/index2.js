const {twitch_id,twitch_sid} = require('../donné & autre/config.json');
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

request.post(parametre,(err,_rep,body)=>{
    if(err){
        console.error(err);
    }
    else{
        const para = {
            url : 'https://api.twitch.tv/helix/users?login=',
            headers : {
                Authorization : `Bearer ${body.access_token}`,
                "Client-Id" : twitch_id
            },
            json : true
        };
        request.get(para,(errt,_repp,bodyt)=>{
            if(errt){
                console.error(err);
            }
            else{
                console.log(bodyt);
            }
        })
    }
})