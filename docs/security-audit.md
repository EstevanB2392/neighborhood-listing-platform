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

## Booking Insert Test

A separate screenshot documents anonymous booking testing.

The result should be verified before marking this test as passed.

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

## Findings

The recorded tests show that anonymous users can read approved services but cannot see drafts or private bookings.

Providers can manage permitted service records and view bookings associated with their own services.

The tests also show that providers cannot modify another provider's records or approved listings.

Administrative testing using the elevated service role successfully accessed service and booking records.

## Conclusion

The available screenshots show passing results for the tested RLS access restrictions.

The anonymous booking insertion test and RLS activation across all five tables still need final verification.