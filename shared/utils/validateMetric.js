function validateMetric(serviceId, metricType, metricValue) {
    if (!serviceId || !metricType || metricValue === undefined) {
        throw new Error("Invalid metric: Missing required fields");
    }

    if (typeof serviceId !== "string") {
        throw new Error("Invalid metric: service_id must be a string");
    }

    if (typeof metricType !== "string") {
        throw new Error("Invalid metric: metric_type must be a string");
    }

    if (typeof metricValue !== "number") {
        throw new Error("Invalid metric: metric_value must be a number");
    }

    return true;
}

module.exports = validateMetric;