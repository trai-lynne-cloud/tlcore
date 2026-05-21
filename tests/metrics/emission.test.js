const emitMetric = require("../../shared/metrics/emitMetric");

// Check metric Emission

jest.mock("../../shared/metrics/emitMetric");

describe("Metric Emission", () => {
    it("should emit a metric with correct parameters", () => {
        const serviceId = "TestService";
        const metricType = "test_metric";
        const metricValue = 42;

        emitMetric(serviceId, metricType, metricValue);
        expect(emitMetric).toHaveBeenCalledWith(serviceId, metricType, metricValue);
    });
});