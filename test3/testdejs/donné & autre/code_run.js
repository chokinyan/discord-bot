const { exec } = require("child_process");
const fs = require("fs");
const path = require('path')
const codel = require('./codeL.json');
const codeE = require('./codeE.json');
const run_code = (code,language,id)=>{return new Promise((resolve,rejects)=>{
            fs.writeFileSync(`./${id}.${codeE[language]}`, `${code}`);
            exec(`${codel[language]} ${path.dirname(`${__dirname}/`)}`,(err,std,stde)=>{
                if(err){
                    rejects(err);
                }
                else{
                    resolve(std);
                }
        });
})};

module.exports = {run_code};