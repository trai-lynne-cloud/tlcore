const { createMetric } = require("../../../shared/schemas/metric");

// check required fields

describe("Metric Creation", () => {
  it("should create a metric with required fields", () => {
    const metric = createMetric("TestService", "test_metric", 42);
    expect(metric).toHaveProperty("service_id", "TestService");
    expect(metric).toHaveProperty("metric_type", "test_metric");
    expect(metric).toHaveProperty("metric_value", 42);
    expect(metric).toHaveProperty("timestamp");
  });
});

// Check metric key-value types

describe("Metric Key-Value Types", () => {
  it("should create a metric with correct key-value types", () => {
    const metric = createMetric("TestService", "test_metric", 42);
    expect(typeof metric.service_id).toBe("string");
    expect(typeof metric.metric_type).toBe("string");
    expect(typeof metric.metric_value).toBe("number");
    expect(typeof metric.timestamp).toBe("string");
  });
});
