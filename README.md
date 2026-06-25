# TLCore — Runtime Simulation Engine

TLCore is a lightweight runtime system that simulates multi-service behavior and controlled failure conditions for observability testing.

It is designed to model continuous service execution, metric emission, system incidents, and system degradation under controlled fault injection.

---

## Overview

TLCore runs a set of independent services that continuously emit synthetic metrics and can generate structured incident events under failure conditions.

Each service operates on its own interval and produces structured output representing system behavior over time.

A centralized in-memory state system controls runtime behavior, failure injection, and incident generation across all services.

---

## System Architecture

### Runtime Layer

* Starts and manages all services
* Runs continuously in a loop
* Emits metrics at service-defined intervals
* Can generate incident events during failures

---

## Control Layer

TLCore exposes a control API for managing:

* Runtime execution state
* Failure injection state
* Incident simulation

This layer provides **system intent control** (start/stop/restart/fail/recover/trigger incidents) without directly blocking runtime execution behavior.

---

### Supported Operations

#### Runtime Control

* Start runtime
* Stop runtime
* Restart runtime
* Query runtime status

#### Failure Control

* Enable failure modes (trigger)
* Disable failure modes (recover)
* Query failure state

#### Incident Control

* Trigger synthetic incidents
* Query incident history

---

## Runtime States

* **RUNNING** → system is logically active
* **STOPPED** → system is logically inactive

> Note: Runtime state represents system intent only. Services are not yet gated by runtime state.

---

## Failure States

Failure injection is controlled via boolean flags:

* `latencySpike`
* `queueBacklogSpike`
* `cpuSpike`
* `failSpike`

Each flag modifies runtime behavior when evaluated by services.

---

## Incident Model (Issue 14)

TLCore includes a structured incident data model representing system failure events.

### Incident Schema

Each incident includes:

* `service_id` → service generating the incident
* `severity` → severity level of incident
* `start_time` → ISO timestamp of incident creation

### Behavior

* Incidents are created in-memory only
* Incidents are immutable once created
* Incidents are stored in a centralized incident store
* Incidents can be retrieved via API
* All incidents follow a consistent schema across the system

---

## Control API Endpoints

### Runtime Control

* `GET /ctrl/runtime/status`
* `POST /ctrl/runtime/start`
* `POST /ctrl/runtime/stop`
* `POST /ctrl/runtime/restart`

---

### Failure Control

* `GET /ctrl/fail-state`
* `POST /ctrl/fail/trigger/:flag`
* `POST /ctrl/fail/recover/:flag`

---

### Incident Control

* `GET /incidents` → retrieve all incidents
* `POST /ctrl/incidents/trigger` → create new incident

---

## Behavior Model

* Runtime state is stored in-memory
* Failure state is stored in-memory
* Incident state is stored in-memory
* All state updates go through controller layers
* Failure system supports activation + recovery
* Incident system supports creation + retrieval
* Runtime execution is not yet conditionally halted (by design)
* Restart is a logical runtime reset, not process lifecycle management

---

## Services

* **AuthService**

  * Simulates authentication latency

* **BillingService**

  * Simulates queue depth behavior

* **MonitoringService**

  * Simulates CPU utilization and crash conditions

* **NotificationService**

  * Simulates queue depth, failure rates, and error conditions

---

## Telemetry Layer

TLCore runs as a single Node.js process where runtime services, metrics, and incidents share a common in-memory state.

---

## Metric System

All services emit structured metrics using a shared utility:

* service_id
* metric_type
* metric_value
* timestamp

Metrics represent real-time system behavior under normal and failure conditions.

They are persisted in-memory.

Metrics are evaluated using a rolling window strategy in downstream health processing.

---

## Metric Storage System

TLCore maintains a centralized in-memory metric store that persists all emitted metrics.

### Behavior

* Shared memory space for all metrics
* Runtime services and API ingestion write to same store
* Metrics persist for lifetime of process
* Reset only occurs on restart

---

## System Health Evaluation Engine

* Uses rolling window of metrics
* Applies aggregation (average)
* Prevents transient spikes from triggering instability
* Produces stabilized system state

---

## State History System

* Stores recent system states in bounded memory
* Prevents oscillation in system state reporting

---

## Stable State Evaluation

* FAILING dominant → FAILING
* DEGRADED dominant → DEGRADED
* Otherwise → HEALTHY

---

## State Transition System

* Transitions recorded only when system state changes
* Each includes:

  * from
  * to
  * timestamp
  * metrics snapshot

---

## Incident System

### Behavior

* Incidents are generated via control API
* Validated before creation
* Stored in-memory for inspection
* Used for failure simulation and observability testing

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

* Validates required fields
* Rejects malformed requests (HTTP 400)
* Emits structured telemetry objects

---

## Failure Injection System

### Behavior

* Flags toggled via control API
* Interpreted at runtime by services
* Supports activation and recovery cycles

---

### Failure Flags

* `latencySpike` → increases auth latency
* `queueBacklogSpike` → increases queue depth
* `cpuSpike` → increases CPU usage
* `failSpike` → enables system-wide instability

---

## Crash Simulation

When `failSpike` is enabled, MonitoringService may randomly crash.

---

## Running the System

```bash
node index.js
```
