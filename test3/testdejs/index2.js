const {sp_id,sp_sid} = require('./donné & autre/config.json');
const request = require('request');

const get_api_key = new Promise((resolve,reject)=>{
    const para = {
        url : 'https://accounts.spotify.com/api/token',
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded',
           'Authorization': 'Basic ' + btoa(sp_id + ':' + sp_sid).toString('base64')
        },
        body : 'grant_type=client_credentials',
        json : true
    };

    request.post(para,(err,_rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            resolve(body.access_token);
        };
    });
});
(async ()=>{
    const api_key = await get_api_key;
    const parametre = {
        url : `https://accounts.spotify.com/authorize?client_id=${sp_id}&redirect_uri=https://chokinyan.w3spaces.com/index.html&scope=user-read-playback-state%20&response_type=${api_key}&show_dialog=true` 
    };
    request.get(parametre,(err,_rep,body)=>{
        if(err){
            console.error(err);
        }
        else{
            console.log(body);
        };
    });
})();
//`https://accounts.spotify.com/authorize?client_id=${sp_id}&redirect_uri=https://chokinyan.w3spaces.com/index.html&scope=user-read-playback-state%20&response_type=${api_token}&show_dialog=true`