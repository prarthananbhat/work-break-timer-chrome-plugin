const WORK_TIME = 10;
const BREAK_TIME = 5;
let timerInterval = null;
let isRunning = false;
let isBreak = false;

function startTimer(tabId) {
  if (!isRunning) {
    isRunning = true;
    isBreak = false;
    startWorkPeriod(tabId);
  }
}

function startWorkPeriod(tabId) {
  let timeLeft = WORK_TIME;
  updateDisplay(tabId, timeLeft, 'Work Time');
  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay(tabId, timeLeft, 'Work Time');
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      startBreakPeriod(tabId);
    }
  }, 1000);
}

function startBreakPeriod(tabId) {
  isBreak = true;
  let timeLeft = BREAK_TIME;
  updateDisplay(tabId, timeLeft, 'Break Time');
  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay(tabId, timeLeft, 'Break Time');
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      startWorkPeriod(tabId);
    }
  }, 1000);
}

function stopTimer(tabId) {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    chrome.tabs.sendMessage(tabId, { type: 'STOP_TIMER' });
  }
}

function updateDisplay(tabId, timeLeft, status) {
  chrome.tabs.sendMessage(tabId, {
    type: 'UPDATE_TIMER',
    timeLeft: timeLeft,
    status: status,
    isBreak: isBreak
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_TIMER') {
    startTimer(sender.tab.id);
  } else if (message.type === 'STOP_TIMER') {
    stopTimer(sender.tab.id);
  }
}); 