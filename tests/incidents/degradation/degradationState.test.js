const {
  getDegradationStartTime,
  setDegradationStartTime,
  clearDegradationStartTime,
  hasActiveDegradationIncident,
  getActiveDegradationIncidentId,
  setActiveDegradationIncidentId,
  clearActiveDegradationIncidentId,
  clearDegradationState,
} = require("../../../incidents/degradation/degradationState");

const incidentId = "incident-1";

describe("Degradation State", () => {
  beforeEach(() => {
    clearDegradationState();
  });

  test("should set and get the degradation start time", () => {
    const startTime = setDegradationStartTime();

    const retrievedStartTime = getDegradationStartTime();

    expect(retrievedStartTime).toBe(startTime);
  });

  test("should clear the degradation start time", () => {
    setDegradationStartTime();

    clearDegradationStartTime();

    const retrievedStartTime = getDegradationStartTime();
    expect(retrievedStartTime).toBeNull();
  });

  test("should set and get the active degradation incident ID", () => {
    setActiveDegradationIncidentId(incidentId);

    const retrievedIncidentId = getActiveDegradationIncidentId();
    expect(retrievedIncidentId).toBe(incidentId);
  });

  test("should clear the active degradation incident ID", () => {
    setActiveDegradationIncidentId(incidentId);

    clearActiveDegradationIncidentId();

    const retrievedIncidentId = getActiveDegradationIncidentId();
    expect(retrievedIncidentId).toBeNull();
  });

  test("should check if there is an active degradation incident", () => {
    expect(hasActiveDegradationIncident()).toBe(false);

    setActiveDegradationIncidentId(incidentId);

    expect(hasActiveDegradationIncident()).toBe(true);
  });
});
