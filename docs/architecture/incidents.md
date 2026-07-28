# Incident Management

## Purpose

The Incident domain manages operational incidents throughout their lifecycle.

Incidents may be created manually through the Control Layer or automatically through sustained degradation detection. Once created, the Incident domain is responsible for validation, storage, lifecycle management, and transition history.

---

## Responsibilities

The Incident domain is responsible for:

- Validating incident creation requests
- Creating incident records
- Managing incident lifecycle transitions
- Recording transition history
- Providing incident retrieval APIs

The Incident domain does not detect the conditions that warrant automatic incident creation. Detection remains the responsibility of the Health domain.

---

## Architecture

```text
Health Domain                         Control Layer
     │                                     │
     │ Automatic Creation Request          │ Manual Creation Request
     └──────────────────┐   ┌──────────────┘
                        ▼   ▼
                   Incident Domain
                         │
                         ▼
                   Incident Store
                         │
                         ▼
                 Transition History
```

---

## Incident Model

Each incident follows a shared schema.

### Required Fields

- `incident_id`
- `service_id`
- `severity`
- `status`
- `start_time`

Additional fields may be introduced as the project evolves while maintaining a consistent incident model.

---

## Incident Lifecycle

Incidents progress through a defined lifecycle.

```text
OPEN
   ↓
ACKNOWLEDGED
   ↓
RESOLVED
```

Lifecycle transitions are validated before being applied.

---

## Transition History

Each lifecycle transition is recorded independently from the incident record.

Transition records include:

- Previous status
- New status
- Timestamp

Maintaining transition history separately preserves an audit trail while the incident record reflects its current lifecycle status.

---

## Incident Creation

Incidents may originate from two sources.

### Manual

The Control Layer may create synthetic incidents for testing and demonstration purposes.

### Automatic

The Health domain requests incident creation after sustained degradation exceeds the configured threshold.

Regardless of origin, all incidents follow the same validation and creation process.

---

## Storage Model

The Incident domain maintains:

- Centralized in-memory incident records
- Independent transition history
- Shared incident schema

Incident data remains available for the lifetime of the runtime process.

---

## API Integration

Incident operations are exposed through HTTP APIs for creation, lifecycle management, retrieval, and transition history.

Supported operations include:

- Create synthetic incidents
- Transition incident status
- Retrieve incidents
- Retrieve transition history

---

## Design Principles

The Incident domain follows several guiding principles:

- Detection and incident management remain separate concerns.
- All incidents follow a shared schema.
- Lifecycle transitions are validated before being applied.
- Transition history is preserved independently from incident records.
- Manual and automatic incidents are managed identically after creation.
