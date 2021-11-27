import $ from 'jquery'


export default class Massager{

    constructor(){
        this.history = [];
    }

    static send(text){
        //solution from https://stackoverflow.com/questions/54256517/make-document-execcommandinserttext-false-message-work-with-draftjs

        const dataTransfer = new DataTransfer();

        function dispatchPaste(target, text) {
            // this may be 'text/html' if it's required
            dataTransfer.setData('text/plain', text);

            target.dispatchEvent(
                new ClipboardEvent('paste', {
                clipboardData: dataTransfer,

                // need these for the event to reach Draft paste handler
                bubbles: true,
                cancelable: true
                })
            );

            // clear DataTransfer Data
            dataTransfer.clearData();
        }
        
        dispatchPaste(document.querySelector('.public-DraftStyleDefault-block'), text);
        $('[aria-label="Отправить сообщение"]').trigger('click');
    }  

    get(){
        const forriben = ['IG',
         'Микрофон отключен', 'Пригласить', 'Записать', 'Участники',
          'Чат', 'Демонстрация экрана', 'Поднять руку', 'heart', 'Отреагировать',
           'Еще', '1', '1', 'Участников звонка: 2 из 2 | 0:06', 'Просмотр',
           '© Skype и (или) Майкрософт (Microsoft), 2021.', '.', 'Субтитры запущены на русский.',
           'Изменить язык', 'Прокофьев Николай', 'igor', 'До скайп дотком субтитры, запущенные на русский язык.',
            'Давай давай.', 'Участников звонка: 2 из 2 | 0:21', 'Субтитры запущены на русский.', 'Изменить язык',
            'igor', 'До скайп дотком субтитры, запущенные на русский язык.', 'Давай давай.',
              'давай уже покажи мне', 'sad', 'surprised', 'laugh', 'clap', 'yes', 'Участников звонка: 2 из 2 | 0:24',
               '18:03', 'Звонок', '18:05', 'Звонок', '18:20', 'Звонок', '18:32', 'Звонок', '18:35', 'Звонок', '18:46',
                'Звонок', '18:52', 'Звонок', '18:54', 'Звонок', '18:54', 'Звонок начат', 'Субтитры запущены на русский.',
                 'Изменить язык','igor', 'До скайп дотком субтитры, запущенные на русский язык.',
                  'Давай давай.', 'Давай уже покажи мне что нибудь.', 'Участников звонка: 2 из 2 | 0:27', 'RU', '13:39', 
                  'Нет ответа', '13:41', 'Пропущенный звонок от guest:3bf0c558-85c6-4245-b34e-cc509387a78f', '13:44', 'Звонок',
                   '20:20', 'Звонок', '20:23', 'Звонок', '20:27', 'Звонок', 'Суббота', '18:21', 'Звонок', '18:25', 'Звонок завершен',
                    '18:34', 'Звонок', '18:50', 'Звонок', '18:55', 'Звонок', '18:56', 'Звонок', '18:58', 'Звонок', '19:04', 'Звонок',
                     '12', 'Воскресенье', '20:31', 'Звонок', '20:44', 'Звонок завершен', '21:33', 'Звонок', 'Сегодня', '17:50', 'Звонок',
                      '17:55', 'Звонок завершен', '17:55', 'Нет ответа', '17:59', 'Звонок', '18:02', 'Звонок', '18:03', 'Звонок', '18:05',
                       'Звонок', '18:20', "Представление", "Сетка", "Сердце", "Коллекция", 'ПН', 'Представление "Сетка"',
                        'NP', '|', 'join.skype.com/Crp4Vn7ts75B', 'Пригласите контакты в Скайпе или поделитесь ссылкой', 'Добавить людей', 'журнал субтитров'];
        const history = [];

        $('body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(3) > div div').each( function(){
            let text = $(this).attr('data-text-as-pseudo-element');
            console.log(text);
            if ( forriben.includes(text) === false && /[0-9]+\:[0-9]+/.test(text) === false ) history.push(text);
        } );


        return history.join(' ');
    }

    set(q, replace){
        $('body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(3) > div div').each( function(){
            let str = $(this).attr('data-text-as-pseudo-element');
            if ( str !== undefined ) $(this).attr('data-text-as-pseudo-element', str.replace(q, replace) );
        } );
    }

}