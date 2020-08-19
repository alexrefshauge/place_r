var canvas = document.getElementById("mainCanvas");
var btnShape = document.getElementsByClassName("shape");
var ctx = canvas.getContext("2d");
var shape = "square";
var color = "#F00";
var seconds = 60;

var dotList = [];

function setColor(colorSent) {
  color = colorSent;
}

function setShape(shapeSent) {
  shape = shapeSent;
}

function Dot(x, y, color, shape) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.shape = shape;

  this.render = () => {
    switch (this.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        break;
      case "square":
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - 6, this.y - 6, 8, 8);
        break;
      default:
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
  };
}

function renderDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotList.length; i++) {
    dotList[i].render();
  }
}
/*
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
    dotList.push(new Dot(mousePos.x, mousePos.y, color, shape));
    console.log(dotList[0].x);
    renderDots();
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

renderDots();

/*
    xpos = window.event.screenX;
    ypos = window.event.screenY;
*/
