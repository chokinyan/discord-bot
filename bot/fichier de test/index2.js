const {twitch_id,twitch_sid} = require('../fichier_utilitaire/config.json');
const axios = require('axios');

const parametre = {
    url : "https://id.twitch.tv/oauth2/token",
    headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
    data : new URLSearchParams({
        client_id: twitch_id,
        client_secret: twitch_sid,
        grant_type: 'client_credentials'
    })
};

axios.post(parametre.url, parametre.data, { headers: parametre.headers })
    .then(response => {
        const body = response.data;
        const para = {
            url : 'https://api.twitch.tv/helix/users?login=',
            headers : {
                Authorization : `Bearer ${body.access_token}`,
                "Client-Id" : twitch_id
            }
        };
        return axios.get(para.url, { headers: para.headers });
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });