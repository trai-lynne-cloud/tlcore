# Architecture Overview

## Purpose

TLCore is organized into domain-driven modules that separate runtime execution, telemetry processing, health evaluation, incident management, and control operations.

The architecture models how an observable distributed system behaves while remaining intentionally lightweight and easy to reason about. Although TLCore currently executes as a single Node.js process, each domain represents a logical system boundary that could be evolved into independently deployed services in the future.

---

## Architectural Goals

The architecture is designed around several core principles:

- Separation of concerns through domain ownership
- Clear flow of telemetry through the observability pipeline
- Independent runtime services
- Deterministic health evaluation
- Controlled failure injection
- Observable incident lifecycle
- Simple, testable in-memory state management

---

## Domain Architecture

TLCore consists of five primary domains:

### Runtime

Responsible for simulating continuous system behavior.

Responsibilities include:

- Initializing runtime services
- Executing services on independent intervals
- Producing telemetry
- Evaluating failure injection flags

---

### Telemetry

Responsible for collecting and storing runtime metrics.

Responsibilities include:

- Receiving metrics from runtime services
- Validating telemetry
- Maintaining the centralized telemetry store
- Providing metrics for downstream processing

---

### Health

Responsible for determining overall system health.

Responsibilities include:

- Rolling-window metric evaluation
- Threshold-based health classification
- Stable state determination
- Sustained degradation detection

---

### Incidents

Responsible for managing operational incidents.

Responsibilities include:

- Incident creation
- Lifecycle management
- Transition history
- Incident storage

---

### Control

Responsible for coordinating system intent.

Responsibilities include:

- Runtime operations
- Failure injection
- Incident operations
- HTTP API endpoints

---

## System Flow

At a high level, TLCore follows a continuous processing pipeline:

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
Incident System
```

---

## Runtime Model

TLCore currently executes as a single Node.js process.

Each architectural domain communicates through centralized in-memory stores rather than network communication, allowing the project to focus on observability concepts without introducing distributed infrastructure complexity.

This architecture intentionally prioritizes clarity, deterministic behavior, and rapid iteration while preserving boundaries that resemble production distributed systems.

---

## Design Principles

Several principles guide architectural decisions throughout the project:

- Each domain owns its own business logic.
- Communication occurs through well-defined domain boundaries.
- Runtime behavior is separated from control intent.
- Telemetry drives downstream system behavior.
- Incident generation is event-driven rather than manually orchestrated.
- The architecture favors readability and maintainability over premature complexity.
