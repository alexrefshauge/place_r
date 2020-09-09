/*var time;
const countDownElement = document.getElementById("time");

function func() {

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countDownElement.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0) {
        stopTimer();
    }
    time !== 0 ? time-- : time;
}
function test() {
    startTimer(5)
}
function startTimer(timeInSeconds) {
    console.log("Timer startet");
    time = timeInSeconds;
    timer = setInterval(func, 1000);
}

function stopTimer() {
    clearInterval(timer);
    console.log("Timer stoppet");
}
*/

