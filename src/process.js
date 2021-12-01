import Bot from './core/Bot.js'
import config from './core/config.js'
import Massager from './core/Massager.js'
import $ from 'jquery'



const process = new Bot(config, new Massager);
let processId;
let openCount = 0;
let openCall = () => {
    
    if ( $('[data-text-as-pseudo-element="Присоединиться к звонку"]').length > 0 && openCount === 0 ){
        openCount++;
        setTimeout(() => { 
            $('[data-text-as-pseudo-element="Присоединиться к звонку"]').trigger('click');
            setTimeout(() => { $('[title="Присоединиться"]').trigger('click');
                setTimeout(() => {
                    setTimeout(() => { $('[data-text-as-pseudo-element="Чат"]').trigger('click'); }, 2000);
                    processId = process.launch();
                }, 2000);
            }, 2000);
        }, 2000);

    }

}

setInterval(() => { openCall(); if ( $('[data-text-as-pseudo-element="Позвонить"]').length > 0 ) { clearInterval(processId); $('[title="Отмена"]').trigger('click'); openCount = 0;} }, 5000);






