document.addEventListener('DOMContentLoaded', function() {
  const minutesDisplay = document.getElementById('minutes');
  const secondsDisplay = document.getElementById('seconds');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const progressBar = document.getElementById('progress');

  let timeLeft = 10; // 10 seconds for work
  let isWorkTime = true;
  let timerId = null;
  let isRunning = false;

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const totalTime = isWorkTime ? 10 : 5;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update progress bar color based on mode
    progressBar.style.background = isWorkTime 
      ? 'linear-gradient(90deg, #4CAF50, #45a049)'
      : 'linear-gradient(90deg, #ff9800, #f57c00)';
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
          clearInterval(timerId);
          isRunning = false;
          // Switch between work and break
          isWorkTime = !isWorkTime;
          timeLeft = isWorkTime ? 10 : 5;
          updateDisplay();
          // Notify the background script that the timer is complete
          chrome.runtime.sendMessage({ 
            type: 'TIMER_COMPLETE',
            mode: isWorkTime ? 'work' : 'break'
          });
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    isWorkTime = true;
    timeLeft = 10;
    updateDisplay();
  }

  // Event listeners
  startButton.addEventListener('click', startTimer);
  resetButton.addEventListener('click', resetTimer);

  // Initialize display
  updateDisplay();
}); 