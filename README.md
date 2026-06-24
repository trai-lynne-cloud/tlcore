# TLCore — Runtime Simulation Engine

TLCore is a lightweight runtime system that simulates multi-service behavior and controlled failure conditions for observability testing.

It is designed to model continuous service execution, metric emission, and system degradation under controlled fault injection.

---

## Overview

TLCore runs a set of independent services that continuously emit synthetic metrics.

Each service operates on its own interval and produces structured output representing system behavior over time.

A centralized in-memory state system controls runtime behavior and failure injection across all services.

---

## System Architecture

### Runtime Layer

- Starts and manages all services
- Runs continuously in a loop
- Emits metrics at service-defined intervals

---

## Control Layer

TLCore exposes a control API for managing:

- Runtime execution state
- Failure injection state

This layer provides **system intent control** (start/stop/fail/recover) without directly blocking runtime execution behavior (for this phase).

---

### Supported Operations

#### Runtime Control

- Start runtime
- Stop runtime
- Query runtime status

#### Failure Control

- Enable failure modes (trigger)
- Disable failure modes (recover)
- Query failure state

---

## Runtime States

- **RUNNING** → system is logically active
- **STOPPED** → system is logically inactive

> Note: Runtime state represents system intent only. Services are not yet gated by runtime state.

---

## Failure States

Failure injection is controlled via boolean flags:

- `latencySpike`
- `queueBacklogSpike`
- `cpuSpike`
- `failSpike`

Each flag modifies runtime behavior when evaluated by services.

---

## Control API Endpoints

### Runtime Control

- `GET /ctrl/runtime/status`
- `POST /ctrl/runtime/start`
- `POST /ctrl/runtime/stop`

---

### Failure Control

- `GET /control/fail-state`
- `POST /ctrl/fail/trigger/:flag`
  - Enables a failure flag
- `POST /ctrl/fail/recover/:flag`
  - Disables (recovers) a failure flag

---

### Failure Behavior Rules

- Invalid flags → return `400 error`
- Already enabled flag → error thrown
- Already disabled flag → error thrown
- All state changes are in-memory only
- Responses return structured JSON for observability

---

## Behavior Model

- Runtime state is stored in-memory
- Failure state is stored in-memory
- State updates go through controller layers
- Failure state now supports BOTH:
  - activation (trigger)
  - recovery (disable)
- Runtime execution is not yet conditionally halted (by design)

---

## Services

- **AuthService**
  - Simulates authentication latency

- **BillingService**
  - Simulates queue depth behavior

- **MonitoringService**
  - Simulates CPU utilization and crash conditions

- **NotificationService**
  - Simulates queue depth, failure rates, and error conditions

---

## Telemetry Layer

TLCore runs as a single Node.js process where runtime services and the ingestion API share a shared in-memory state.

---

## Metric System

All services emit structured metrics using a shared utility:

- service_id
- metric_type
- metric_value
- timestamp

Metrics represent real-time system behavior under normal and failure conditions.

They are persisted in-memory for runtime observability.

Metrics are evaluated using a rolling window strategy in downstream health processing.

---

### Schema Enforcement

Metrics are validated before being converted into structured telemetry objects.

This ensures consistency across runtime services and future ingestion layers.

---

## Metric Storage System (In-Memory State)

TLCore maintains a centralized in-memory metric store that persists all emitted metrics during runtime execution.

---

### Behavior

- Metrics stored in a single shared memory space
- Runtime services and API ingestion write to the same store
- Metrics persist for the lifetime of the Node process
- State resets only on restart

---

### Data Flow

runtime services / API ingestion  
→ emitMetric  
→ validateMetric  
→ createMetric  
→ storeMetric  
→ in-memory metricStore  

---

## System Health Evaluation Engine

TLCore includes a real-time health evaluation layer that converts metrics into system-wide state.

---

### System States

- HEALTHY
- DEGRADED
- FAILING
- UNKNOWN

---

### Evaluation Strategy

- Uses rolling window of metrics
- Applies aggregation (average)
- Prevents transient spikes from triggering instability

---

### Runtime Behavior

- Runs continuously alongside services
- Reads from in-memory metric store
- Produces stabilized system state

---

### Data Flow

Runtime Services  
→ Metric Storage  
→ Rolling Window Aggregation  
→ Health Evaluation Engine  
→ System State

---

## State History System

- Stores recent system states in bounded memory
- Prevents oscillation in system state reporting

---

## Stable State Evaluation

- FAILING dominant → FAILING
- DEGRADED dominant → DEGRADED
- Otherwise → HEALTHY

---

## State Transition System

Transitions are recorded only when system state changes.

Each transition includes:

- from
- to
- timestamp
- metrics snapshot

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
````

### Behavior

* Validates required fields
* Rejects malformed requests (HTTP 400)
* Emits structured telemetry objects

---

## Failure Injection System

Failure injection is controlled via API-driven state mutation.

---

### Failure Flags

* `latencySpike` → increases auth latency
* `queueBacklogSpike` → increases queue depth
* `cpuSpike` → increases CPU usage
* `failSpike` → enables system-wide instability

---

### Behavior

* Flags are toggled via control API
* Failure state is interpreted by services at runtime
* Supports both activation and recovery cycles

---

## Crash Simulation

When `failSpike` is enabled, MonitoringService may randomly crash.

This simulates real-world instability where processes terminate unexpectedly.

---

## Running the System

```bash
node index.js
```
