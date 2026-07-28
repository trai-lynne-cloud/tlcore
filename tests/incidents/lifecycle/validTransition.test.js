const {
  isValidTransition,
} = require("../../../incidents/lifecycle/incidentTransitionRule");
const incidentStatus = require("../../../incidents/schema/incidentStatus");

describe("Incident Lifecycle Valid Transition", () => {
  test("should allow valid transition from OPEN to ACTIVE", () => {
    expect(isValidTransition(incidentStatus.OPEN, incidentStatus.ACTIVE)).toBe(
      true,
    );
  });

  test("should allow valid transition from ACTIVE to RESOLVED", () => {
    expect(
      isValidTransition(incidentStatus.ACTIVE, incidentStatus.RESOLVED),
    ).toBe(true);
  });

  test("should not allow invalid transition from OPEN to RESOLVED", () => {
    expect(
      isValidTransition(incidentStatus.OPEN, incidentStatus.RESOLVED),
    ).toBe(false);
  });

  test("should not allow invalid transition from RESOLVED to OPEN", () => {
    expect(
      isValidTransition(incidentStatus.RESOLVED, incidentStatus.OPEN),
    ).toBe(false);
  });

  test("should not allow invalid transition from ACTIVE to OPEN", () => {
    expect(isValidTransition(incidentStatus.ACTIVE, incidentStatus.OPEN)).toBe(
      false,
    );
  });

  test("should not allow transition from RESOLVED to RESOLVED", () => {
    expect(
      isValidTransition(incidentStatus.RESOLVED, incidentStatus.RESOLVED),
    ).toBe(false);
  });

  test("should reject an unknown current status", () => {
    expect(isValidTransition("UNKNOWN", incidentStatus.ACTIVE)).toBe(false);
  });
});
