const {
  storeIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  clearIncidentStore,
} = require("../../../incidents/store/incidentStore");
const incidentStatus = require("../../../incidents/schema/incidentStatus");

describe("Incident Store", () => {
  beforeEach(() => {
    clearIncidentStore();
  });

  test("should store and retrieve all incidents", () => {
    const incident1 = {
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    };
    const incident2 = {
      incident_id: "incident-2",
      status: incidentStatus.ACTIVE,
    };

    storeIncident(incident1);
    storeIncident(incident2);

    const incidents = getIncidents();

    expect(incidents).toHaveLength(2);
    expect(incidents).toContainEqual(incident1);
    expect(incidents).toContainEqual(incident2);
  });

  test("should retrieve an incident by ID", () => {
    const incident = {
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    };

    storeIncident(incident);

    const retrievedIncident = getIncidentById("incident-1");

    expect(retrievedIncident).toEqual(incident);
  });

  test("should update the status of an incident", () => {
    const incident = {
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    };

    storeIncident(incident);

    const updatedIncident = updateIncidentStatus(
      "incident-1",
      incidentStatus.ACTIVE,
    );

    expect(updatedIncident).toHaveProperty("incident_id", "incident-1");

    expect(updatedIncident).toHaveProperty("status", incidentStatus.ACTIVE);

    const retrievedIncident = getIncidentById("incident-1");

    expect(retrievedIncident.status).toBe(incidentStatus.ACTIVE);
  });

  test("should return null when updating a non-existent incident", () => {
    const result = updateIncidentStatus(
      "non-existent-id",
      incidentStatus.ACTIVE,
    );
    expect(result).toBeNull();
  });

  test("should return undefined when an incident ID is not found", () => {
    const incident = getIncidentById("missing-incident");

    expect(incident).toBeUndefined();
  });
});
