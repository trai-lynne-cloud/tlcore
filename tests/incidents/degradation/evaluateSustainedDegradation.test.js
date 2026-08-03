const evaluateSustainedDegradation = require("../../../incidents/degradation/evaluateSustainedDegradation");
const systemState = require("../../../health/state/systemState");
const {
  clearDegradationState,
  getDegradationStartTime,
  setActiveDegradationIncidentId,
  getActiveDegradationIncidentId,
} = require("../../../incidents/degradation/degradationState");

describe("Sustained Degradation Evaluation", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-03T18:00:00.000Z"));
    clearDegradationState();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("first DEGRADED evaluation starts the timer and returns false", () => {
    const result = evaluateSustainedDegradation(systemState.DEGRADED);

    expect(result).toBe(false);
    expect(getDegradationStartTime()).not.toBeNull();
  });

  test("DEGRADED before 30 seconds returns false", () => {
    evaluateSustainedDegradation(systemState.DEGRADED);

    jest.advanceTimersByTime(29999);

    const result = evaluateSustainedDegradation(systemState.DEGRADED);

    expect(result).toBe(false);
  });

  test("DEGRADED at 30 seconds returns true", () => {
    evaluateSustainedDegradation(systemState.DEGRADED);

    jest.advanceTimersByTime(30000);

    const result = evaluateSustainedDegradation(systemState.DEGRADED);

    expect(result).toBe(true);
  });

  test("first FAILING evaluation starts the timer and returns false", () => {
    const result = evaluateSustainedDegradation(systemState.FAILING);

    expect(result).toBe(false);
    expect(getDegradationStartTime()).not.toBeNull();
  });

  test("FAILING before 30 seconds returns false", () => {
    evaluateSustainedDegradation(systemState.FAILING);

    jest.advanceTimersByTime(29999);

    const result = evaluateSustainedDegradation(systemState.FAILING);

    expect(result).toBe(false);
  });

  test("FAILING at 30 seconds returns true", () => {
    evaluateSustainedDegradation(systemState.FAILING);

    jest.advanceTimersByTime(30000);

    const result = evaluateSustainedDegradation(systemState.FAILING);

    expect(result).toBe(true);
  });

  test("HEALTHY clears the timer but preserves the active incident ID", () => {
    evaluateSustainedDegradation(systemState.DEGRADED);
    setActiveDegradationIncidentId("incident-1");

    const result = evaluateSustainedDegradation(systemState.HEALTHY);

    expect(result).toBe(false);
    expect(getDegradationStartTime()).toBeNull();
    expect(getActiveDegradationIncidentId()).toBe("incident-1");
  });

  test("UNKNOWN clears the timer but preserves the active incident ID", () => {
    evaluateSustainedDegradation(systemState.DEGRADED);
    setActiveDegradationIncidentId("incident-1");

    const result = evaluateSustainedDegradation(systemState.UNKNOWN);

    expect(result).toBe(false);
    expect(getDegradationStartTime()).toBeNull();
    expect(getActiveDegradationIncidentId()).toBe("incident-1");
  });
});
