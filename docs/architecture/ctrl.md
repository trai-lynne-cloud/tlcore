# Control architecture

The control server is an Express application on port 3000. It converts HTTP requests into calls to the runtime, failure, and incident domains.

Routes are split by responsibility:

- `runtimeRoutes.js` manages logical runtime status;
- `failureRoutes.js` toggles failure flags; and
- `incidentRoutes.js` creates, transitions, and retrieves incidents.

The control layer performs request-level checks and translates thrown domain errors into HTTP 400 responses. It does not own domain state or execute service behavior.

The control and ingestion servers are separate Express applications. Metrics are accepted on port 3000. No authentication, authorization, rate limiting, or configurable port support is currently present.

Endpoint details are in the [API reference](../api/runtime.md).
