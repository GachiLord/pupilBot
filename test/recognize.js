import Bot from '../src/core/Bot.js'
import assert from 'assert'


describe('Bot', function(){
    describe('isEqual', function(){
        it('должен отвечать, если расстояние - 1', function(){
            let task = {
                str1:"игорь здесь? ли он илб - нет",
                str2:"игорь здесь",
                result:true
            }

            console.log('----' + task.str1)


            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    });
    describe('isEqual', function(){
        it('не должен отвечать, если расстояние больше 1', function(){
            let task = {
                str1:"игорь ли он илб - нетю Да ведь. как бы я простло пишу хахаа здесь",
                str2:"игорь здесь",
                result:false
            }

            console.log('----' + task.str1);


            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    });
    describe('isEqual', function(){
        it('не должен отвечать, если расстояние больше 1', function(){
            let task = {
                str1:"здесь ли он илб - нетю Да ведь. как бы я простло пишу хахаа игорь",
                str2:"игорь здесь",
                result:false
            }


            console.log('----' + task.str1);


            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    });
    describe('isEqual', ()=> {
        it('должен отвечать даже, если слова записаны заглавными или строчными буквами ', ()=> {
            let task = {
                str1: "игорь ЗдеСь ли он илб - нетю Да ведь. как бы я простло пишу хахаа",
                str2: "игорь здесь",
                result: true
            }

            console.log('----' + task.str1);



            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    })
    
    describe('isEqual', ()=> {
        it('не должен отвечать, если слова записаны заглавными или строчными буквами и если они отличаются', ()=> {
            let task = {
                str1: "игоР ЗдСь ли он илб - нетю Да ведь. как бы я простло пишу хахаа",
                str2: "игорь здесь",
                result: false
            }

            console.log('----' + task.str1);



            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    })

    describe('isEqual', ()=> {
        it('не должен отвечать, если слова отличаются', ()=> {
            let task = {
                str1: "игрь здеь? ли он илб - нет",
                str2: "игорь здесь",
                result: false
            }

            console.log('----' + task.str1);



            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    })

    describe('isEqual', ()=> {
        it('не должен отвечать на пустые сообщения', ()=> {
            let task = {
                str1: "",
                str2: "игорь здесь",
                result: false
            }

            console.log('----' + task.str1);



            assert.equal( Bot.isEqual( task.str1, task.str2, 60 ), task.result );
        });
    })
});