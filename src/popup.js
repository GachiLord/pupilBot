import './UI/UI.css'
import $ from 'jquery'
import settings from './core/settings';



const data = new settings();
let setGuide = type => {
	let msg = '1)Открыть вкладу web.skype.com 2)Включить показ субтитров для всех звонков в настройках skype ';
	switch(type){
		case 'true':
			msg += '3)Открыть чат звонка 4)Запустить бота';
			break;
		case 'false':
			msg += '3)Открыть чат звонка 4)Присоединится к звонку 5)Открыть чат 6)Запустить бота';
			break;
	}
	$('#guide').html(msg);
}


if ( data.settings !== undefined ){
	setGuide(String(data.settings.autoJoin));
	$('#user-info').val(data.settings.userInfo);
	$('#reason').val(data.settings.reason);
	$('#latency-input').val( (data.settings.latency == undefined) ? 60: data.settings.latency );
	$(`#qusts-type option[value="${data.settings.questionsType}"]`).prop('selected', true);
	$(`#auto-join option[value="${String(data.settings.autoJoin)}"]`).prop('selected', true);
}





$('#auto-join').on('change', () => { setGuide($('#auto-join option:selected').attr('value')); });

$('#save').on('click', async function(event){
	event.preventDefault();
	data.settings.reason = $('#reason').val();
	data.settings.userInfo = $('#user-info').val();
	data.settings.latency = $('#latency-input').val();
	data.settings.questionsType = $('#qusts-type option:selected').attr('value');
	data.settings.autoJoin = ( $('#auto-join option:selected').attr('value') === 'true' ) ? true: false;
	await data.save();
});