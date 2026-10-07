# Rive assets

Drop `.riv` files here and the site picks them up automatically (no code change).
Until a file exists, each slot renders its built-in SVG + Framer Motion fallback.

| File               | Used by            | State machine | Inputs                                              |
| ------------------ | ------------------ | ------------- | --------------------------------------------------- |
| `miss-minutes.riv` | Miss Minutes guide | `Main`        | `lookX` (number -1..1), `lookY` (number -1..1), `talk` (boolean) |
| `time-door.riv`    | Contact "Time Door"| `Main`        | `open` (boolean)                                    |
| `variant.riv`      | Hero variant card  | `Main`        | `scan` (trigger)                                    |

Only inputs that exist in the file are driven; missing ones are ignored.
