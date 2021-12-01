import './UI/UI.css'
import $ from 'jquery'
import settings from './core/settings';


const data = new settings();
let setStatus = status => { let msg = 'Состояние: '; $('#status').html(msg + status); }
let isRunning = () => {
	chrome.runtime.sendMessage('isRunning');
	chrome.runtime.onMessage.addListener( res => {

	if ( res === true ) setStatus('работет');
	else setStatus('не работет');
} );
}


isRunning();
$('#user-info').val(data.settings.userInfo);
$('#latency-input').val( (data.settings.latency == undefined) ? 30: data.settings.latency );
$(`#qusts-type option[value="${data.settings.questionsType}"]`).prop('selected', true);
$(`#auto-join option[value="${data.settings.autoJoin}"]`).prop('selected', true);



$('#launch').on('click', function(event){
	event.preventDefault();
	if ( isRunning === true ){
		if ( $('#user-info').val() == undefined ) {setStatus('работет в режиме ответов ко всей аудитории'); $('option[value="class"]').attr('selected', 'selected'); }
		chrome.runtime.sendMessage( 'open-call-view' );
	}
	else setStatus('выбрана неверная вкладка');
});
$('#save').on('click', async function(event){
	event.preventDefault();
	data.settings.userInfo = $('#user-info').val();
	data.settings.latency = $('#latency-input').val();
	data.settings.questionsType = $('#qusts-type option:selected').attr('value');
	data.settings.autoJoin = $('#auto-join option:selected').attr('value');
	await data.save();
	setStatus('Сохранено');
	console.log(data);
});