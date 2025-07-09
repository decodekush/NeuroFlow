let tabTimers = {};

chrome.tabs.onActivated.addListener(({ tabId }) => {
  if (!tabTimers[tabId]) tabTimers[tabId] = Date.now();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabTimers[tabId]) {
    const duration = (Date.now() - tabTimers[tabId]) / 1000;
    console.log(`Tab ${tabId} was open for ${duration} sec`);
    tabTimers[tabId] = null;
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'LOG_BEHAVIOR') {
    const logs = JSON.parse(localStorage.getItem('neuroflow_logs') || '[]');
    logs.push(msg.payload);
    localStorage.setItem('neuroflow_logs', JSON.stringify(logs));
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_BEHAVIOR_LOGS') {
    chrome.storage.local.get(['neuroflow_logs'], (result) => {
      sendResponse({ logs: result.neuroflow_logs || [] });
    });
    return true; // allow async sendResponse
  }
});


