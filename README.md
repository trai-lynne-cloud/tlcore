# TLCore — Distributed Systems Laboratory

TLCore is a lightweight distributed systems laboratory for simulating multi-service behavior, observability workflows, and controlled failure conditions.

It models continuous service execution, telemetry generation, health evaluation, incident lifecycle management, and failure injection within a single Node.js process.

---

## Overview

TLCore runs a set of independent services that continuously emit telemetry and can generate structured incident events through manual control or automatically from sustained system degradation.

Each service operates on its own interval and produces structured output representing system behavior over time.

Centralized in-memory stores coordinate runtime intent, failure injection, telemetry, health evaluation, and incident management across the system.

---

## System Architecture

TLCore is organized into domain-driven modules that separate runtime execution, telemetry processing, health evaluation, incident management, and control operations.

### Runtime

- Initializes and manages all runtime services
- Executes services on independent intervals
- Simulates continuous system behavior
- Produces telemetry consumed by downstream systems

### Telemetry

- Collects structured telemetry emitted by runtime services
- Retains telemetry in a centralized in-memory store
- Provides telemetry for health evaluation and observability

### Health

- Evaluates telemetry using rolling-window analysis
- Determines the current system health state
- Detects sustained degradation
- Triggers automatic incident generation

### Incidents

- Manages incident creation and lifecycle transitions
- Stores incident and transition history
- Supports manual and automatic incident generation

### Control

- Exposes APIs for runtime, failure, and incident management
- Coordinates system intent without directly implementing business logic

---

## Control Layer

The Control Layer exposes HTTP APIs for managing system intent.

Supported control operations include:

- Runtime execution
- Failure injection
- Incident lifecycle operations

The Control Layer coordinates requests by delegating work to the appropriate domain without directly implementing runtime, health, or incident business logic.

---

### Supported Operations

#### Runtime Control

- Start runtime
- Stop runtime
- Restart runtime
- Query runtime status

#### Failure Injection

- Enable failure modes (trigger)
- Disable failure modes (recover)
- Query failure state

#### Incident Control

- Trigger synthetic incidents manually
- Transition incident status
- Query incident history
- Query incident transitions

---

## Runtime States

- **RUNNING** → System is logically active
- **STOPPED** → System is logically inactive

> **Note:** Runtime state represents system intent. Runtime services currently execute independently of the logical runtime state.

---

## Failure States

Failure injection is controlled through independent boolean flags:

- `latencySpike`
- `queueBacklogSpike`
- `cpuSpike`
- `failSpike`

Each flag is evaluated by runtime services to simulate specific failure conditions.

---

## Incident Model

TLCore includes a structured incident model representing system failure events and their lifecycle.

### Incident Schema

Each incident includes:

- `incident_id` → unique incident identifier
- `service_id` → service associated with the incident
- `severity` → incident severity level
- `status` → current lifecycle state
- `start_time` → ISO timestamp of incident creation

### Behavior

- Incidents are stored in a centralized in-memory incident store
- Incidents progress through a defined lifecycle
- Status transitions are recorded separately from incident records
- Incidents can be created manually or automatically
- Incident data is accessible through the Control API
- All incidents follow a consistent schema across the system

---

## Control API Endpoints

### Runtime

- `GET /ctrl/runtime/status`
- `POST /ctrl/runtime/start`
- `POST /ctrl/runtime/stop`
- `POST /ctrl/runtime/restart`

---

### Failure Injection

- `GET /ctrl/fail-state`
- `POST /ctrl/fail/trigger/:flag`
- `POST /ctrl/fail/recover/:flag`

---

### Incidents

- `GET /incidents` → Retrieve all incidents
- `GET /incidents/transitions` → Retrieve all incident transitions
- `GET /incidents/:incidentId/transitions` → Retrieve transition history for an incident
- `POST /ctrl/incidents/trigger` → Manually create a synthetic incident
- `POST /ctrl/incidents/:incidentId/transition` → Transition an incident to a new lifecycle state

---

## Behavior Model

- Runtime state is stored in-memory
- Failure injection state is stored in-memory
- Incident state is stored in-memory
- State changes are coordinated through their owning domains
- Failure injection supports activation and recovery
- Incident generation supports both manual and automatic creation
- Sustained degradation is continuously evaluated by the health evaluation pipeline
- Runtime execution is intentionally independent of logical runtime state
- Runtime restart performs a logical state reset rather than process lifecycle management

---

## Services

- **AuthService**
  - Simulates authentication latency (`auth_latency`)

- **BillingService**
  - Simulates billing queue depth (`billing_queue_depth`)

