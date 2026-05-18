const emitMetric = require("../../shared/utils/emitMetric");

// Check metric Emission

jest.mock("../../shared/utils/emitMetric");

describe("Metric Emission", () => {
    it("should emit a metric with correct parameters", () => {
        const serviceName = "TestService";
        const metricType = "test_metric";
        const value = 42;

        emitMetric(serviceName, metricType, value);
        expect(emitMetric).toHaveBeenCalledWith(serviceName, metricType, value);
    });
});