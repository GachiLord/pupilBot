import { trim } from "jquery"
import settings from "./settings";


const pupilInfo = new settings().settings;

export default {
    name: pupilInfo.userInfo.split(',').map( i => trim(i) ),
    latency: pupilInfo.latency,
    questionsType: pupilInfo.questionsType,
    autoJoin: pupilInfo.autoJoin,
    reason: pupilInfo.reason,
    questions:{
            type:{
                class:{
                    "здесь ли":{
                        "напишите плюсы": `+`,
                        "поставьте плюсы": `+`,
                        "кто здесь": `${pupilInfo.userInfo.split(',').map( i => trim(i) )[0]} здесь`,
                        "кто тут":`${pupilInfo.userInfo.split(',').map( i => trim(i) )[0]} тут`,
                    },
                    "записал ли":{
                        "всё записали":"записали",
                        "все записали": "записали"
                    },
                    "слышно ли":{
                        "меня слышно":"слышно",
                    },
                    "написать оценку":{
                        "напишите свою оценку":"5",
                    },
                    "успевает ли":{
                        "успеваете":"успеваем",
                    },

                },
                pupil:{
                    "здесь ли":{
                        "здесь":"я здесь",
                        "тут":"я тут",
                        "где":"я здесь",
                    },
                    "записал ли":{
                        "записал":"записал",
                        "списал":"записал",
                    },
                    "успевает ли":{
                        "успеваешь":"успеваю",
                    },
                    "спит ли":{
                        "спит":"я не сплю"
                    },
                    "не могу ответить":{
                        "сколько будет":pupilInfo.reason,
                        "какой ответ":pupilInfo.reason,
                        "синус": pupilInfo.reason,
                        "какие будут": pupilInfo.reason,
                        "прочитай задание": "у меня микрофон не работает",
                        "прочти задание": "у меня микрофон не работает",
                        "почему не отвечаешь": pupilInfo.reason
                    }
                }
            }
    }
}
