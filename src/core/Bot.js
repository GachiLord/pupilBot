import chat from './Massager'


export default class Bot{
    constructor(config, chat){
        let conf = this.lastAnswer = JSON.parse(JSON.stringify(config.questions.type));

        this.lastAnswer = Object.assign( conf.class, conf.pupil );
        this.config = config;
        this.chat = chat;
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
                if ( this.isEqual(input, i, 60) ) return {questionType: questionType, item: item, i: i};
            }
        }

    }

    isEqual(str1, str2, percent){
        if ( str1.length === 0 ) return false;

        let question = str1.split(' ');
        let sample = str2;
        let count = 0;

        question.forEach(element => {
            let q = element.trim().replace(/[,.?]/, '');
            if ( sample.includes( q ) && q.length > 2 ) {count++; sample = sample.replace(q, ''); };
        });

        return ( count * 100 / sample.split(' ').length >= percent ) ? true: false;
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