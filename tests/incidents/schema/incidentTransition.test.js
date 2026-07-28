const {
  createIncidentTransition,
} = require("../../../incidents/schema/incidentTransition");
const incidentStatus = require("../../../incidents/schema/incidentStatus");

describe("Incident Transition schema", () => {
  it("should create an incident transition with the correct properties", () => {
    const incidentId = "incident123";
    const previousStatus = incidentStatus.OPEN;
    const nextStatus = incidentStatus.ACTIVE;

    const transition = createIncidentTransition(
      incidentId,
      previousStatus,
      nextStatus,
    );

    expect(transition).toHaveProperty("incident_id", incidentId);
    expect(transition).toHaveProperty("previous_status", previousStatus);
    expect(transition).toHaveProperty("next_status", nextStatus);
    expect(transition).toHaveProperty("transition_time");
    expect(new Date(transition.transition_time).toString()).not.toBe(
      "Invalid Date",
    );
  });
});
