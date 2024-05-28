let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    difference = 0;
    running = false;
    lapCounter = 1;
    lapList.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds)
    );
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(updatedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
