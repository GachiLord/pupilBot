import { trim } from "jquery"
import * as ChromeStorage from "../lib/store"


let storage = ChromeStorage.create(ChromeStorage.SYNC);
let pupilInfo = await storage.get('pupilInfo');
let getInfo = () => { try {return prompt( 'Введите, как к вам обращаются через запятую(иван иванов, ваня, ванек)' ).split(',').map( i => trim(i) );} catch(e){ alert(`имя не было введено - ${e}`) } }

if ( pupilInfo == undefined ) pupilInfo = getInfo();
else if ( confirm(`к вам обращаются ${JSON.stringify(pupilInfo)}?` ) === false ) pupilInfo = getInfo();

storage.set('pupilInfo', pupilInfo);

export default {
    name: pupilInfo,
    questions:{
            type:{
                class:{
                    "напишите плюсы": `${pupilInfo[0]} здесь`,
                    "поставьте плюсы": `${pupilInfo[0]} здесь`,
                    "кто здесь": `${pupilInfo[0]} здесь`,
                    "меня слышно":"да",
                    "свою оценку":"5"
                    },
                pupil:{
                    "здесь":"я здесь",
                    "тут":"я тут",
                    "синус":"не помню",
                    "сколько будет":"вас плохо слышно",
                    "как правильно":"не знаю",
                    "какой ответ":"не знаю",
                    "где":"я здесь"
                    }
            }
    }
}