const { startRuntime, stopRuntime } = require('../ctrl/runtime/runtimeController');
const { getRuntimeStatus } = require('../ctrl/state/runtimeStatusController');

console.log("Initial:", getRuntimeStatus());

startRuntime();
console.log("After start:", getRuntimeStatus());

startRuntime(); // should be idempotent
console.log("After duplicate start:", getRuntimeStatus());

stopRuntime();
console.log("After stop:", getRuntimeStatus());

stopRuntime(); // should be idempotent
console.log("After duplicate stop:", getRuntimeStatus());