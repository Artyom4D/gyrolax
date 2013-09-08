function Tracker() {
  this._speed = null;

  this._oldAccel = null;
  this._accel = null;
  this._orientation = null;
  this._boundOnMotion = this._onMotion.bind(this);
  this._boundOnOrientation = this._onOrientation.bind(this);
  this.reset();
  this._installEventListeners();
}

var _p = Tracker.prototype;

_p.reset = function() {
	this._speed = { x: 0, y: 0, z: 0 };
	this._accel = { x: 0, y: 0, z: 0 };
	this._oldAccel = { x: 0, y: 0, z: 0 };
	this._orientation = { alpha: 0, beta: 0, gamma: 0 };
};

_p.getAcceleration = function() {
	return this._accel;
};

_p.getSpeed = function() {
	return this._speed;
};

_p.getOrientation = function() {
	return this._orientation;
};

_p._installEventListeners = function() {
	window.addEventListener('deviceorientation', this._boundOnOrientation, false);
	window.addEventListener('devicemotion', this._boundOnMotion, false);
};

_p._uninstallEventListeners = function() {
	window.removeEventListener('deviceorientation', this._boundOnOrientation, false);
	window.removeEventListener('devicemotion', this._boundOnMotion, false);
};

_p._onMotion = function(event) {
	this._accel.x = this._oldAccel.x - event.acceleration.x;
	this._accel.y = this._oldAccel.y - event.acceleration.y;
	this._accel.z = this._oldAccel.z - event.acceleration.z;

	this._oldAccel.x = event.acceleration.x;
	this._oldAccel.y = event.acceleration.y;
	this._oldAccel.z = event.acceleration.z;

};

_p._onOrientation = function(event) {
	this._orientation.alpha = event.alpha;
	this._orientation.beta = event.beta;
	this._orientation.gamma = event.gamma;
};