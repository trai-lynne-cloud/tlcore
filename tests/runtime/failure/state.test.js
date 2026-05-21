const failInjectionState = require("../../../runtime/failure/state");
describe("Failure State", () => {
    it("should toggle latencySpike flag", () => {
        failInjectionState.latencySpike = false;
        failInjectionState.latencySpike = !failInjectionState.latencySpike;

        expect(failInjectionState.latencySpike).toBe(true);
    });
});