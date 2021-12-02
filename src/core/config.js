import { trim } from "jquery"
import settings from "./settings";


const pupilInfo = new settings().settings;

export default {
    name: pupilInfo.userInfo.split(',').map( i => trim(i) ),
    latency: pupilInfo.latency,
    questionsType: pupilInfo.questionsType,
    autoJoin: pupilInfo.autoJoin,
    questions:{
            type:{
                class:{
                    "напишите плюсы": `+`,
                    "поставьте плюсы": `+`,
                    "кто здесь": `${pupilInfo.userInfo.split(',').map( i => trim(i) )[0]} здесь`,
                    "меня слышно":"да",
                    "свою оценку":"5",
                    "всё записали":"записали",
                    "успеваете":"успеваем",
                    "успевает":"успеваем",
                    "все поняли":"поняли",
                    "кто тут":"я",
                    "оценку":"5",
                    "настя спит":"прогульщица"
                    },
                pupil:{
                    "здесь":"я здесь",
                    "тут":"я тут",
                    "синус":"не помню",
                    "сколько будет":"не помню",
                    "как правильно":"не помню",
                    "какой ответ":"не помню",
                    "где":"я здесь",
                    "успеваешь":"дуспеваю",
                    "понятно":"да",
                    "какие будут":"не знаю",
                    "записал":"записал",
                    "списал":"записал",
                    "нету":"здесь я",
                    'нулевое':"я в тунель заезжаю",
                    "спит":"я не сплю"
                    }
            }
    }
}