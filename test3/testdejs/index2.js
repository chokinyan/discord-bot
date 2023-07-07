const {sp_id,sp_sid} = require('./donné & autre/config.json');
const request = require('request');

//(async ()=>{
//    const parametre = {
//        url : "https://accounts.spotify.com/api/token",
//        headers : {
//            'Content-type' : 'application/x-www-form-urlencoded',
//            'Authorization': 'Basic ' + btoa(sp_id + ':' + sp_sid).toString('base64')
//        },
//        json : true,
//        body : 'grant_type=client_credentials',
//    };
//    const token = new Promise((resolve,reject)=>{
//        request.post(parametre,async (err,_rep,body)=>{
//            if(err){
//                console.error(err);
//            }
//            else{
//                resolve(body?.access_token);
//            }
//    })});
//    const parametreD = {
//        url : "https://api.spotify.com/v1/me/player/currently-playing",
//        headers : {Authorization : `Bearer ${await token}`}
//    }
//    request.get(parametreD,(err,_rep,body)=>{
//        if(err){
//            console.error(err);
//        }
//        else{
//            console.log(body);
//        }
//    })
//
//})();

request.get({url:"https://accounts.spotify.com/authorize?client_id=a2f7edb5164d44ce934ae6bc8912a8f8&redirect_uri=http://localhost:5500/html/cur_play.html&scope=user-read-playback-state%20&response_type=token&show_dialog=true"},(err,rep,body)=>{
    if(err){
        console.error(err);
    }
    else{
        //console.log(body);
        console.log(rep);
    };
});


//fetch("https://accounts.spotify.com/login/password", {
//  "headers": {
//    "accept": "application/json",
//    "accept-language": "fr-FR,fr;q=0.9",
//    "content-type": "application/x-www-form-urlencoded",
//    "sec-fetch-dest": "empty",
//    "sec-fetch-mode": "cors",
//    "sec-fetch-site": "same-origin",
//    "x-csrf-token": "013acda719b265bd064abf7331d76cea34bd4a240c31363838363433313830383139",
//    "cookie": "__Host-device_id=AQC1NhvONpc_no7qxuuaGSqOf3zv8fnuWFGyUlY-xWbILRDGxT4g5L2c0g3XeQBLGsMPpMurwRY84Nab0irWaKEFYTAivPlzxk4; inapptestgroup=; sp_tr=false; __Secure-TPASESSION=AQCQl134LvCq75TjCqUorAUiIvsUfamVL/fM639RjajQ8yKZxKfQiQ1esWRdbfRZSFBP4D1DdSzhsebl6U+VihbEi46C3y0d4jE=; sp_sso_csrf_token=013acda719b265bd064abf7331d76cea34bd4a240c31363838363433313830383139; __Host-sp_csrf_sid=6e7e457e011d13bc15b4f8249b0a1fd6acda5f185d9dca4514c25a9ac0e81783; remember=dddd",
//    "Referer": "https://accounts.spotify.com/fr/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-playback-state%2B%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5500%252Fhtml%252Fcur_play.html%26client_id%3Da2f7edb5164d44ce934ae6bc8912a8f8%26show_dialog%3Dtrue",
//    "Referrer-Policy": "strict-origin-when-cross-origin"
//  },
//  "body": "username=dddd&password=dddddd&remember=true&recaptchaToken=03AAYGu2T0X9zCBL6qZVz1o3cySeKJNNjL_PMZ18XnZ2gzleuGwzPSvumfgZxhwToTn8LogEubfzzYLq7uyMs0-ByTJQs-ncrOwSPzG6toWC0MD5_WvSz7R4NGyh8CWzMYf69ARi8B7SuPbn9D3UUOBRZWbrZX0lEpv39dAVQguMd5awoTvKrPY7FmDTSpBd2Q9ZuphHtwhe2gTBz-oWu58gk-n3lwNH82KUq-K0jh-xhVjy0kEnQN4E5LCwgMAZA9nC6W-AUyzDMLuR1g-fBvq-IC8Fs69r6iwqx-K8mOrQq2OhxSnGvOuIJN49wh6AfVgS7Ixc_qgT1-i7Wez8gQt1jyh02v_jXBVqq2UxRcYF_ZZjmJatbb8Uw9WqYJXpT098uHLZpZXUGCNFevGyn_hFcWq6o3hMJR1-n1jGvO14OEdy7D8c0Si4RF__LNQ69boB4ij5mPykgFwqmNQkc4WIlGYromkbtPXg6t4KU2H7wjXGtHoF2ncgKIOtsLPsqR5F5gifKJtQT6WnMAE19QBtLmRb-R-TMhDE7Q1GmODDzuVv4D51dMu_zLX7qh-5hg4O6IAoF8bucgSi0PbvqaWOgCH4luR-loQJpbgEhmBM1nBdywSYCnleCqIKNgXliu9DnqQdOREx79gq_1iXxcb9bnlN-k8i098pLpdc2UVkylij4EM3T20md5B08nBiw7M1muL-EZygXWF73rrgr6Y_zFKRx1l41Qn30mv7kTRCZLM_c8pb7D8_1hmDK0-nKXnpqo5HhJ2WS9olJMm1GcaF2Mqg-0Me0vNjIAE1aGgFqbGGUvxoelrBLDocKuUDRDpPxOGb6ZzjYWwAtWB8Ye5nHxwLF_E8GnV268rOeDbmHMZQewntgJWeOwNf8bSXAWvhvge-hYUGTtOW3qgU2f28Avzsuy3N9W2hsl_bpVGkZTNpZQ_glYH-QSowj8wbls3AvmVdG6kVL4TNFoldH1MoKIsyaztN_ELDE0xz73bsNsl96tbRw0sDKjqXDwPLQuXBDyryqQTca-8K7grj4GH_8TV7qTUv8_yRdJDYMYmzOsCwlhQrsvZyYz-Rl3na-h-q3RhoZJp2WebduUhpYq9_6JhuyQb7Tdz0QUMDT9Xo9D5Jsi3qfMhdfbjk9cMSvASpVjklnDrhcZ6CXvY0SbPGS9q0jJN9Yy5ANHEcI4aCaacPb_x7WlPbeExJd-u8in7rhyUoI7aAogXydx8sZVu-8nCOYno92D74mfbLUOKl7y_2BlWJ6aNEbdLuU_Bx8tlnt1A3Uozs-4uE2flJ9dsMzb8yYlUN8vmDsxygOdCrOZDQD3swPAq_KPZc8Qm0o3gxP_g5k7OhKxciIJEe-dC7NH4xAZwM78fD5KXbkhvpxebV63d1-78-Ht5-IdvdWkNORzwQhyx5JvUbvNCaDUIcmW3h0vaQGj7dy_YbQf5NG67JF1YDDd5yDioeqxjQkG2bjc8aiviIgNKSdeznvOWFp47S4TMBqFKw&continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-playback-state%2B%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5500%252Fhtml%252Fcur_play.html%26client_id%3Da2f7edb5164d44ce934ae6bc8912a8f8%26show_dialog%3Dtrue%26flow_ctx%3D18fdc5ff-d267-462f-987e-6c1a26a1fc46%253A1688664780&flowCtx=18fdc5ff-d267-462f-987e-6c1a26a1fc46%3A1688664780",
//  "method": "POST"
//});