import chat from './core/Massager'

alert('откройте чат звонка');

chrome.runtime.onMessage.addListener( (msg) => {
    console.log(msg);
    if ( 'open-call-view' !== msg && 'open-chat-view' !== msg ) chat.send(msg);
} );