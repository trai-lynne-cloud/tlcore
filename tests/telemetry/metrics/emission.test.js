const emitMetric = require("../../../telemetry/metrics/emitMetric");

// Check metric Emission

jest.mock("../../../telemetry/metrics/emitMetric");

describe("Metric Emission", () => {
  it("should emit a metric with correct parameters", () => {
    const serviceId = "TestService";
    const metricType = "test_metric";
    const metricValue = 42;

    emitMetric(serviceId, metricType, metricValue);
    expect(emitMetric).toHaveBeenCalledWith(serviceId, metricType, metricValue);
  });
});
