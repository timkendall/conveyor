'use strict';

var Conveyor = require('../lib/conveyor.js'),
  conveyor = new Conveyor({ timeout: 1000, wait: false });

function myFunc1 () {
  console.log('1');
}

function myFunc2 () {
  console.log('2');
}

function myFunc3 () {
  console.log('3');
}

conveyor.push(myFunc1);
conveyor.push(myFunc2);
conveyor.push(myFunc3);

conveyor.start();
// => 1, 2, 3
