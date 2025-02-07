const version = document.getElementById('versions');
version.innerText = `Node v${versions.node()} Electron v${versions.electron()}`;
const minWindow = document.getElementById('minimize');
const closeWindow = document.getElementById('close');


minWindow.innerText = '';
closeWindow.innerText = '';

minWindow.addEventListener('click', () => {
    window.functions.minimizeWindow();
});
closeWindow.addEventListener('click', () => {
    window.functions.closeApplication();
})

const canvas = document.getElementById("clock");
function displayTime() {

    requestAnimationFrame(displayTime);
}
const playButton = document.getElementById('play');
class PomodoroTimer {
    constructor() {
        this.durations = {
            time1: 300,
            time2: 600,
            time3: 1500,
            time4: 5400
        }; // Time in seconds
        this.remainingTime = 0;
        this.totalTime = 0; // Store total time for progress calculations
        this.timer = null;
        this.isPaused = false;
    }

    setTime(duration) {
        if (this.timer) {
            clearInterval(this.timer); // Reset any existing timer
        }

        if (!this.durations[duration]) {
            console.error("Invalid duration selected");
            return;
        }

        this.remainingTime = this.durations[duration]; // Set the selected time
        this.totalTime = this.remainingTime; // Save for progress calculations
        this.runTimer();
        
        displayTime(); // Ensure line starts at full length
    }

    runTimer() {
        this.timer = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
                playButton.innerText = `Time Left: ${this.formatTime(this.remainingTime)}`;;
            } else {
                this.finish();
            }
        }, 1000);
    }

    pause() {
        if (this.timer) {
            clearInterval(this.timer);
            this.isPaused = true;
            console.log("Timer Paused");
        }
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.runTimer();
            console.log("Timer Resumed");
        }
    }

    reset() {
        clearInterval(this.timer);
        this.timer = null;
        this.remainingTime = 0;
        this.isPaused = false;
        console.log("Timer Reset");
    }

    finish() {
        clearInterval(this.timer);
        this.timer = null;
        this.remainingTime = 0;
        playButton.innerText = "⏳ Pomodoro Session Finished!";
    }

    formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    }
}

// Initialize Pomodoro Timer
const pomodoro = new PomodoroTimer();


const minuteOptions = document.getElementsByClassName('minuteOption');
const finishButton = document.getElementById('finish');

Array.from(minuteOptions).forEach((element, i) => {
    element.innerText = pomodoro.formatTime(pomodoro.durations[`time${i+1}`]);
});

minuteOptions.item(0).addEventListener('click', () => {
    pomodoro.setTime("time1");
});
minuteOptions.item(1).addEventListener('click', () => {
    pomodoro.setTime("time2");

});
minuteOptions.item(2).addEventListener('click', () => {
    pomodoro.setTime("time3");

});
minuteOptions.item(3).addEventListener('click', () => {
    pomodoro.setTime("time4");

});
finishButton.addEventListener('click', () => {
    pomodoro.finish();
})

playButton.style.backgroundImage = `url(${window.images.get('image-removebg-preview-3.png')})`;
playButton.style.backgroundSize = 'cover';

playButton.addEventListener('click', () => {
        playButton.style.backgroundImage = `url(${window.images.get('image-removebg-preview-7.png')})`;
        for(let i = 0; i < minuteOptions.length; i++) {
            minuteOptions.item(i).style.display = 'inline-block';
        }
        finishButton.style.display = 'inline-block';
        finishButton.style.backgroundImage = `url(${window.images.get('image-removebg-preview-6.png')})`;
        if(pomodoro.isPaused)
            pomodoro.resume();
        else
            pomodoro.pause();
});