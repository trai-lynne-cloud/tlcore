# Runtime architecture

The runtime owns four simulated services. `runtime/index.js` starts each service once during process boot; each service then runs on its own interval.

| Service               | Interval | Metrics                                              | Failure flags                    |
| --------------------- | -------: | ---------------------------------------------------- | -------------------------------- |
| `AuthService`         |      9 s | `auth_latency`                                       | `latencySpike`                   |
| `BillingService`      |     10 s | `billing_queue_depth`                                | `queueBacklogSpike`              |
| `MonitoringService`   |     18 s | `cpu_utilization`                                    | `cpuSpike`, `failSpike`          |
| `NotificationService` |      2 s | `notification_queue_depth`, `notification_fail_rate` | `queueBacklogSpike`, `failSpike` |

Each timer calls the service's `behavior()` method, generates a random value, and passes it to the telemetry domain.

## Logical runtime state

The runtime controller exposes `RUNNING` and `STOPPED` states. This is control intent stored in `runtime/state/runtimeState.js`; it is separate from timer execution. Starting or stopping through the API does not currently call the services' `start()` or `stop()` methods. Restart performs a stop/start state transition only.

That distinction matters when interpreting `/runtime/status`: it reports intent, not process or timer liveness.

## Startup

`index.js` uses fixed port: 3000. It starts the simulated services before starting the health monitor. No graceful shutdown hook is currently installed.
