# Exam Testing Report — Parts 5 and 6

## Part 5: Services API

| Test | Result |
|---|---|
| TypeScript compilation | Passed |
| ESLint | Passed |
| Unauthenticated POST request | Passed — HTTP 401 |
| Invalid Zod input | Passed — rejected |
| Valid Zod input | Passed — accepted |
| GET /api/services | Pending database integration |
| Authenticated POST request | Not tested |

### Findings

The API correctly rejects users who are not signed in.

Zod validation rejects invalid service information and accepts valid information.

The GET endpoint currently returns an error because the public.services table was not found in Supabase.

## Part 6: ServiceCard UI

| Test | Result |
|---|---|
| Desktop display | Passed |
| Mobile display (375px) | Passed |
| Service information displayed | Passed |
| Disabled booking button | Passed |
| Basic keyboard navigation | Passed |

### Findings

The ServiceCard displays the service name, hourly rate, duration, and coverage area.

The layout works on desktop and mobile screens.

The Book Service button is disabled until booking functionality is connected.

## Remaining Work

- Test authenticated API requests.
- Verify Supabase database integration.
- Complete final testing with teammate.