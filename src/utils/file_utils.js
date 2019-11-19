'use strict'
const fs = require('fs');

/*
* readFile: takes a file path and returns array of lines in the file
*
*/

const FileUtils = {
    readFile(filePath){
        let data;

        try{
            data = fs.readFileSync(filePath, { encoding: 'UTF-8' });
        } catch(e){
            return undefined;
        }
        if (data === 'undefined' || !data){
            return null;
        }
        return data.split('\n');
    }
};

module.exports = FileUtils;
