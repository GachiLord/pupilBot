let tabs = { call: '', chat: '' }
let getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


chrome.runtime.onMessage.addListener(async (msg) => {
  let tab = await getCurrentTab();
  let path;
  switch ( msg ){
    case 'open-call-view':
      path = './dist/process.js';
      tabs.call = tab.id;
      break;
    case 'open-chat-view':
      path = './dist/chatWriter.js';
      tabs.chat = tab.id;
      break;
  }

  if ( tab.url.includes("skype") ) {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: [path]
      });

  }
} );





