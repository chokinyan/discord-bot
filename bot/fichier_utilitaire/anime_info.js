const {anime_id} = require('./config.json');
const axios = require('axios');

const anime_info = (id) => {
    return new Promise((resolve, reject) => {
        const parametre = {
            url: `https://api.myanimelist.net/v2/anime/${id}?fields=title,synopsis,rank,nsfw,rating`,
            headers: { "X-MAL-CLIENT-ID": anime_id }
        };
        axios.get(parametre.url, { headers: parametre.headers })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = { anime_info };