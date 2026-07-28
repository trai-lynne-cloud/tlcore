# Sustained degradation

Sustained-degradation detection converts a stable unhealthy state into one automatic incident.

When the stable state first becomes `DEGRADED` or `FAILING`, TLCore records a start time. On later checks, it compares elapsed time with the 30-second threshold. Once the threshold is reached, the incident controller creates an incident unless one has already been created for the current unhealthy period.

| Stable state at creation | Incident severity |
| --- | --- |
| `DEGRADED` | `S2` |
| `FAILING` | `S0` |

The incident's `service_id` is `SystemHealthMonitor`.

Returning to `HEALTHY` or `UNKNOWN` clears the timer and active-incident guard. A later unhealthy period can therefore create another incident. Resolving the incident itself does not reset the guard; health recovery does.

Because the health monitor runs every 10 seconds, incident creation occurs on the first monitor tick at or after 30 elapsed seconds, not at an exact wall-clock deadline.
