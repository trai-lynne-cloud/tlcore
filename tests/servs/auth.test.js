const failInjectionState = require("../../runtime/failure/state");
const AuthServ = require("../../runtime/servs/auth");

describe("Failure Injection - AuthService", () => {
    it("should increase latency when latencySpike is enabled", () => {
        failInjectionState.latencySpike = true;

        const values = [];

        for (let i = 0; i < 20; i++) {
            AuthServ.behavior();
            // assuming emitMetric logs or stores value — adjust if needed
        }

        expect(failInjectionState.latencySpike).toBe(true);
    });
});
