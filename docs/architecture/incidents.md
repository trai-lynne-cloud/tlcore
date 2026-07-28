# Incident architecture

The incident domain owns incident validation, creation, lifecycle transitions, and in-memory history.

Incidents can originate from a manual request to the control API or from the health monitor after sustained `DEGRADED` or `FAILING` state.

Creation validates `service_id` and `severity`, assigns a UUID and timestamp, sets status to `OPEN`, and appends the incident to the store. Automatic incidents use service `SystemHealthMonitor`, with severity `S0` for `FAILING` and `S2` for `DEGRADED`.

Lifecycle changes are handled separately. The controller validates the requested transition, updates the incident's current status, then appends a transition record to a second store.

Both stores are process-local and reset when TLCore exits. Retrieval returns copied arrays; there is no paging, filtering, or persistence.

See [Incident lifecycle](../concepts/incident-lifecycle.md) and [Incidents API](../api/incidents.md).
