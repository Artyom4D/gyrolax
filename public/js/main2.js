(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var tracker = new Tracker();

(function() {
  var canvas = document.getElementById("c");
  ctx = canvas.getContext("2d");
  ctx2 = document.getElementById("c2").getContext("2d");
  ctx2.fillStyle = "white";
  ctx2.fillRect(0, 0, 500, 500);
  animate();
})();

var x = 150;
var x2 = 200;
var y = 250;

var speedX = 0;
var speedY = 0;

var step = 1;
var sample = 0;

var integral = 0;
var oldAlpha = null;


function updateMarkerPosition() {

  // var deltaX = tracker.getAcceleration().x;
  // var deltaY = tracker.getAcceleration().y;


  var alpha = tracker.getOrientation().alpha;

  if (oldAlpha === null) {
    oldAlpha = alpha;
  }

  var deltaAlpha = alpha - oldAlpha;

  x += deltaAlpha * 5;
  x2 += deltaAlpha * 3;
  oldAlpha = alpha;


/*

  x += deltaX;
  y += deltaY;

  step++;

  if (step > 500) {
      ctx2.fillStyle = "white";
      ctx2.fillRect(0, 0, 500, 500);
      step = 1;
  }

  if (Math.abs(deltaY) < 0.05) {
    deltaY = 0;
  }

  ctx2.strokeStyle = "green";
    ctx2.beginPath();
    ctx2.moveTo(step - 1, 250-sample*30);
    ctx2.lineTo(step, 250-deltaY*30);
    ctx2.stroke();

    ctx2.strokeStyle = "darkgoldenrod";
    ctx2.beginPath();
    ctx2.moveTo(step - 1, 250-integral*30);
    ctx2.lineTo(step, 250-(integral + deltaY)*30);

    sample = deltaY;
    integral += deltaY;
    ctx2.stroke();    
*/

  //ctx2.fillRect(step, 250-deltaX*20, 2, 2);


  var acc = tracker.getAcceleration();
  document.getElementById("accel").innerHTML = acc.x;
  document.getElementById("dbg").innerHTML = tracker.getOrientation().alpha;
}

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 500);
}

function drawAxis() {
  ctx.strokeStyle = "lightgrey";
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 500);
  ctx.moveTo(0, 250);
  ctx.lineTo(500, 250);
  ctx.stroke();  
}

function drawMarker() {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 10, 10);
  ctx.fillStyle = "darkgrey";
  ctx.fillRect(x2, 200, 10, 10);
}

function animate() {
  updateMarkerPosition();
  clear();
  drawAxis();
  drawMarker();
  requestAnimationFrame(animate);
}