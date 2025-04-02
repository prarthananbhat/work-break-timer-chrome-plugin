let timerBar = null;

function createTimerBar() {
  if (!timerBar) {
    timerBar = document.createElement('div');
    timerBar.className = 'timer-bar';
    timerBar.innerHTML = `
      <div class="timer-content">
        <div class="timer-display">10</div>
        <div class="timer-status">Work Time</div>
        <div class="timer-controls">
          <button id="startBtn">Start</button>
          <button id="stopBtn" disabled>Stop</button>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    `;
    document.body.appendChild(timerBar);

    // Add event listeners
    const startBtn = timerBar.querySelector('#startBtn');
    const stopBtn = timerBar.querySelector('#stopBtn');
    
    startBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'START_TIMER' });
    });
    
    stopBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'STOP_TIMER' });
    });
  }
}

function updateTimerBar(timeLeft, status, isBreak) {
  if (!timerBar) {
    createTimerBar();
  }
  
  const timerDisplay = timerBar.querySelector('.timer-display');
  const statusDisplay = timerBar.querySelector('.timer-status');
  const progressFill = timerBar.querySelector('.progress-fill');
  const startBtn = timerBar.querySelector('#startBtn');
  const stopBtn = timerBar.querySelector('#stopBtn');
  
  timerDisplay.textContent = timeLeft;
  statusDisplay.textContent = status;
  
  const totalTime = isBreak ? 5 : 10;
  const percentage = (timeLeft / totalTime) * 100;
  progressFill.style.width = `${percentage}%`;
  progressFill.className = `progress-fill${isBreak ? ' break' : ''}`;
  
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopTimerBar() {
  if (timerBar) {
    const startBtn = timerBar.querySelector('#startBtn');
    const stopBtn = timerBar.querySelector('#stopBtn');
    const progressFill = timerBar.querySelector('.progress-fill');
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    progressFill.style.width = '0%';
    progressFill.className = 'progress-fill';
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'UPDATE_TIMER':
      updateTimerBar(message.timeLeft, message.status, message.isBreak);
      break;
    case 'STOP_TIMER':
      stopTimerBar();
      break;
  }
}); 