# Work Break Timer Chrome Extension

A simple Chrome extension that helps you maintain a healthy work-break schedule using the Pomodoro technique. This extension provides a clean, modern interface for tracking work and break periods.

## Features

- 🕒 10-second work periods
- ☕ 5-second break periods
- 🎨 Modern, clean interface
- 📊 Visual progress bar
- 🔄 Automatic switching between work and break modes
- ⏯️ Start, pause, and reset functionality
- 🎨 Color-coded progress bar (green for work, orange for break)

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar to open the timer
2. Use the controls to:
   - Start: Begin the timer
   - Pause: Pause the current session
   - Reset: Reset to work mode (10 seconds)
3. The timer will automatically switch between work and break modes
4. The progress bar shows your current progress and changes color based on the mode

## Files

- `manifest.json`: Extension configuration
- `popup.html`: Timer interface
- `popup.js`: Timer logic and controls
- `styles.css`: Modern styling and animations
- `background.js`: Background service worker

## Development

The extension is built using vanilla JavaScript and modern CSS. No external dependencies are required.

## License

MIT License - feel free to use this project for your own purposes. 
