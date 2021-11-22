import Bot from './core/Bot.js'
import config from './core/config.js'
import Massager from './core/Massager.js'

alert('Присоединитесь к звоноку, включите субтитры, откройте журнал субтитров, поспите');
const process = new Bot(config, new Massager);
process.launch();


