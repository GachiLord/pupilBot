import settings from '../core/settings'

let data = new settings();

export default class RunStaus{
    static async set(status){
        data.settings.runStatus = status;
        await data.save();
    }
    static async get(){
        return await data.settings.runStatus;
    }
}