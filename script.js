
let timerTime;

// Break time setter----------------------------------------------
const beep = $("#beep")[0]
const breakLength = $('#break-length');
let breakTime = Number(breakLength.text())
$('#break-decrement').on('click', () => {
  if (breakTime > 1) {
    breakTime = breakTime - 1
  }

  breakLength.text(breakTime)
  changetimerTime()
   
});
$('#break-increment').on('click', () => {
  if (breakTime < 60) {
    breakTime = breakTime + 1
  }
  breakLength.text(breakTime)
  changetimerTime()
});



//session time setter -----------------------------------------------------
const sessionLength = $('#session-length');
let sessionTime = Number(sessionLength.text())

$('#session-decrement').on('click', () => {

  if (sessionTime > 1) {
    sessionTime = sessionTime - 1
  }
  sessionLength.text(sessionTime)
  changetimerTime()
});

$('#session-increment').on('click', () => {
  if (sessionTime < 60) {
    sessionTime = sessionTime + 1
  }
  sessionLength.text(sessionTime)
  changetimerTime()
});



//Timer display + timerLabel ------------------------------------------
let isSession = true;
let minutes = sessionTime
timerTime = sessionTime
const minutesDisplay = $('#minutes');
const secondsDisplay = $('#seconds');
const timerLabel = $("#timer-label")

const toggleIsSession = () => {
  stopTimer()
  if (isSession) {

    isSession = false;
    timerLabel.text('Break')
    timerTime = breakTime


  } else {

    isSession = true;
    timerLabel.text('Session')
    timerTime = sessionTime



  }
  minutesDisplay.text(timerTime)
  minutes = timerTime
   
}



//Set up clocking

let seconds = 00;
let interval = null

function changetimerTime() {
  if (!interval && isSession) {
    minutes = sessionTime
  } else if (!interval && !isSession) {
    minutes = breakTime
  }
  updateDisplay()
}


function incrementTimer() {

  if (seconds == 0 && minutes == 0) {
    beep.play()
    toggleIsSession()
    startTimer()
    

  } else if (seconds == 0 && minutes > 0) {
    seconds = 59;
    minutes--;
  } else if (seconds > 0) {
    seconds--;
  }



  updateDisplay();
}
updateDisplay();
function updateDisplay() {

  minutesDisplay.text(padNumber(minutes));
  secondsDisplay.text(padNumber(seconds));
}
function padNumber(number) {
  return number.toString().padStart(2, '0');
}



//Start-stop-reset functions
const startStopBtn = $('#start_stop');
startStopBtn.on('click', toggleTimer);

$('#reset').on('click', resetTimer);

function toggleTimer() {

  if (interval) {
    stopTimer();

  } else {
    startTimer();

  }
}
function stopTimer() {
  clearInterval(interval);
  interval = null;
  startStopBtn.text('▶');
}
function startTimer() {
  interval = setInterval(incrementTimer, 1000);
  startStopBtn.text('⏸');
}



function resetTimer() {
  stopTimer()
  isSession = true;
  timerLabel.text('Session')
  beep.pause()
  beep.currentTime = 0
  sessionTime = 25
  breakTime = 5
  timerTime = sessionTime
  sessionLength.text(sessionTime)
  breakLength.text(breakTime)
  minutes = sessionLength.text();
  seconds = 00;
  updateDisplay();
}




















  //set timing initially
/* function setInitialTiming() {
  if (isSession) {
    minutes = Number(sessionLength.text());
    timerLabel.text('Session')

  } else {
    minutes = Number(breakLength.text())
    timerLabel.text('Break')
  }
  updateDisplay()
}

setInitialTiming() */




