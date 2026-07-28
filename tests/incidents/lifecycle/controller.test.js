const transitionIncident = require("../../../incidents/lifecycle");

const {
  storeIncident,
  getIncidentById,
  clearIncidentStore,
} = require("../../../incidents/store/incidentStore");

const {
  getIncidentTransitionsByIncidentId,
  clearIncidentTransitionStore,
} = require("../../../incidents/store/incidentTransitionStore");

const incidentStatus = require("../../../incidents/schema/incidentStatus");

describe("Incident Lifecycle Controller", () => {
  beforeEach(() => {
    clearIncidentStore();
    clearIncidentTransitionStore();
  });

  test("should transition an incident from OPEN to ACTIVE", () => {
    const incident = {
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    };

    storeIncident(incident);

    const result = transitionIncident("incident-1", incidentStatus.ACTIVE);

    expect(result.incident).toEqual({
      incident_id: "incident-1",
      status: incidentStatus.ACTIVE,
    });

    expect(result.transition).toMatchObject({
      incident_id: "incident-1",
      previous_status: incidentStatus.OPEN,
      next_status: incidentStatus.ACTIVE,
    });

    expect(result.transition.transition_time).toEqual(expect.any(String));
  });

  test("should persist the updated incident status", () => {
    storeIncident({
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    });

    transitionIncident("incident-1", incidentStatus.ACTIVE);

    const storedIncident = getIncidentById("incident-1");

    expect(storedIncident.status).toBe(incidentStatus.ACTIVE);
  });

  test("should record the incident transition", () => {
    storeIncident({
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    });

    transitionIncident("incident-1", incidentStatus.ACTIVE);

    const transitions = getIncidentTransitionsByIncidentId("incident-1");

    expect(transitions).toHaveLength(1);

    expect(transitions[0]).toMatchObject({
      incident_id: "incident-1",
      previous_status: incidentStatus.OPEN,
      next_status: incidentStatus.ACTIVE,
    });
  });

  test("should throw when the incident does not exist", () => {
    expect(() => {
      transitionIncident("missing-incident", incidentStatus.ACTIVE);
    }).toThrow("Invalid incident id: missing-incident");
  });

  test("should throw when the requested status is invalid", () => {
    storeIncident({
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    });

    expect(() => {
      transitionIncident("incident-1", "PAUSED");
    }).toThrow("Invalid status: PAUSED");
  });

  test("should reject an invalid incident transition", () => {
    storeIncident({
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    });

    expect(() => {
      transitionIncident("incident-1", incidentStatus.RESOLVED);
    }).toThrow("Invalid incident transition: OPEN to RESOLVED");
  });

  test("should transition an incident through its full lifecycle", () => {
    storeIncident({
      incident_id: "incident-1",
      status: incidentStatus.OPEN,
    });

    transitionIncident("incident-1", incidentStatus.ACTIVE);

    transitionIncident("incident-1", incidentStatus.RESOLVED);

    const incident = getIncidentById("incident-1");

    const transitions = getIncidentTransitionsByIncidentId("incident-1");

    expect(incident.status).toBe(incidentStatus.RESOLVED);

    expect(transitions).toHaveLength(2);

    expect(transitions[0]).toMatchObject({
      previous_status: incidentStatus.OPEN,
      next_status: incidentStatus.ACTIVE,
    });

    expect(transitions[1]).toMatchObject({
      previous_status: incidentStatus.ACTIVE,
      next_status: incidentStatus.RESOLVED,
    });
  });
});
