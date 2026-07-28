# Incidents API

Base URL: `http://localhost:3000`

## Create an incident

`POST /ctrl/incidents/trigger`

```json
{ "service_id": "AuthService", "severity": "S1" }
```

Valid severities are `S0`, `S1`, `S2`, `S3`, and the test-only value `test`. Success returns HTTP 201 with the created incident. Invalid input returns HTTP 400 with a `message`.

## List incidents

`GET /incidents`

Returns HTTP 200 with `message` and `incidents` fields.

## Transition an incident

`POST /ctrl/incidents/:incidentId/transition`

```json
{ "status": "ACTIVE" }
```

Only `OPEN → ACTIVE → RESOLVED` is allowed. Success returns HTTP 200 with the updated `incident` and the new `transition`. Missing status, an unknown ID, or an invalid transition returns HTTP 400.

## List transition history

- `GET /incidents/transitions` returns all transition records.
- `GET /incidents/:incidentId/transitions` returns records for one incident. An unknown ID produces an empty array.
