const { exec } = require("child_process");
const fs = require("fs");
const codel = require('./codeL.json');
const codeE = require('./codeE.json');
const path = require('path');
const codePath = path.join(__dirname,"code_ex");
const run_code = (code,language,id)=>{
    return new Promise((resolve,rejects)=>{
            //fs.appendFile(`${codePath}\\${id}.${codeE[language]}`, `${code}`);
            fs.writeFile(`${codePath}\\${id}.${codeE[language]}`, `${code}`);
            exec(`${codel[language]} ${codePath}\\${id}.${codeE[language]}`,(err,std,_stde)=>{
                if(err){
                    rejects(err);
                }
                else{
                    resolve(std);
                }
            });
        }
    );
};

module.exports = {run_code};