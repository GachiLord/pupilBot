let call = document.getElementById("call")


call.addEventListener('click', () => {
	chrome.runtime.sendMessage( 'open-call-view' );
})