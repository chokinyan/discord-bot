const {twitch_id,twitch_sid} = require('./config.json');
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

const gettoken = new Promise((resolve, reject) => {
    axios.post(parametre.url, parametre.data, { headers: parametre.headers })
        .then(response => {
            resolve(response.data.access_token);
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });
});

module.exports = { gettoken };