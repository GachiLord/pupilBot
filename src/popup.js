import './UI/UI.css'
import $ from 'jquery'
import settings from './core/settings';
import RunStatus from './lib/RunStatus';


const data = new settings();
let setStatus = status => { let msg = 'Состояние: '; $('#status').html(msg + status); }
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
let isRunning = async () => {
	return await RunStatus.get();
}



setStatus( (await isRunning()) ? 'работает' : 'не работет' );
$('#launch').html( ( await isRunning()) ? 'Остановить': 'Запустить' );
setGuide(data.settings.autoJoin);
$('#user-info').val(data.settings.userInfo);
$('#latency-input').val( (data.settings.latency == undefined) ? 30: data.settings.latency );
$(`#qusts-type option[value="${data.settings.questionsType}"]`).prop('selected', true);
$(`#auto-join option[value="${data.settings.autoJoin}"]`).prop('selected', true);




console.log(data.settings);
$('#auto-join').on('change', () => { setGuide($('#auto-join option:selected').attr('value')); });
$('#launch').on('click', async function(event){
	event.preventDefault();
	if ( await isRunning() ) await chrome.runtime.sendMessage( 'kill-process' );
	else{
		if ( $('#user-info').val() == undefined ) {setStatus('работет в режиме ответов ко всей аудитории'); $('option[value="class"]').attr('selected', 'selected'); }

		await chrome.runtime.sendMessage( 'start-process' );
		if ( await isRunning() === false ) setStatus('выбрана неверная вкладка');
	}
	if ( await isRunning() ) $('#launch').html('Остановить');
	else $('#launch').html('Запустить');
});
$('#save').on('click', async function(event){
	event.preventDefault();
	data.settings.userInfo = $('#user-info').val();
	data.settings.latency = $('#latency-input').val();
	data.settings.questionsType = $('#qusts-type option:selected').attr('value');
	data.settings.autoJoin = $('#auto-join option:selected').attr('value');
	await data.save();
	setStatus('Сохранено');
});