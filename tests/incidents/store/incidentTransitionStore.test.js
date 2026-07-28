const {
  storeIncidentTransition,
  getIncidentTransitions,
  getIncidentTransitionsByIncidentId,
  clearIncidentTransitionStore,
} = require("../../../incidents/store/incidentTransitionStore");

describe("Incident Transition Store", () => {
  beforeEach(() => {
    clearIncidentTransitionStore();
  });

  test("should store and retrieve all incident transitions", () => {
    const transition1 = {
      incident_id: "incident-1",
      previous_status: "OPEN",
      next_status: "ACTIVE",
      transition_time: new Date().toISOString(),
    };

    const transition2 = {
      incident_id: "incident-2",
      previous_status: "OPEN",
      next_status: "ACTIVE",
      transition_time: new Date().toISOString(),
    };

    storeIncidentTransition(transition1);
    storeIncidentTransition(transition2);

    const transitions = getIncidentTransitions();

    expect(transitions).toHaveLength(2);
    expect(transitions).toContainEqual(transition1);
    expect(transitions).toContainEqual(transition2);
  });

  test("should retrieve all transitions for an incident ID", () => {
    const transition1 = {
      incident_id: "incident-1",
      previous_status: "OPEN",
      next_status: "ACTIVE",
      transition_time: new Date().toISOString(),
    };

    const transition2 = {
      incident_id: "incident-1",
      previous_status: "ACTIVE",
      next_status: "RESOLVED",
      transition_time: new Date().toISOString(),
    };

    const transition3 = {
      incident_id: "incident-2",
      previous_status: "OPEN",
      next_status: "ACTIVE",
      transition_time: new Date().toISOString(),
    };

    storeIncidentTransition(transition1);
    storeIncidentTransition(transition2);
    storeIncidentTransition(transition3);

    const transitions = getIncidentTransitionsByIncidentId("incident-1");

    expect(transitions).toHaveLength(2);
    expect(transitions).toContainEqual(transition1);
    expect(transitions).toContainEqual(transition2);
  });

  test("should return an empty array when an incident has no transitions", () => {
    const transitions = getIncidentTransitionsByIncidentId("missing-incident");

    expect(transitions).toEqual([]);
  });
});
