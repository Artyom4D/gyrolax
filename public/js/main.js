(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

if (!window.DeviceMotionEvent) {
	//alert("No motion events supported");
}


function Tracker() {
  this._ax = 0;
  this._ay = 0;
  this._az = 0;
}

_p = Tracker.prototype;

Tracker.supportsMotion = function() {
  return !!window.DeviceMotionEvent;
};

_p._installListeners = function() {

};

var ax = 0;
var ay = 0;
var az = 0;


var prevSpeedX = 0;
var prevSpeedY = 0;
var speedX = 0;
var speedY = 0;

//document.body.innerHTML += "<b>Version: 1</b>"
/**
 * Accelerometer
 */
window.ondevicemotion = function(event) {
	var accel = event.accelerationIncludingGravity; 
	var deltaX = ax - accel.x;
	var deltaY = ay - accel.y;


  // rotation = event.rotationRate;
  // if (rotation) {
  //   arAlpha = Math.round(rotation.alpha);
  //   arBeta = Math.round(rotation.beta);
  //   arGamma = Math.round(rotation.gamma);
  // }

  updateSensor(accel.x, accel.y, accel.z);

  document.getElementById("accel").innerHTML = ax + ": " + ay + ": " + az + ": ";
  document.getElementById("dbg").innerHTML = speedX + ": " + speedY;
};

/**
 * Gyroscope
 */
window.ondeviceorientation = function(event) {
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta);
  gamma = Math.round(event.gamma);
  document.getElementById("gyro").innerHTML = alpha + ": " + beta + ": " + gamma + ": ";
};

var ctx = null;
var x = 250;
var y = 250;


(function() {
	var canvas = document.getElementById("c");
	ctx = canvas.getContext("2d");
	animate();
})();

function updateSensor(x, y, z) {
	ax = x;
  	ay = y;
  	az = z;
}

function updateMarkerPosition() {
	x += ax * 0.1;
	y += -ay * 0.1;	
}

function animate() {
	// speedX += deltaX;
  	// speedY -= deltaY;
  	updateMarkerPosition();

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 500, 500);
	ctx.fillStyle = "black";
	ctx.fillRect(x, y, 10, 10);
	requestAnimationFrame(animate);
}