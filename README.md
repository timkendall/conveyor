# conveyor 

> Simple synchronous job runner


## Getting Started

Install the module with: `npm install conveyor`

```js
var Conveyor = require('conveyor');
var conveyor = new Conveyor({ timeout: 50, wait: false });

// Add a job
conveyor.push(function() { /* Do something... */ });

// Start
conveyor.start()

// Stop
conveyor.stop();

// Listen for completion event
conveyor.on('success', function () {});
```

### Options
Conveyor takes an `options` object with the following optional fields
  - `timeout` _(default: 50ms)_ The time between job execution in ms
  - `wait` _(default: false)_ Wait for each job to fire `conveyor.emit('success')`

Install with cli command

```sh
$ npm install conveyor
```

## Why
Originally made this to handle sending messages over a socket so as not to overwhelm the recieving device.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Timothy Kendall  
Licensed under the MIT license.
