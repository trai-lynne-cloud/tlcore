const express = require("express");

// Import Routes
const failureRoutes = require("./routes/failureRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const runtimeRoutes = require("./routes/runtimeRoutes");
const metricIngestionRoutes = require("./routes/metricIngestionRoutes");

const app = express();

app.use(express.json());

// Handle GET request to root endpoint
app.get("/", (req, res) => {
  const message = "[TLCore] Control Server is running";
  console.log(message);
  res.status(200).json({
    message,
  });
});

// Additional Routing

app.use("/api", failureRoutes);
app.use("/api", incidentRoutes);
app.use("/api", runtimeRoutes);
app.use("/api", metricIngestionRoutes);

module.exports = app;
