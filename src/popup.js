import './UI/UI.css'
import $ from 'jquery'



$('#launch').on('click', function(){
	chrome.runtime.sendMessage( 'open-call-view' );
});