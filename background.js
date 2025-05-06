let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  switchTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    switchTab(tab);
  }
});

function switchTab(tab) {
  if (currentTab && startTime) {
    const duration = Date.now() - startTime;
    saveTime(currentTab.url, duration);
  }
  currentTab = tab;
  startTime = Date.now();
}

function saveTime(url, duration) {
  const domain = new URL(url).hostname;
  chrome.storage.local.get(["trackedData"], (result) => {
    const data = result.trackedData || {};
    data[domain] = (data[domain] || 0) + duration;
    chrome.storage.local.set({ trackedData: data });
  });
}
