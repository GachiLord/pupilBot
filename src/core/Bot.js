import chat from './Massager'


export default class Bot{
    constructor(config, chat){
        this.config = config;
        this.chat = chat;
        this.lastAnswer = JSON.parse(JSON.stringify(config.questions.type));
    }

    launch(){
        const latency = this.config.latency;
        return setInterval( () => {
            console.log('works');
            let msg = this.chat.get().toLowerCase().trim();
            let answer = ( this.config.questionsType !== 'none' ) ? this.getQuestion(msg) : undefined;

            if ( answer !== undefined && this.answerIsNotOld( answer , latency ) ) {
                answer.item.split(' ').forEach( i => { this.chat.set( new RegExp(i, 'i'), '' ); } );
                if ( answer.questionType === 'pupil' ) this.config.name.forEach( i => { this.chat.set( new RegExp(i, 'i'), '' ); } );

                chat.send(this.config.questions.type[answer.questionType][answer.item]);
                this.lastAnswer[answer.questionType][answer.item] = Math.floor(Date.now() / 1000);
                }
        }, 1500 )
    }

    getQuestion(input){
        let questionType = 'class';

        this.config.name.forEach(element => {
            if ( input.includes(element) ) questionType = 'pupil';
        });
        if ( this.config.questionsType === 'personal' ) questionType = 'pupil';
        else if ( this.config.questionsType === 'class' ) questionType = 'class';

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
}