const { startRuntime, stopRuntime } = require("../../../runtime/controller");
const runtimeStatus = require("../../../runtime/schema/runtimeStatus");
const {
  getRuntimeStatus,
} = require("../../../runtime/state/runtimeStatusController");

describe("Runtime Controller", () => {
  beforeEach(() => {
    stopRuntime();
  });

  test("Should collect runtime status", () => {
    const status = getRuntimeStatus();

    expect(status).toEqual(runtimeStatus.STOPPED);
  });

  test("Should be able to start runtime", () => {
    startRuntime();

    const status = getRuntimeStatus();

    expect(status).toEqual(runtimeStatus.RUNNING);
  });

  test("Starting should be idempotent", () => {
    const startingStatus = getRuntimeStatus();

    expect(startingStatus).toEqual(runtimeStatus.STOPPED);

    startRuntime();

    const updatedStatus = getRuntimeStatus();

    expect(updatedStatus).toEqual(runtimeStatus.RUNNING);

    startRuntime();

    const finalStatus = getRuntimeStatus();

    expect(finalStatus).toEqual(runtimeStatus.RUNNING);
  });

  test("Should be able to stop runtime", () => {
    startRuntime();

    const startingStatus = getRuntimeStatus();

    expect(startingStatus).toEqual(runtimeStatus.RUNNING);

    stopRuntime();

    const updatedStatus = getRuntimeStatus();

    expect(updatedStatus).toEqual(runtimeStatus.STOPPED);
  });

  test("Stopping should be idempotent", () => {
    const startingStatus = getRuntimeStatus();

    expect(startingStatus).toEqual(runtimeStatus.STOPPED);

    stopRuntime();

    const updatedStatus = getRuntimeStatus();

    expect(updatedStatus).toEqual(runtimeStatus.STOPPED);

    stopRuntime();

    const finalStatus = getRuntimeStatus();

    expect(finalStatus).toEqual(runtimeStatus.STOPPED);
  });
});
