# Runtime API

Base URL: `http://localhost:3000/api`

Runtime status represents logical intent. These operations do not start or stop service timers.

## Get status

`GET /api/runtime/status`

```json
{
  "message": "[TLCore] Runtime status retrieved successfully",
  "runtimeStatus": "STOPPED"
}
```

## Start

`POST /api/ctrl/runtime/start`

Sets status to `RUNNING`. Repeating the request is accepted and leaves the state unchanged.

## Stop

`POST /api/ctrl/runtime/stop`

Sets status to `STOPPED`. Repeating the request is accepted and leaves the state unchanged.

## Restart

`POST /api/ctrl/runtime/restart`

Performs a logical stop followed by start and returns `RUNNING`. It does not restart the Node.js process or service timers.

Successful command responses use HTTP 200 and include `message` and `runtimeStatus`.
