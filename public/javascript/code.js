//variables
var canvas = document.getElementById("mainCanvas");
var btnShape = document.getElementsByClassName("shape");
var ColorSelectorBody = document.getElementById("ColorSelectorBody");
var countDownElement = document.getElementById("time");
var ctx = canvas.getContext("2d");
var shape = "square";
var timerSeconds = 5;
var time = -1;
var rndColor = "#" + Math.floor(Math.random() * (16777215 / 2) + (16777215 / 2)).toString(16);
var dotColor = rndColor;

//spectrum
$("#spectrum").css("background-color", rndColor);
$("#spectrum").spectrum({
  preferredFormat: "hex",
  color: rndColor,
  showInput: true,
  showButtons: false,

  move: function (color) {
    console.log(color.toHexString());
    $("#spectrum").css("background-color", color.toHexString());
    dotColor = color.toHexString();
  }
});


//vigtig list med prik objecter
dotList = [];
function initiateDots() {
  $.ajax({
    url: '/data',
    type: 'GET',
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        dotList.push(data[i]);
      }
      renderDots();
    }
  });
}
initiateDots();

function updateDots() {
  $.ajax({
    url: '/data/update',
    type: 'GET',
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        renderDot(data[i]);
      }
    }
  });
}



//load sidste opdatering
var latestCanvas = new Image();
latestCanvas.src = "../data/canvas.png";

latestCanvas.onload = () => {
  ctx.drawImage(latestCanvas, 0, 0);
}

//color selection
function setColor(colorSent) {
  dotColor = colorSent;
}

function update(picker) {
  console.log("jscolor");
  jsColorSelectorBody.style.background = picker.toHEXString();
  dotColor = picker.toHEXString();
}


//shape selection
function setShape(shapeSent) {
  shape = shapeSent;
}

//dot definition
function Dot(x, y, color, shape) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.shape = shape;
};



//render dem dots
function renderDot(Dot) {
  switch (Dot.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(Dot.x, Dot.y, 4, 0, Math.PI * 2, false);
      ctx.fillStyle = Dot.color;
      ctx.fill();
      ctx.closePath();
      break;
    case "square":
      ctx.fillStyle = Dot.color;
      ctx.fillRect(Dot.x - 6, Dot.y - 6, 8, 8);
      break;
    default:
      ctx.beginPath();
      ctx.arc(Dot.x, Dot.y, 4, 0, Math.PI * 2, false);
      ctx.fillStyle = Dot.color;
      ctx.fill();
      ctx.closePath();
  }
}

function renderDots() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  dotList.forEach(Dot => {
    renderDot(Dot);
  });
}

/* hvis koordinater på cursor

canvas.addEventListener(
  "mouseover",
  function (evt) {
    var mousePos = getMousePos(
      canvas,
      evt,
      canvas.clientWidth,
      canvas.clientHeight
    );
    ctx.fillStyle = color;
    ctx.fillRect(mousePos.x - 6, mousePos.y - 6, 8, 8);
  },
  false
);
*/

//ajax post
function sendDot(dot) {

  $.ajax({
    url: '/data',
    type: 'POST',
    data: dot,
    success: function (data) {
      console.log(data);
    }
  });
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    if (time <= -1) {
      var mousePos = getMousePos(
        canvas,
        evt,
        canvas.clientWidth,
        canvas.clientHeight
      );
      startTimer(timerSeconds);
      //push new dot to dotList
      let newDot = new Dot(mousePos.x, mousePos.y, dotColor, shape);
      //dotList.push(newDot);
      console.log(Math.round(newDot.x) + " ; " + Math.round(newDot.y));
      renderDot(newDot);
      sendDot(newDot);
    } else {
      countDownElement.style.fill = "#f54257";
    }
  },
  false
);

function getMousePos(canvas, evt, canvasWidth, canvasHeight) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX / (canvasWidth / canvas.width) - rect.left,
    y: evt.clientY / (canvasHeight / canvas.height) - rect.top,
  };
}

function appendDot() { }


//ajax get loop
function func() {
  updateDots();
}

var x = setInterval(func, 500);

//TIMER
startTimer(timerSeconds);

function timerFunction() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  countDownElement.innerHTML = `0${minutes}:${seconds}`;

  time--;
  if (time <= -1) {
    stopTimer();
  } else {
    countDownElement.style.fill = "#ffffff"
  }
  console.log(time);
}

function startTimer(timeInSeconds) {
  console.log("Timer startet");
  if (timeInSeconds < 10) {
    countDownElement.innerHTML = "00:0" + timeInSeconds;
  } else if (timeInSeconds < 60) {
    countDownElement.innerHTML = "00:" + timeInSeconds;
  }

  time = timeInSeconds - 1;
  timer = setInterval(timerFunction, 1000);
  countDownElement.style.fill = "#ffffff";
}

function stopTimer() {
  clearInterval(timer);
  console.log("Timer stoppet");

  countDownElement.style.fill = "#2eff7b";
}
