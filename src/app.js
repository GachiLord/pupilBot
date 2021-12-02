import RunStatus from './lib/RunStatus'


let tabs = { call: '' }
let getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
let isRunning = async () => {
  return !!tabs.call && await RunStatus.get() == true;
}




await RunStatus.set(!!tabs.call);
chrome.runtime.onMessage.addListener(async (msg) => {
  let tab = await getCurrentTab();
  let path;

  console.log(msg, tabs.call);
  switch ( msg ){
    case 'kill-process':
      await RunStatus.set(false);
      await chrome.tabs.sendMessage( tabs.call, 'stop' );
      break;
    case 'start-process':
      if ( !!tabs.call === false ) {
        path = './dist/process.js';
        tabs.call = tab.id;

        if ( tab.url.includes("skype") && msg === 'start-process' ) {
          await chrome.scripting.executeScript( { target: {tabId: tab.id}, files: [path] });
          await chrome.tabs.sendMessage( tabs.call, 'launch');
          await RunStatus.set(true);
        }

      }else if (await RunStatus.get() == false) {await chrome.tabs.sendMessage( tabs.call, 'launch'); await RunStatus.set(true);}

  }

} );






