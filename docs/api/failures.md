# Failure API

Base URL: `http://localhost:3000`

Available flags are `latencySpike`, `queueBacklogSpike`, `cpuSpike`, and `failSpike`.

## Get failure state

`GET /fail-state`

Returns HTTP 200 with all flags and their current Boolean values.

## Enable a failure

`POST /ctrl/fail/trigger/:flag`

Returns HTTP 200 with a message and `currentFailState`. An unknown flag or a flag that is already enabled returns HTTP 400.

## Recover a failure

`POST /ctrl/fail/recover/:flag`

Returns HTTP 200 with a message and `currentFailState`. An unknown flag or a flag that is already disabled returns HTTP 400.

```bash
curl -X POST http://localhost:3000/ctrl/fail/trigger/cpuSpike
curl http://localhost:3000/fail-state
curl -X POST http://localhost:3000/ctrl/fail/recover/cpuSpike
```

Flags are global, process-local state and can affect more than one simulated service. See [Failure injection](../concepts/failure-injection.md).
