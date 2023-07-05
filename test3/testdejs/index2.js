const {sp_id,sp_sid} = require('./donné & autre/config.json');
const request = require('request');

(async ()=>{
    const parametre = {
        url : "https://accounts.spotify.com/api/token",
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(sp_id + ':' + sp_sid).toString('base64')
        },
        json : true,
        body : 'grant_type=client_credentials',
    };
    const token = new Promise((resolve,reject)=>{
        request.post(parametre,async (err,rep,body)=>{
            if(err){
                console.error(err);
            }
            else{
                resolve(body?.access_token);
            }
    })});
    const parametreD = {
        url : "https://api.spotify.com/v1/me/player/currently-playing",
        headers : {Authorization : `Bearer ${await token}`}
    }
    request.get(parametreD,(err,rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            console.log(body);
            console.log("fini");
        }
    })

})();