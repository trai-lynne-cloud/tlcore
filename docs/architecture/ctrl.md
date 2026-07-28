# CTRL Layer

## Purpose

The Control Layer provides HTTP APIs for coordinating system intent within TLCore.

Rather than implementing runtime, health, or incident business logic directly, the Control Layer delegates requests to the appropriate domain while providing a consistent external interface for interacting with the system.

---

## Responsibilities

The Control Layer is responsible for:

- Managing logical runtime state
- Coordinating failure injection
- Managing incident operations
- Exposing HTTP endpoints for external interaction

The Control Layer does not directly execute runtime services or perform health evaluation.

---

## Architecture

The Control Layer acts as the entry point for all external commands.

```text
HTTP Request
      ↓
Control Layer
      ↓
Domain Controller
      ↓
Runtime / Failure / Incident Domain
      ↓
Shared In-Memory Stores
```

---

## Supported Operations

### Runtime

- Start runtime
- Stop runtime
- Restart runtime
- Query runtime status

---

### Failure Injection

- Enable failure modes
- Disable failure modes
- Query current failure state

---

### Incident Operations

- Create synthetic incidents
- Transition incident lifecycle state
- Retrieve incidents
- Retrieve transition history

---

## Runtime Endpoints

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/ctrl/runtime/status`  | Retrieve runtime status         |
| POST   | `/ctrl/runtime/start`   | Set runtime state to `RUNNING`  |
| POST   | `/ctrl/runtime/stop`    | Set runtime state to `STOPPED`  |
| POST   | `/ctrl/runtime/restart` | Perform a logical runtime reset |

---

## Failure Injection Endpoints

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| GET    | `/ctrl/fail-state`         | Retrieve current failure flags |
| POST   | `/ctrl/fail/trigger/:flag` | Enable a failure mode          |
| POST   | `/ctrl/fail/recover/:flag` | Disable a failure mode         |

---

## Incident Endpoints

| Method | Endpoint                                 | Description                                       |
| ------ | ---------------------------------------- | ------------------------------------------------- |
| GET    | `/incidents`                             | Retrieve all incidents                            |
| GET    | `/incidents/transitions`                 | Retrieve all transition records                   |
| GET    | `/incidents/:incidentId/transitions`     | Retrieve transition history for a single incident |
| POST   | `/ctrl/incidents/trigger`                | Create a synthetic incident                       |
| POST   | `/ctrl/incidents/:incidentId/transition` | Transition an incident lifecycle state            |

---

## Control Flow

Each request follows the same processing model:

```text
Client
      ↓
HTTP Endpoint
      ↓
Validation
      ↓
Domain Controller
      ↓
State Update
      ↓
Response
```

The Control Layer validates requests and delegates processing to the owning domain. Business logic remains encapsulated within Runtime, Failure Injection, and Incident management components.

---

## Design Principles

The Control Layer follows several guiding principles:

- Business logic belongs to the owning domain.
- Controllers coordinate requests rather than implement system behavior.
- Runtime intent is separate from runtime execution.
- APIs provide a stable interface for interacting with TLCore.
- Shared state is modified only through domain-owned operations.
