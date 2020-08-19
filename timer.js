var countDownDate = new Date();
countDownDate.setSeconds(countDownDate.getSeconds() + 10);
var timeText = document.getElementById("time");

function func() {
    //get todays date and time
    var now = new Date().getTime();

    //find the distance
    var distance = countDownDate - now;

    //Time calculations
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Conditional (ternary) operator, sætter et 0 foran minutter og sekunder, hvis de er under 10
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    //Output the result in an element
    timeText.innerHTML = minutes + ":" + seconds;
    console.log(minutes + ":" + seconds)
    //if the count is over, do something
    console.log(distance);
    if (distance <= 1000) {
        timeText.style.color = "green"
        console.log("færdig")
        clearInterval(x);
    }
}

var x = setInterval(func, 1000);
