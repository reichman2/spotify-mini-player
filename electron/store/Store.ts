import electron from 'electron';
import path from 'path';
import fs from 'fs';


type StoreData = {
    [key: string]: any;
}

class Store {
    private data: StoreData;
    private path: string;

    constructor(fileName: string) {
        this.data = { };

        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, fileName + '.json');
        
        this.data = parseJSONFile(this.path);
    }

    get(key: string): any {
        return this.data[key];
    }

    set(key: string, value: any) {
        this.data[key] = value;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

const parseJSONFile = (filePath: string, encoding?: string, defaults?: object): object => {
    try {
        return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
    } catch (err) {
        return { error: err, ...defaults };
    }
}

export default Store;