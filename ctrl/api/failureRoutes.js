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
    try {
        const flag = req.params.flag

        let failState = enableFailure(flag)

        res.status(200).json({
            "message": "Failure state updated",
            "currentFailState": failState
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router;