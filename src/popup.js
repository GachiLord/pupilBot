let call = document.getElementById("launch")


call.addEventListener('click', () => {
	chrome.runtime.sendMessage( 'open-call-view' );
})