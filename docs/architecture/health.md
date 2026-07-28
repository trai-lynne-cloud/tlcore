# Health Evaluation

## Purpose

The Health domain continuously evaluates runtime telemetry to determine the current operational state of the system.

Rather than reacting to individual metrics, health is determined through rolling-window analysis, stable state evaluation, and sustained degradation detection. This approach reduces noise while providing a consistent view of overall system health.

---

## Responsibilities

The Health domain is responsible for:

- Evaluating emitted telemetry
- Applying threshold-based classification
- Producing stabilized health states
- Recording state transitions
- Detecting sustained degradation
- Triggering automatic incident generation

---

## Evaluation Pipeline

Health evaluation follows a continuous processing pipeline.

```text
Telemetry Store
      ↓
Rolling Window Aggregation
      ↓
Threshold Evaluation
      ↓
Stable State Evaluation
      ↓
State Transition Recording
      ↓
Sustained Degradation Detection
      ↓
Incident Generation
```

Each stage produces input for the next stage while remaining logically independent.

---

## Rolling Window Evaluation

Rather than evaluating a single metric in isolation, the Health domain analyzes a bounded window of recent telemetry.

Rolling-window evaluation helps:

- Reduce noise
- Smooth temporary spikes
- Improve stability
- Produce more representative system health

---

## Threshold Evaluation

Incoming telemetry is compared against predefined thresholds to determine an initial health classification.

Possible evaluation results include:

- `HEALTHY`
- `DEGRADED`
- `FAILING`

Individual metrics are evaluated independently before contributing to the overall system state.

---

## Stable State Evaluation

The current health state is determined using the dominant classification within the rolling evaluation window.

Evaluation rules:

- Dominant `FAILING` → `FAILING`
- Dominant `DEGRADED` → `DEGRADED`
- Otherwise → `HEALTHY`

This stabilization process prevents rapid oscillation caused by temporary metric fluctuations.

---

## State Transition Recording

Health state transitions are recorded only when the evaluated system state changes.

Each transition includes:

- Previous state
- Current state
- Timestamp
- Metrics snapshot

Transition history provides operational context for later analysis.

---

## Sustained Degradation Detection

Automatic incident generation occurs only after unhealthy conditions persist beyond a configured duration.

Detection behavior includes:

- Monitoring `DEGRADED` and `FAILING`
- Starting a degradation timer when unhealthy conditions begin
- Resetting the timer when the system returns to a healthy state
- Preventing duplicate incidents during a continuous degradation period

---

## Automatic Incident Generation

When sustained degradation exceeds the configured threshold, the Health domain requests creation of a new incident.

The Incident domain is responsible for validating, storing, and managing the incident lifecycle.

This separation keeps health evaluation focused on detection while incident management remains responsible for operational workflows.

---

## Design Principles

The Health domain follows several guiding principles:

- Telemetry drives health evaluation.
- Health reflects sustained behavior rather than individual spikes.
- State transitions occur only when system health changes.
- Incident generation is event-driven.
- Detection logic remains independent from incident lifecycle management.
