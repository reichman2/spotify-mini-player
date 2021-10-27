// This is because I'm having issues using process.env with dotenv in electron.
import fs from 'fs';


interface EnvData {
    [key: string]: string;
}

export let envvars: EnvData = { };
const KEY_VAL_REGEX = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/; // Adapted from dotenv
const NEWLINE_REGEX = /\r\n|\n|\r/;

export const loadEnv = (path: string): EnvData => {
    let file = (fs.readFileSync(path, { encoding: "utf-8" })).split(NEWLINE_REGEX);

    file.forEach(elem => {
        const keyVal = elem.match(KEY_VAL_REGEX);

        let key = keyVal![1];
        let value = keyVal![2].trim() || "";

        envvars[key] = value;
    });
    
    return envvars;
}