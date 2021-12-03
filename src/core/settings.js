import * as ChromeStorage from '../lib/store'


const storage = ChromeStorage.create(ChromeStorage.SYNC);
let data = await storage.get('settings');

if ( data === undefined ) { await storage.set('settings', {} ); data = {}; }

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