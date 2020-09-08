//much variables
var canvas = document.getElementById("mainCanvas");
var btnShape = document.getElementsByClassName("shape");
var jsColorSelector = document.getElementById("jsColorSelector");
var jsColorSelectorBody = document.getElementById("jsColorSelectorBody");
var ctx = canvas.getContext("2d");
var shape = "square";
var color = "#40807d";
var seconds = 60;

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
  color = colorSent;
}

function update(picker) {
  console.log("jscolor");
  jsColorSelectorBody.style.background = picker.toHEXString();
  color = picker.toHEXString();
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
    var mousePos = getMousePos(
      canvas,
      evt,
      canvas.clientWidth,
      canvas.clientHeight
    );

    //push new dot to dotList
    let newDot = new Dot(mousePos.x, mousePos.y, color, shape);
    //dotList.push(newDot);
    console.log(Math.round(newDot.x) + " ; " + Math.round(newDot.y));
    renderDot(newDot);

    sendDot(newDot);
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
