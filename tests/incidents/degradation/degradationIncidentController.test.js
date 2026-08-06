const {
  clearDegradationState,
  hasActiveDegradationIncident,
} = require("../../../incidents/degradation/degradationState");
const handleDegradationIncident = require("../../../incidents/degradation/degradationIncidentController");
const systemState = require("../../../health/state/systemState");
const incidentStatus = require("../../../incidents/schema/incidentStatus");
const {
  clearIncidentStore,
} = require("../../../incidents/store/incidentStore");
const {
  clearIncidentTransitionStore,
} = require("../../../incidents/store/incidentTransitionStore");

describe("Degradation Incident Controller", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-03T18:00:00.000Z"));
    clearDegradationState();
    clearIncidentStore();
    clearIncidentTransitionStore();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Handle DEGRADED state", () => {
    test("Should not create an incident if the degradation is not sustained", () => {
      handleDegradationIncident(systemState.DEGRADED);

      jest.advanceTimersByTime(29999);

      const result = handleDegradationIncident(systemState.DEGRADED);

      expect(result).toBeNull();
      expect(hasActiveDegradationIncident()).toBe(false);
    });

    test("Should create S2 incident if the degradation is sustained", () => {
      handleDegradationIncident(systemState.DEGRADED);

      jest.advanceTimersByTime(30000);

      const result = handleDegradationIncident(systemState.DEGRADED);

      expect(result).not.toBeNull();
      expect(hasActiveDegradationIncident()).toBe(true);

      expect(result.incident.status).toBe(incidentStatus.ACTIVE);
      expect(result.incident.severity).toBe("S2");

      expect(result.transition.previous_status).toBe(incidentStatus.OPEN);
      expect(result.transition.next_status).toBe(incidentStatus.ACTIVE);
    });

    test("Should not create a new incident if one is already active", () => {
      handleDegradationIncident(systemState.DEGRADED);

      jest.advanceTimersByTime(30000);

      const firstResult = handleDegradationIncident(systemState.DEGRADED);
      const secondResult = handleDegradationIncident(systemState.DEGRADED);

      expect(firstResult).not.toBeNull();
      expect(secondResult).toBeNull();
    });
  });

  describe("Handle FAILING state", () => {
    test("Should not create an incident if the degradation is not sustained", () => {
      handleDegradationIncident(systemState.FAILING);

      jest.advanceTimersByTime(29999);

      const result = handleDegradationIncident(systemState.FAILING);

      expect(result).toBeNull();
      expect(hasActiveDegradationIncident()).toBe(false);
    });

    test("Should create S0 incident if the degradation is sustained", () => {
      handleDegradationIncident(systemState.FAILING);

      jest.advanceTimersByTime(30000);

      const result = handleDegradationIncident(systemState.FAILING);

      expect(result).not.toBeNull();
      expect(hasActiveDegradationIncident()).toBe(true);

      expect(result.incident).not.toBeNull();
      expect(result.incident.status).toBe(incidentStatus.ACTIVE);
      expect(result.incident.severity).toBe("S0");

      expect(result.transition.previous_status).toBe(incidentStatus.OPEN);
      expect(result.transition.next_status).toBe(incidentStatus.ACTIVE);
    });

    test("Should not create a new incident if one is already active", () => {
      handleDegradationIncident(systemState.FAILING);

      jest.advanceTimersByTime(30000);

      const firstResult = handleDegradationIncident(systemState.FAILING);
      const secondResult = handleDegradationIncident(systemState.FAILING);

      expect(firstResult).not.toBeNull();
      expect(secondResult).toBeNull();
    });
  });
});
