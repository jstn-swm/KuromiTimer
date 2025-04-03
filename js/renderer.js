const version = document.getElementById("versions");
version.innerText = `Node v${versions.node()} Electron v${versions.electron()} Beta: v0.0.1`;
const minWindow = document.getElementById("minimize");
const closeWindow = document.getElementById("close");

minWindow.innerText = "";
closeWindow.innerText = "";

minWindow.addEventListener("click", () => {
  window.functions.minimizeWindow();
});
closeWindow.addEventListener("click", () => {
  window.functions.closeApplication();
});

const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");

// Define these missing variables
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radiusX = canvas.width * 0.49; // 45% of canvas width
const radiusY = canvas.height * 0.49; // 45% of canvas height

function drawClock() {
  // Clear the canvas first (important)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Optional: Draw the clock face
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw hour marks
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const outerX = centerX + radiusX * Math.sin(angle);
    const outerY = centerY - radiusY * Math.cos(angle);

    // Calculate inner point of hour mark (slightly shorter)
    const innerX = centerX + radiusX * 0.85 * Math.sin(angle);
    const innerY = centerY - radiusY * 0.85 * Math.cos(angle);

    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(outerX, outerY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
drawClock();
const playButton = document.getElementById("playBtn");
playButton.innerText = "Start";
const numericDisplay = document.getElementById("numeric");
class PomodoroTimer {
  constructor() {
    // Time in seconds
    this.durations = {
      time5: 300,
      time15: 600,
      time30: 1500,
      time90: 5400,
    };
    this.remainingTime = 0;
    this.totalTime = 0; // Store total time for progress calculations
    this.timer = null;
    this.isPaused = null;
  }

  setTime(duration) {
    if (!this.durations[duration]) {
      console.error("Invalid duration selected");
      return;
    }

    this.remainingTime = this.durations[duration]; // Set the selected time
    this.totalTime = this.remainingTime; // Save for progress calculations
  }

  runTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        numericDisplay.innerText = `${this.formatTime(this.remainingTime)}`;
      } else {
        this.finish();
      }
    }, 1000);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.isPaused = true;
      playButton.innerText = "Resume";
      console.log("Timer Paused");
    }
  }

  start() {
    if (this.remainingTime <= 0 || this.remainingTime == null) {
      console.log("Error: No Time Selected!");
      return;
    }
    if (this.isPaused) {
      this.isPaused = false;
      this.runTimer();
      playButton.innerText = "Stop";
      console.log("Timer Started");
    }
  }

  reset() {
    clearInterval(this.timer);
    this.timer = null;
    this.remainingTime = 0;
    this.isPaused = true;
    playButton.innerText = "Start";
    console.log("Timer Reset");
  }

  finish() {
    clearInterval(this.timer);
    this.timer = null;
    this.remainingTime = 0;
    this.isPaused = true;
    numericDisplay.innerText = "⏳ Pomodoro Session Finished!";
  }

  formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min} : ${sec.toString().padStart(2, "0")}`;
  }
}

// Initialize Pomodoro Timer
const pomodoro = new PomodoroTimer();
