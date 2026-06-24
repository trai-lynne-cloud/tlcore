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

* Starts and manages all services
* Runs continuously in a loop
* Emits metrics at service-defined intervals

---

## Control Layer

TLCore includes a control API that manages both runtime execution state and failure injection state.

This layer introduces **system intent control** (start/stop/fail injection) without immediately altering runtime execution behavior.

---

### Supported Operations

#### Runtime Control

* Start runtime
* Stop runtime
* Query runtime status

#### Failure Control

* Enable failure modes
* Query failure state

---

### Runtime States

* **RUNNING** → system is logically active
* **STOPPED** → system is logically inactive

> Note: Runtime state currently represents system intent only. Services are not yet gated by runtime state.

---

### Failure States

Failure injection is controlled via boolean flags:

* `latencySpike`
* `queueBacklogSpike`
* `cpuSpike`
* `failSpike`

Each flag modifies runtime behavior when evaluated by services.

---

### Behavior

* Runtime state is stored in-memory and updated via control API
* Failure state is stored in-memory and updated via control API
* State updates are handled through dedicated controller layers
* Responses return structured JSON for observability and debugging
* Runtime execution is not yet conditionally halted (by design for current phase)

---

## Services

* **AuthService**

  * Simulates authentication latency

* **BillingService**

  * Simulates queue depth behavior

* **MonitoringService**

  * Simulates CPU utilization and system-level crash conditions

* **NotificationService**

  * Simulates queue depth, failure rates, and error conditions

---

## Telemetry Layer

TLCore runs as a single Node.js process where runtime services and the ingestion API share a common in-memory state.

---

## Metric System

All services emit structured metrics using a shared utility:

* service_id
* metric_type
* metric_value
* timestamp

Metrics represent real-time system behavior under normal and failure conditions and are persisted in-memory for runtime observability.

Metrics are evaluated using a rolling window strategy in downstream health processing.

---

### Schema Enforcement

Metrics are strictly validated before being converted into structured telemetry objects.

This ensures consistency across runtime services and future multi-language ingestion layers.

---

## Metric Storage System (In-Memory State)

TLCore maintains a centralized in-memory metric store that persists all emitted metrics during runtime execution.

All metrics emitted through runtime services or the ingestion API are stored in a single in-memory store within the Node process.

---

### Behavior

* Metrics are stored at runtime in a single shared memory space
* Both runtime services and API ingestion write to the same store
* Metrics persist for the lifetime of the Node process
* State is reset only on system restart

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

TLCore includes a real-time health evaluation layer that interprets live system metrics and converts them into a system-wide state.

The health engine continuously evaluates metrics stored in memory and determines overall system condition using a rolling window evaluation strategy.

---

### System States

* **HEALTHY** → System operating normally
* **DEGRADED** → Elevated latency, CPU usage, or error rates
* **FAILING** → Severe system instability detected
* **UNKNOWN** → Insufficient or missing metrics

---

### Evaluation Inputs

* `auth_latency`
* `cpu_utilization`
* `notification_fail_rate`

---

### Evaluation Strategy

Instead of using single metric points, the health engine:

* Maintains a rolling window of recent metrics per metric type
* Applies aggregation (average) over the window
* Uses aggregated values as inputs for threshold evaluation

This reduces noise and prevents transient spikes from immediately impacting system state.

---

### Runtime Behavior

* Health engine runs continuously alongside runtime services
* Reads from in-memory metric store
* Applies rolling window + aggregation before evaluation
* Computes system state at fixed intervals
* Outputs current stabilized system state

---

### Data Flow

Runtime Services
→ Metric Storage (in-memory)
→ Rolling Window Aggregation Layer
→ Health Evaluation Engine
→ System State (HEALTHY / DEGRADED / FAILING)

---

### Purpose

This layer introduces signal stabilization, ensuring system state reflects sustained behavior rather than transient fluctuations.

---

## State History System

TLCore maintains a bounded history of recent system states.

This allows the system to smooth transient instability and evaluate stability over time.

---

### Behavior

* Stores recent evaluated states
* Maintains a maximum history size (rolling buffer)
* Used to reduce oscillation in system state reporting

---

## Stable State Evaluation

A stability layer evaluates the history of recent system states.

---

### Logic

* If FAILING appears frequently → system is FAILING
* If DEGRADED dominates → system is DEGRADED
* Otherwise → system is HEALTHY

---

### Purpose

Prevents rapid flipping between states caused by short-lived metric spikes.

---

## State Transition System

TLCore records transitions between system states as structured events.

A transition is only recorded when the system state changes.

---

### Transition Object Structure

Each transition includes:

* `from` → previous system state
* `to` → new system state
* `timestamp` → ISO timestamp
* `metrics` → snapshot of recent metrics at time of transition

---

### Purpose

This introduces the first event-based layer in TLCore:

* Enables system change tracking
* Provides audit trail for state evolution
* Prepares system for incident detection

---

## Metric Ingestion API

### Endpoint

`POST /metrics`

### Description

Accepts metric submissions from runtime services or external clients and forwards them into the telemetry pipeline.

---

### Request Format

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 120
}
```

---

### Behavior

* Validates required fields at API boundary
* Rejects malformed requests with HTTP 400
* Forwards valid metrics into internal metric pipeline
* Produces structured telemetry objects via shared schema

---

## Failure Injection System

Failure injection is controlled via API-driven state mutation.

---

### Failure Flags

* `latencySpike` → increases authentication latency
* `queueBacklogSpike` → increases queue depth across services
* `cpuSpike` → increases CPU utilization in MonitoringService
* `failSpike` → enables system-wide instability simulation

---

### Behavior

* Failure state is stored in-memory
* Flags are toggled via control API
* Services will interpret flags during execution
* Enables controlled observability testing scenarios

---

## Crash Simulation

When `failSpike` is enabled, MonitoringService may randomly crash during execution.

This simulates real-world service instability where processes can terminate unexpectedly.

During development, runtime tooling (e.g. nodemon) may stop execution and require manual restart depending on configuration.

---

## Running the System

```bash
node index.js
```
