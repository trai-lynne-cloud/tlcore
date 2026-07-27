const incidentStatus = require("../../../incidents/incidentStatus");

describe("Incident Status", () => {
  test("should have correct status values", () => {
    expect(incidentStatus).toEqual({
      OPEN: "OPEN",
      ACTIVE: "ACTIVE",
      RESOLVED: "RESOLVED",
    });
  });
});
