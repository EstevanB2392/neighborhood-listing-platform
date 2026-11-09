# Exam Testing Report — Parts 5 and 6

## Part 5: Services API

| Test | Result |
|---|---|
| TypeScript compilation | Passed |
| ESLint | Passed |
| Unauthenticated POST request | Passed — HTTP 401 |
| Invalid Zod input | Passed — rejected |
| Valid Zod input | Passed — accepted |
| GET /api/services | Passed — HTTP 200 |
| Authenticated POST request | Passed — HTTP 201 |

### Findings

The API correctly rejects users who are not signed in.

Zod validation rejects invalid service information and accepts valid information. These checks were performed directly against the schema.

The GET endpoint successfully returned two approved services from Supabase. This was also verified on the Vercel Preview deployment.

An authenticated POST request using Provider A successfully created a service with HTTP 201. The response confirmed that the service was saved with the correct provider ID and a status of `draft`.

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

No remaining tests for Parts 5 and 6 in this report. Authenticated invalid-input HTTP responses have not been separately verified.