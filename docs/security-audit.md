# Exam Security Audit — Part 4

## Overview

This report documents the Supabase Row-Level Security (RLS) tests for the Neighborhood Listing Platform.

The goal was to make sure users only have access to the information and actions allowed by their roles.

## Authorization Test Matrix

| Role | Security Test | Observed Result | Status |
|---|---|---|---|
| Anonymous | Read approved services | 2 visible | PASS |
| Anonymous | Read draft services | 0 visible | PASS |
| Provider A | Update own draft | 1 updated | PASS |
| Provider A | Update another provider's draft | 0 updated | PASS |
| Provider A | Update approved service | 0 updated | PASS |
| Client | Read private bookings | 0 visible | PASS |
| Provider | Read own service bookings | 1 visible | PASS |
| Provider | Read another provider's bookings | 0 visible | PASS |
| Admin (service role) | Update services | 4 updated | PASS |
| Admin (service role) | Read bookings | 2 visible | PASS |
| Anonymous | Read bookings | 0 visible | PASS |
| Anonymous | Read active categories | 1 visible | PASS |
| Anonymous | Read inactive categories | 0 visible | PASS |
| Anonymous | Read permitted category mappings | 1 visible | PASS |
| Anonymous | Read restricted mappings | 0 visible | PASS |
| Provider | Create draft service | 1 created | PASS |
| Provider | Update suspended service | 1 updated | PASS |
| Provider | Update pending service | 0 updated | PASS |
| Provider | Delete own draft | 1 deleted | PASS |
| Provider | Delete another provider's draft | 0 deleted | PASS |
| Provider | Delete approved service | 0 deleted | PASS |
| Client | Insert valid booking | INSERT completed without error; rolled back afterward | PASS |
| Anonymous | Insert valid booking | INSERT completed without error; rolled back afterward | PASS |

## Booking Insert Test

Both authenticated client and anonymous booking inserts completed
successfully during SQL Editor testing.

Each test executed an INSERT without RETURNING, followed by a booking
SELECT under the same role. Both SELECT queries returned zero visible
bookings, confirming booking privacy. The transactions ended with
ROLLBACK, removing the temporary bookings.

The screenshots show the final privacy results; successful insertion
was verified by the preceding INSERT completing without error.

- Client: [04-client-privacy.png](exam-evidence/04-client-privacy.png)
- Anonymous: [07-anonymous-booking.png](exam-evidence/07-anonymous-booking.png)

## Evidence Files

- docs/exam-evidence/01-rls-enabled.png
- docs/exam-evidence/02-anonymous-reads.png
- docs/exam-evidence/03-provider-updates.png
- docs/exam-evidence/04-client-privacy.png
- docs/exam-evidence/05-provider-bookings.png
- docs/exam-evidence/06-admin-access.png
- docs/exam-evidence/07-anonymous-booking.png
- docs/exam-evidence/08-category-visibility.png
- docs/exam-evidence/09-provider-lifecycle.png

## Verification Method and Limits

Anonymous tests used SET LOCAL ROLE anon. Provider and client tests
set transaction-local request.jwt.claims to the test user's identity,
then used SET LOCAL ROLE authenticated. Administrative testing used
SET LOCAL ROLE service_role.

Authorization test transactions ended with ROLLBACK, restoring test
changes. These checks test database authorization, not application
login or HTTP session handling.

The elevated test verified updates to four services and reads of two
bookings. It did not exercise every operation on all five tables.

Profile role escalation, forged service ownership, and explicit
approved-service insertion attempts were not separately tested.
Their protections are defined by the migration's grants and policies.

## Findings

The recorded tests show that anonymous users can read approved services but cannot see drafts or private bookings.

Providers can manage permitted service records and view bookings associated with their own services.

The tests also show that providers cannot modify another provider's records or approved listings.

Administrative testing using the elevated service role successfully accessed service and booking records.

## Conclusion

The available screenshots show passing results for the tested RLS access restrictions.

RLS activation was verified on all five required tables. Authenticated
client and anonymous booking inserts also completed successfully,
while booking reads remained restricted.
