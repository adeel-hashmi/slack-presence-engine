# Slack Presence Engine

A Manifest V3 Chrome Extension designed to maintain an "Active" presence on Slack web sessions by simulating low-level user activity at randomized intervals.

## 🚀 Features

- **MV3 Compliant**: Uses Service Workers and Alarms for longevity.
- **Randomized Pulse**: Activity signals are dispatched at non-linear intervals (3–6 mins) to mimic human behavior.
- **System Aware**: Detects system idle states to pause activity when the computer is locked or asleep.
- **Privacy Focused**: Operates only on `app.slack.com` domains.

## 🛠 Installation (Developer Mode)

1. Clone this repository: `git clone https://github.com/adeel-hashmi/slack-presence-engine`
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the project folder.

## ⚙️ Tech Stack

- **JavaScript** (ES6+)
- **Chrome Extension API** (Alarms, Scripting, Idle, Storage)
- **CSS3** (Popup UI)

## 📄 License

This project is licensed under the MIT License.
