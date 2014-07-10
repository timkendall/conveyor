/*
 * conveyor
 * https://github.com/timkendall/conveyor
 *
 * Copyright (c) 2014 Timothy Kendall
 * Licensed under the MIT license.
 */

'use strict';

var inherits = require('inherits'),
  EventEmitter = require('events').EventEmitter;

function Conveyor (options) {
	if (!(this instanceof Conveyor))
    return new Conveyor(options);
  	
  // Append properties of EventEmiter
  EventEmitter.call(this);
  var me = this;

  options = options || {};
	this.timeout = options.timeout || 50;
	this.wait = options.wait || false;
	this.jobs = []; 
	this.interval = null;
	this.busy = false;

	// (wait mode) Let Conveyor know we can execute next job
	this.on('success', function () {
		me.busy = false;
		if (me.wait) me.next();
	});
}
// Inherit from EventEmitter
inherits(Conveyor, EventEmitter);

Conveyor.prototype.push = function (job) {
	this.jobs.push(job);
} 

Conveyor.prototype.start = function () {
	var self = this;

	// Execute action every x-ms
	this.interval = setInterval(function () {
		// Pull and execute front job
		if (self.jobs.length > 0) {
			if (self.wait && !self.busy)
				self.jobs.shift()();
			else {
				self.jobs.shift()();
				self.emit('success')
			}
			
		}
	}, this.timeout);
}

Conveyor.prototype.next = function () {
	var self = this;

	// Ignore if not in wait mode
	if (this.wait === false) return;

	if (self.jobs.length > 0) {
		self.busy = true;
		self.jobs.shift()();
	}
}

Conveyor.prototype.stop = function () {
	if(this.interval) clearInterval(this.interval);
}

module.exports = Conveyor;