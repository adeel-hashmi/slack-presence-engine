/**
 * Slack Presence Engine - Service Worker
 * Focus: Event-driven architecture using Alarms.
 */

const ALARM_NAME = 'slack-presence-pulse';

// 1. Initial Setup: Schedule the first pulse when installed or Chrome starts
chrome.runtime.onInstalled.addListener(() => {
    console.log('--- Slack Presence Engine Started ---');
    scheduleNextPulse();
});

// 2. The Listener: This wakes the Service Worker up from its "sleep" state
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        performPulse();
        scheduleNextPulse(); // Schedule the next one with a new random time
    }
});

// 3. Logic: Find Slack tabs and inject the activity pulse
async function performPulse() {
    //  Check if the user has paused the engine
    const result = await chrome.storage.local.get(['enabled']);
    if (result.enabled === false) {
        console.log('Engine is currently paused via UI. Skipping pulse.');
        return;
    }

    // Security Check: Only pulse if the system is NOT idle/locked
    const systemState = await chrome.idle.queryState(60); // 60s threshold
    if (systemState !== 'active') {
        console.log('System is idle/locked. Skipping pulse to stay stealthy.');
        return;
    }

    // Find all open Slack tabs
    const tabs = await chrome.tabs.query({ url: "https://app.slack.com/*" });

    if (tabs.length === 0) {
        console.log('No active Slack tabs found.');
        return;
    }

    tabs.forEach(tab => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: simulateUserActivity
        }).catch(err => console.error('Pulse failed for tab:', tab.id, err));
    });
}

// 4. Injected Function: This code runs INSIDE the Slack webpage
function simulateUserActivity() {
    // We trigger a very small mouse move and a focus event.
    // This is enough to reset Slack's internal "last_active" timestamp.
    const event = new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: Math.floor(Math.random() * 10),
        clientY: Math.floor(Math.random() * 10)
    });

    document.dispatchEvent(event);
    window.dispatchEvent(new Event('focus'));

    console.log(`[Presence Engine] Activity Pulse Dispatched at ${new Date().toLocaleTimeString()}`);
}

// 5. Randomizer: Creates the human-like delay (3 to 6 minutes)
function scheduleNextPulse() {
    const randomMinutes = Math.random() * (6 - 3) + 3;
    chrome.alarms.create(ALARM_NAME, { delayInMinutes: randomMinutes });
    console.log(`Next pulse scheduled in ${randomMinutes.toFixed(2)} minutes.`);
}

self.performPulse = performPulse;