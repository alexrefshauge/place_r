//much variables
var canvas = document.getElementById("mainCanvas");
var btnShape = document.getElementsByClassName("shape");
var jsColorSelector = document.getElementById("jsColorSelector");
var jsColorSelectorBody = document.getElementById("jsColorSelectorBody");
var ctx = canvas.getContext("2d");
var shape = "square";
var color = "#FF0";
var seconds = 60;

//vigtig list med prik objecter
var dotList = [];

//color selection
function setColor(colorSent) {
  color = colorSent;
}


function getJsColor() {
  jsColorSelectorBody.style.backgroundColor = color;
  color = jsColorSelector.style.backgroundColor.toString(); //PROBLEM: find farven!
  console.log("color : " + color.toString());
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

//render dem dots
function renderDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotList.length; i++) {
    dotList[i].render();
  }
}

/* hvad var meningen med det her?

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
    console.log(Math.round(dotList[dotList.length-1].x) + " ; " + Math.round(dotList[dotList.length-1].y));
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

getJsColor();

/*
NOTE:
lort = getJsColor()
Wulf, vi skal have lortet til at loope!
*/



/*  irelavant???
    xpos = window.event.screenX;
    ypos = window.event.screenY;
*/
