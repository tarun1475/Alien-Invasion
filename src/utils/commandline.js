'use strict'

const CommandlineUtils = {
    parse(cmdArgs){
        let mapPath;
        let alienCount;

        if (!cmdArgs || cmdArgs.length < 4){
            return null;
        }
        cmdArgs.forEach(item => {
            if (item.indexOf('--map=') > -1){
                mapPath = item.substring(6);
            } else if (item.indexOf('--aliens=') > -1) {
                alienCount = parseInt(item.substring(9), 10);
            }
        });
        if (!mapPath || !alienCount || alienCount < 1) {
            return null;
        }
        return { alienCount, mapPath };
    }
};

module.exports = CommandlineUtils;