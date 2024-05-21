const EventEmitter = require("events");

const emitter = new EventEmitter();

const greetEventName = "greet";

emitter.on(greetEventName, function (val) {
  console.log(`Before#${greetEventName}: ${val}`);
});

emitter.emit(greetEventName, 1);

console.log("After Emit");

setTimeout(() => {
  emitter.emit(greetEventName, 2);
}, 2000);

emitter.on(greetEventName, function (val) {
  console.log(`After#${greetEventName}: ${val}`);
});

// console.log(emitter.listeners(greetEventName));
console.log(emitter.eventNames());
