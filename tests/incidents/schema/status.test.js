const incidentStatus = require("../../../incidents/schema/incidentStatus");

describe("Incident Status", () => {
  test("should have correct status values", () => {
    expect(incidentStatus).toEqual({
      OPEN: "OPEN",
      ACTIVE: "ACTIVE",
      RESOLVED: "RESOLVED",
    });
  });
});
