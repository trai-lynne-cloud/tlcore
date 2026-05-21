# TLCore — Runtime Simulation Engine

TLCore is a lightweight runtime system that simulates multi-service behavior and controlled failure conditions for observability testing.

It is designed to model continuous service execution, metric emission, and system degradation under controlled fault injection.

---

## Overview

TLCore runs a set of independent services that continuously emit synthetic metrics.

Each service operates on its own interval and produces structured output representing system behavior over time.

A centralized in-memory state system controls failure injection behavior across all services.

---

## System Architecture

### Runtime Engine
- Starts and manages all services
- Runs continuously in a loop
- Emits metrics at service-defined intervals

---

### Services

- **AuthService**
  - Simulates authentication latency

- **BillingService**
  - Simulates queue depth behavior

- **MonitoringService**
  - Simulates CPU utilization and system-level crash conditions

- **NotificationService**
  - Simulates queue depth, failure rates, and error conditions

---

### Runtime Model

TLCore runs as a single Node.js process where runtime services and the ingestion API share a common in-memory state.

---

## Metric System

All services emit structured metrics using a shared utility:

- service_id
- metric_type
- metric_value
- timestamp

Metrics represent real-time system behavior under normal and failure conditions and are persisted in-memory for runtime observability.

### Schema Enforcement

Metrics are strictly validated before being converted into structured telemetry objects. This ensures consistency across runtime services and future multi-language ingestion layers.

---

## Metric Storage System (In-Memory State)

TLCore now maintains a centralized in-memory metric store that persists all emitted metrics during runtime execution.

All metrics emitted through runtime services or the ingestion API are stored in a single in-memory store within the Node process.

### Behavior

- Metrics are stored at runtime in a single shared memory space
- Both runtime services and API ingestion write to the same store
- Metrics persist for the lifetime of the Node process
- State is reset only on system restart

### Data Flow

runtime services / API ingestion  
→ emitMetric  
→ validateMetric  
→ createMetric  
→ storeMetric  
→ in-memory metricStore  

### Retrieval (Debug Only)

A temporary debug endpoint allows inspection of live system state during development:

- GET /metrics/debug  
  Returns current in-memory metrics (development only)

This endpoint is not intended for production use and may be removed in later issues.

---

## Metric Ingestion API

### Endpoint

`POST /metrics`

### Description

Accepts metric submissions from runtime services or external clients and forwards them into the telemetry pipeline.

### Request Format

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 120
}
```

### Behavior

- Validates required fields at the API boundary
- Rejects malformed requests with HTTP 400
- Forwards valid metrics into the internal metric pipeline (emitMetric)
- Produces structured telemetry objects via shared schema

---

## Failure Injection System

TLCore includes a centralized failure injection state that controls system-wide behavior.

### Failure Flags

- `latencySpike`
  - Increases authentication latency

- `queueBacklogSpike`
  - Increases queue depth across services

- `cpuSpike`
  - Increases CPU utilization in MonitoringService

- `failSpike`
  - Enables system-wide failure mode including:
    - error rate spikes
    - simulated service failures
    - occasional runtime crashes

---

## Crash Simulation

When `failSpike` is enabled, MonitoringService may randomly crash during execution.

This simulates real-world service instability where processes can terminate unexpectedly.

During development, the runtime environment (e.g. nodemon) may stop execution on crash and may require manual restart depending on configuration.

---

## Running the System

```bash
node index.js