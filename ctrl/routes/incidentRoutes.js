const express = require("express");
const {
  triggerIncident,
  getAllIncidents,
} = require("../../incidents/controller");
const transitionIncident = require("../../incidents/lifecycle");
const {
  getIncidentTransitionsByIncidentId,
  getIncidentTransitions,
} = require("../../incidents/store/incidentTransitionStore");

const router = express.Router();

// Queries

router.get("/incidents", (req, res) => {
  return res.status(200).json({
    message: "[TLCore] Incidents successfully retrieved",
    incidents: getAllIncidents(),
  });
});

router.get("/incidents/transitions", (req, res) => {
  const transitions = getIncidentTransitions();

  return res.status(200).json({
    message: "[TLCore] Incident transitions successfully retrieved",
    transitions,
  });
});

router.get("/incidents/:incidentId/transitions", (req, res) => {
  const incidentId = req.params.incidentId;

  const transitions = getIncidentTransitionsByIncidentId(incidentId);

  return res.status(200).json({
    message: "[TLCore] Incident transitions successfully retrieved",
    transitions,
  });
});

// Commands

router.post("/ctrl/incidents/trigger", (req, res) => {
  try {
    const incidentData = req.body;

    if (!incidentData || typeof incidentData !== "object") {
      return res.status(400).json({
        message: "Invalid incident payload",
      });
    }

    const newIncident = triggerIncident(incidentData);

    return res.status(201).json({
      message: `[TLCore][Incident] Triggered`,
      newIncident,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/ctrl/incidents/:incidentId/transition", (req, res) => {
  try {
    const nextStatus = req.body?.status;

    if (!nextStatus) {
      return res.status(400).json({ message: "Incident status is required" });
    }

    const incidentId = req.params.incidentId;

    const { incident, transition } = transitionIncident(incidentId, nextStatus);

    return res.status(200).json({
      message: `[TLCore][Incident] Lifecycle transition completed`,
      incident,
      transition,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
