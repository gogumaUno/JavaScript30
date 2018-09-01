let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    const displayTime = `${minutes >= 10? minutes : `0${minutes}`}:${remainSeconds >= 10? remainSeconds : `0${remainSeconds}`}`;
    timeDisplay.textContent = displayTime;
    document.title = displayTime;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(e) {
    const time = parseInt(this.dataset.time);
    timer(time);
}

buttons.forEach( button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = parseInt(customForm.minutes.value) * 60;
    document.customForm.reset();
    if(isNaN(time)) return alert('Write a number');
    timer(time);
});