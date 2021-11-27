import chat from './Massager'


export default class Bot{
    constructor(config, chat){
        this.config = config;
        this.chat = chat;
        this.lastAnswer = {};
    }

    launch(){
        const latency = 60; // >= 1 !!!
        return setInterval( () => {
            let msg = this.chat.get().toLowerCase();
            let answer = this.getAnswer(msg);

            //console.log(msg, answer, this.lastAnswer);
            if ( answer !== undefined && this.answerIsNotOld( answer , latency ) ) {chat.send(answer); this.lastAnswer[answer] = { time: Math.floor(Date.now() / 1000) }; }
        }, 1500 )
    }

    getAnswer(input){
        let questionType = 'class';

        this.config.name.forEach(element => {
            if ( input.includes(element) ) questionType = 'pupil';
        });

        for ( let item in this.config.questions.type[questionType] ) {
            if ( this.isEqual(input, item, 60) ) return this.config.questions.type[questionType][item];
        }

        
    }

    isEqual(str1, str2, percent){
        if ( str1.length === 0 ) return false;

        let question = str1.split(' ');
        let sample = str2;
        let count = 0;

        question.forEach(element => {
            let q = element.trim().replace(/[,.?]/, '');
            if ( sample.includes( q ) && q.length > 2 ) {count++; sample = sample.replace(q, ''); /*this.chat.set( q, '' );*/ };
        });

        //console.log(count * 100 / sample.split(' ').length, count, sample.split(' ').length, str1, sample);
        return ( count * 100 / sample.split(' ').length >= percent ) ? true: false;
    }

    answerIsNotOld(ans, r){
        if ( Object.keys(this.lastAnswer).includes(ans) ) {
            return ( Math.floor(Date.now() / 1000) - this.lastAnswer[ans].time >= r ) ? true : false;
        }
        else return true;
    }
}