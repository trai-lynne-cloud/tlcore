const { storeMetric, getMetrics, clearMetrics } = require("../../../shared/metrics/metricStore");

describe("Metric Store", () => {
    beforeEach(() => {
        // reset module state between tests
        clearMetrics();
    });

    it("should store a metric", () => {
        const metric = {
            service_id: "TestService",
            metric_type: "test_metric",
            metric_value: 42,
            timestamp: 123
        };

        storeMetric(metric);

        const stored = getMetrics();

        expect(stored.length).toBe(1);
        expect(stored[0]).toEqual(metric);
    });

    it("should accumulate multiple metrics", () => {
        storeMetric({ service_id: "A", metric_type: "x", metric_value: 1 });
        storeMetric({ service_id: "A", metric_type: "y", metric_value: 2 });

        const stored = getMetrics();

        expect(stored.length).toBe(2);
    });

    it("should return a copy of stored metrics", () => {
        const result1 = getMetrics();
        result1.push({ fake: true });

        const result2 = getMetrics();

        expect(result2.find(m => m.fake)).toBeUndefined();
    });
});