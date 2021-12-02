import * as ChromeStorage from '../lib/store'


const storage = ChromeStorage.create(ChromeStorage.SYNC);
const data = await storage.get('settings');



export default class settings{
    constructor(){
        this._storage = storage;
        this.settings = data;
    }
    async save(){
        await this._storage.set('settings', this.settings);
    }
    async getLatest(){
        return await storage.get('settings');
    }

}