const toggleBtn = document.getElementById('toggleBtn');
const statusDiv = document.getElementById('statusDiv');

// Check current status when popup opens
chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== false; // Default true
    updateUI(isEnabled);
});

toggleBtn.addEventListener('click', () => {
    chrome.storage.local.get(['enabled'], (result) => {
        const newState = !(result.enabled !== false);
        chrome.storage.local.set({ enabled: newState }, () => {
            updateUI(newState);
        });
    });
});

function updateUI(isEnabled) {
    if (isEnabled) {
        statusDiv.innerText = "Engine: ACTIVE";
        statusDiv.className = "status-box on";
        toggleBtn.innerText = "Pause Engine";
    } else {
        statusDiv.innerText = "Engine: PAUSED";
        statusDiv.className = "status-box off";
        toggleBtn.innerText = "Resume Engine";
    }
}