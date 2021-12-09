import Bot from './core/Bot.js'
import config from './core/config.js'
import Massager from './core/Massager.js'
import $ from 'jquery'
import './UI/msg.css'
import './lib/draggin'



const process = new Bot(config, new Massager);
$('body').prepend('<div class="controller container-small mb-3 draggable"><div class="mb-3"><h3 id="status"></h3></div>\
<div class="mb-3"><button type="button" class="btn btn-primary" id="action">Запустить</button></div>\
<div class="mb-3"><button type="button" class="btn btn-secondary" id="update">Обновить страницу</button></div></div>');
let isRunning = false;
let setStatus = status => { $('#status').html( (status) ? 'Бот работет' : 'Бот не работет' ); $('#action').html( (status) ? 'Остановить' : 'Запустить' ); }
let processId;
let autoJoin;
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
    if ( $('[data-text-as-pseudo-element="Позвонить"]').length > 0 ) {
        openCount = 0;
        processId = undefined;
        clearInterval(processId);
        $('[title="Отмена"]').trigger('click');
        $('[title="Закрыть"]').trigger('click');
    }
    if ( $('[aria-label="Завершить звонок"]').length > 0 && openCount === 0 ) {
        openCount++;
        processId = process.launch();
    }
}


setInterval( () => { console.log( processId, autoJoin ) }, 1000 );

setStatus(isRunning);
$('#action').on('click', ()=>{ 
    isRunning = !isRunning;
    setStatus(isRunning);

    if ( isRunning ) {
        if ( config.autoJoin === true ) autoJoin = setInterval( openCall, 5000 );
        else processId = process.launch();
    }
    else{
        clearInterval(autoJoin); autoJoin = undefined;
        clearInterval(processId); processId = undefined;
        openCount = 0;
    }
 });
$('#update').on('click', () => { window.location.reload(); });

