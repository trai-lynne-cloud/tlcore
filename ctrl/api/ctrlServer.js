const express = require('express');

// Import Routes 
const failureRoutes = require("./failureRoutes");
const incidentRoutes = require("./incidentRoutes");
const runtimeRoutes = require("./runtimeRoutes");

const app = express();

app.use(express.json());

// Handle GET request to root endpoint
app.get('/', (req, res) => {

    const message = '[TLCore] Control Server is running';
    console.log(message);
    res.status(200).json({
        message
    });
});

// Additional Routing 

app.use(failureRoutes);
app.use(incidentRoutes);
app.use(runtimeRoutes);

module.exports = app;