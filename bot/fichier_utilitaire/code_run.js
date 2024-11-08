const { exec } = require("child_process");
const fs = require("fs");
const codel = require('./codeL.json');
const codeE = require('./codeE.json');
const path = require('path');

const codePath = path.join(__dirname,"..\\code_ex");

const run_code = (code,language,id)=>{
    return new Promise(async (resolve,rejects)=>{
            await write(code,language,id).catch((err)=>{if(err){console.error(err)}});
            exec(`${codel[language]} ${codePath}\\${id}.${codeE[language]}`,(err,std,_stde)=>{
                if(err){
                    rejects(err);
                }
                else{
                    resolve(std);
                    fs.rmSync(`${codePath}\\${id}.${codeE[language]}`);
                }
            });
        }
    );
};

const write = ((code,language,id)=>{
    return new Promise((resolve,rejects)=>{
        fs.appendFile(`${codePath}\\${id}.${codeE[language]}`, `${code}`,(err)=>{
            rejects(err);
        });
    });
});

module.exports = {run_code};