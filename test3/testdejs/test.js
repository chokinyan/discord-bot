const request = require('request');
const {id,s_id} = require('./config.json');



const config = {
    url : "https://myanimelist.net/v1/oauth2/token",
    headers : {"grant_type" : "authorization_code"}
};

const rep = request.get(config,(err,repp,body) =>{
    if (err){
        console.log(err);
    }
    else{
        console.log(repp);     
    }
});