- **MonitoringService**
  - Simulates CPU utilization (`cpu_utilization`)

- **NotificationService**
  - Simulates notification queue depth and failure rate (`notification_queue_depth`, `notification_fail_rate`)

---

## Runtime Model

TLCore runs as a single Node.js process where runtime services, telemetry, health evaluation, and incident management operate through shared in-memory stores.

---

## Metric System

Runtime services emit structured metrics through a shared telemetry utility.

Each metric includes:

- `service_id`
- `metric_type`
- `metric_value`
- `timestamp`

Metrics represent real-time system behavior under both normal and failure conditions.

Metrics are stored in a centralized in-memory telemetry store and evaluated using a rolling-window strategy within the health evaluation pipeline.

### Example

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 42,
  "timestamp": "2026-07-28T19:00:00.000Z"
}
```

---

## Metric Storage System

TLCore maintains a centralized in-memory telemetry store that retains all emitted metrics for the lifetime of the runtime process.

### Behavior

- Shared in-memory store for all metrics
- Runtime services and API ingestion write to the same store
- Metrics remain available for downstream health evaluation
- Metric data remains available for the lifetime of the process
- Store is cleared when the runtime process restarts

---

## Health Evaluation Engine

The Health Evaluation Engine continuously evaluates emitted metrics to determine the current operational state of the system.

### Behavior

- Uses rolling window aggregation
- Applies threshold-based health evaluation
- Produces stabilized system state
- Records system state transitions
- Evaluates sustained degradation
- Automatically triggers incident generation for sustained degradation

---

## State History System

The State History System maintains recent health evaluation results and transition records for inspection and downstream analysis.

### Behavior

- Stores recent health evaluation results in bounded memory
- Provides historical context for stable state evaluation
- Records health transitions when the system state changes

---

## Stable State Evaluation

The Health Evaluation Engine determines the current system state using the dominant health classification within the rolling evaluation window.

- **FAILING** dominant → **FAILING**
- **DEGRADED** dominant → **DEGRADED**
- Otherwise → **HEALTHY**

---

## State Transition System

Health state transitions are recorded only when the evaluated system state changes.

Each transition includes:

- `from`
- `to`
- `timestamp`
- `metrics_snapshot`

---

## Sustained Degradation Detection

TLCore continuously evaluates stabilized system state to determine whether degradation has persisted long enough to warrant incident generation.

### Detection Rules

- Only `DEGRADED` and `FAILING` states are monitored
- A degradation timer starts when the first unhealthy state is observed
- Returning to `HEALTHY` or `UNKNOWN` clears the degradation timer
- Incidents are created only after the configured degradation threshold has been exceeded

### Duplicate Prevention

To prevent repeated incident creation:

- Only one degradation incident may exist for a continuous degradation period
- Recovery resets the degradation tracking state, allowing future degradation periods to generate new incidents

### Processing Flow

```text
Runtime Services
      ↓
Telemetry Store
      ↓
Health Evaluation
      ↓
Stable State Evaluation
      ↓
State Transition System
      ↓
Sustained Degradation Detection
      ↓
Incident Generation
```

---

## Incident System

### Behavior

- Incidents may be generated manually through the Control API
- Incidents may be generated automatically through sustained degradation detection
- All incidents are validated before creation
- Incidents are managed through a defined lifecycle
- Incident transitions are recorded independently from incident records
- Incident data is stored in-memory for observability testing and inspection

---

## Metric Ingestion API

### Endpoint

`POST /metrics`

### Request

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 120
}
```

### Behavior

- Validates required fields
- Rejects malformed requests with `HTTP 400`
- Creates structured telemetry objects using the shared metric schema
- Stores emitted metrics in the centralized in-memory telemetry store
- Automatically assigns metric timestamps during ingestion

---

## Failure Injection System

### Behavior

- Failure modes are enabled and disabled through the Control API
- Runtime services evaluate active failure flags during execution
- Supports activation and recovery cycles

---

### Failure Flags

- `latencySpike` → Increases simulated authentication latency
- `queueBacklogSpike` → Increases simulated queue depth
- `cpuSpike` → Increases simulated CPU utilization
- `failSpike` → Increases simulated system instability

---

## Crash Simulation

When `failSpike` is enabled, `MonitoringService` may randomly terminate to simulate runtime instability.

---

## Running the System

Install dependencies:

```bash
npm install
```

Start the runtime:

```bash
npm start
```

Once running, the runtime services begin emitting telemetry, the Health Evaluation Engine continuously evaluates system health, and the Control API becomes available for runtime, failure injection, and incident operations.
