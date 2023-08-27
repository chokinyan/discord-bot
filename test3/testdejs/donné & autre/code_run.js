const { exec } = require("child_process");
const fs = require("fs");
const codel = require('./codeL.json');
const codeE = require('./codeE.json');
const run_code = (code,language)=>{return new Promise((resolve,rejects)=>{
            fs.writeFileSync(`./test.${codeE[language]}`, `${code}`);
            exec(`${codel[language]} D:/github/test/test.py`,(err,std,stde)=>{
                if(err){
                    rejects(err);
                }
                else{
                    resolve(std);
                }
        });
})};

module.exports = {run_code};