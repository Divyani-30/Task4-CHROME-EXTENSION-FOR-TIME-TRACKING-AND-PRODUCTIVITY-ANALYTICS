chrome.storage.local.get(["trackedData"], (result) => {
  const data = result.trackedData || {};
  const labels = Object.keys(data);
  const values = labels.map(domain => data[domain] / 60000);
  
  const chart = new Chart(document.getElementById("chart"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Time Spent (minutes)',
        data: values,
        backgroundColor: 'blue'
      }]
    }
  });
});
