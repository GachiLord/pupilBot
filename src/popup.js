let call = document.getElementById("call")
let chat = document.getElementById("chat")

var port = null;

call.addEventListener('click', () => {
	chrome.runtime.sendMessage( 'open-call-view' );
})

chat.addEventListener('click', () => {
    chrome.runtime.sendMessage( 'open-chat-view' );
})