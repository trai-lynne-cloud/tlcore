const express = require('express');
const { getFailState, enableFailure } = require('../failure/failureController');
const router = express.Router();

// Handle GET request to /control/fail-state endpoint
router.get('/control/fail-state', (req, res) => {
    const failState = getFailState();

    res.status(200).json(failState)
});

// Handle POST request to /control/trigger/:flag 
router.post('/control/trigger/:flag', (req, res) => {
    const flag = req.params.flag;

    if (!flag || typeof flag !== "string") {
        return res.status(400).json({
            message: "Missing or invalid failure flag"
        });
    }

    try {

        let updatedFailState = enableFailure(flag)

        res.status(200).json({
            "message": "Failure state updated",
            "currentFailState": updatedFailState
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router;