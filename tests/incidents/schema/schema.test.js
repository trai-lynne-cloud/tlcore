const { createIncident } = require("../../../shared/schemas/incident");
const incidentStatus = require("../../../incidents/incidentStatus");

describe("Incident schema", () => {
  it("should create an incident with the correct properties", () => {
    const incident = createIncident("service1", "high");

    expect(incident.incident_id).toEqual(expect.any(String));
    expect(incident.incident_id).not.toHaveLength(0);

    expect(incident).toHaveProperty("service_id", "service1");
    expect(incident).toHaveProperty("severity", "high");
    expect(incident).toHaveProperty("status", incidentStatus.OPEN);

    expect(incident.start_time).toEqual(expect.any(String));
    expect(new Date(incident.start_time).toString()).not.toBe("Invalid Date");
  });
});
