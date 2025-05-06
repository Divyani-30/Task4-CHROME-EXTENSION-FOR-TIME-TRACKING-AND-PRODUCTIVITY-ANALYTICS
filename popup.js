chrome.storage.local.get(["trackedData"], (result) => {
  const data = result.trackedData || {};
  const list = document.getElementById("activityList");
  for (const domain in data) {
    const li = document.createElement("li");
    li.textContent = `${domain}: ${(data[domain] / 60000).toFixed(1)} mins`;
    list.appendChild(li);
  }
});
