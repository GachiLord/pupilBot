import chat from './Massager.js'


export default class Bot{
    constructor(config, chat){
        let conf = this.lastAnswer = JSON.parse(JSON.stringify(config.questions.type));

        this.lastAnswer = Object.assign( conf.class, conf.pupil );
        this.config = config;
        this.chat = chat;
        this.percent = 60;
    }

    launch(){
        console.log(this.lastAnswer);
        const latency = this.config.latency;
        return setInterval( () => {
            let msg = this.chat.get().toLowerCase().trim();
            let answer = ( this.config.questionsType !== 'none' ) ? this.getQuestion(msg) : undefined;

            if ( answer !== undefined && this.answerIsNotOld( answer , latency ) ) {
                switch(this.config.questionsType){
                    case 'all-types':
                        this.sendAnswer(answer);
                        break;
                    case 'class':
                        if ( answer.questionType === 'class' ) this.sendAnswer(answer);
                        break;
                    case 'personal':
                        if ( answer.questionType === 'pupil' ) this.sendAnswer(answer);
                        break;
                }
                
            }
        }, 1500 )
    }

    getQuestion(input){
        let questionType = 'class';
        let conf = this.config.questions.type;
        this.config.name.forEach(element => {
            if ( input.includes(element) ) questionType = 'pupil';
        });

        for ( let item in conf[questionType] ) {
            for (let i in conf[questionType][item]){
                if ( Bot.isEqual(input, i, this.percent) ) return {questionType: questionType, item: item, i: i};
            }
        }

    }

    static isEqual(str1, str2, percent){
        if ( str1.length === 0 ) return false;

        let question = str1.toLowerCase().split(' ');
        let sample = str2.toLowerCase().split(' ');
        let count = 0;
        let positions = [];
        let areElsClose = (arr) => { 
            if ( arr.length === 0 ) return false;
            if ( ( arr.reduce( (prev, cur) => { if ( Math.abs(cur - prev) > 1 ) return false; } ) ) !== false ) return true;
            else return false;
        }


        question.forEach(element => {
            let q = element.trim().replace(/[,.?]/, '');
            if ( sample.includes( q ) && q.length > 2 ) { count++; positions.push( question.indexOf(element) ); };
        });
        console.log(count * 100 / sample.length, areElsClose(positions))
        if ( positions.length > 0 ) {
            if ( areElsClose(positions) && count * 100 / sample.length >= percent ) return true;
            else return false;
        }
        else return false;
    }

    answerIsNotOld(ans, r){
        let qs = this.lastAnswer;
        console.log(qs , ans);
        if ( ans.item in qs && isNaN(qs[ans.item]) !== true ) {
            return ( Math.floor(Date.now() / 1000) - qs[ans.item] >= r ) ? true : false;
        }
        else return true;
    }

    sendAnswer(answer){
        chat.send(this.config.questions.type[answer.questionType][answer.item][answer.i]);
        this.lastAnswer[answer.item] = Math.floor(Date.now() / 1000);
    }
}