const express = require('express');
const {
  triggerIncident,
  getAllIncidents,
} = require('../incidents/incidentController');

const router = express.Router();

router.get('/incidents', (req, res) => {
  res.status(200).json({
    message: "[TLCore] Incidents successfully retrieved",
    incidents: getAllIncidents()
  });
});

router.post('/ctrl/incidents/trigger', (req, res) => {
  try {
    const incidentData = req.body;

    if (!incidentData || typeof incidentData !== "object") {
      return res.status(400).json({
        message: "Invalid incident payload"
      });
    }

    const newIncident = triggerIncident(incidentData);

    res.status(200).json({
      message: `[TLCore][Incident] Triggered`,
      newIncident
    });


  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router;