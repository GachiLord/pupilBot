import Bot from './core/Bot.js'
import config from './core/config.js'
import Massager from './core/Massager.js'
import $ from 'jquery'
import RunStatus from './lib/RunStatus'




const process = new Bot(config, new Massager);
let processId;
let openCount = 0;
let callChecker;
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



chrome.runtime.onMessage.addListener( async msg => {
    alert(msg);
    switch(msg){
        case 'stop':
            clearInterval(processId);
            clearInterval(callChecker);
            await RunStatus.set(false);
            break;
        case 'launch':
            await RunStatus.set(true);
            if ( config.autoJoin == true ) {
                callChecker = setInterval(() => { 
                    openCall();
                    if ( $('[data-text-as-pseudo-element="Позвонить"]').length > 0 ) { 
                        clearInterval(processId); $('[title="Отмена"]').trigger('click');
                        openCount = 0;
                    } }, 5000);
            }
            else processId = process.launch();
            break;
    }
} );


