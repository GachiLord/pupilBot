import chat from './Massager'


export default class Bot{
    constructor(config, chat){
        this.config = config;
        this.chat = chat;
        this.lastAnswer = JSON.parse(JSON.stringify(config.questions.type));
    }

    launch(){
        console.log('working');
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
        this.config.name.forEach(element => {
            if ( input.includes(element) ) questionType = 'pupil';
        });

        for ( let item in this.config.questions.type[questionType] ) {
            if ( this.isEqual(input, item, 60) ) return {questionType:questionType, item: item};
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

        return ( count * 100 / sample.split(' ').length >= percent ) ? true: false;
    }

    answerIsNotOld(ans, r){
        let qs = this.lastAnswer[ans.questionType];
        if ( ans.item in qs && isNaN(qs[ans.item]) !== true) {
            return ( Math.floor(Date.now() / 1000) - qs[ans.item] >= r ) ? true : false;
        }
        else return true;
    }

    sendAnswer(answer){
        chat.send(this.config.questions.type[answer.questionType][answer.item]);
        this.lastAnswer[answer.questionType][answer.item] = Math.floor(Date.now() / 1000);
    }
}