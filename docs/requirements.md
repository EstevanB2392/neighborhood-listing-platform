# Local Merchant Services & Client Appointment Requirements

## Scope and Roles

This subsystem supports service listing drafts, approved service discovery,
appointment booking requests, and administrator oversight.

Application roles are admin, merchant, provider, and client. Anonymous visitors
are unauthenticated users. Merchant and provider accounts have the same
service ownership permissions.

## Story 1 — Merchant / Service Provider

As an authenticated local service provider, I want to submit service listing
drafts with hourly rates so that clients can request appointments after an
administrator approves my services.

Scope estimate: Medium

### Acceptance Criteria

1. Given an authenticated merchant or provider with a profile,
   when they submit a valid service offering,
   then the service is saved with status = 'draft' and
   provider_id equal to their auth.uid().

2. Given an invalid payload or a payload containing unrecognized fields,
   when the provider submits it to the service POST handler,
   then the handler returns HTTP 400 with structured validation errors
   and does not create a service.

3. Given a provider's own draft or suspended service,
   when the provider updates or deletes it,
   then the operation succeeds subject to database constraints.

4. Given another provider's service,
   when a provider attempts to update or delete it,
   then the operation changes zero rows or returns an authorization error.

5. Given a provider's approved or pending service,
   when the provider attempts to update or delete it,
   then the operation is denied.

6. Given a merchant or provider,
   when they attempt to create an approved service, approve their own
   service, or transfer its ownership to another account,
   then the operation is denied.

### Traceability

- Database: supabase/migrations/20261029140000_exam_services_persistence.sql
- Tables: profiles, services
- Security: provider ownership and status policies in the versioned migration
- API: POST /api/services
- Validation: src/schemas/service.ts
- Verification: docs/security-audit.md

## Story 2 — Neighborhood Client / Resident

As a neighborhood resident, I want to discover approved local services
and request an appointment without viewing other clients' bookings
or contact information.

Scope estimate: Medium

### Acceptance Criteria

1. Given an anonymous visitor or authenticated client,
   when they query public services,
   then only services with status = 'approved' are returned.

2. Given an anonymous visitor or authenticated client,
   when they query public service categories,
   then only categories with active_status = true are returned.

3. Given a public request for service-category mappings,
   when mappings are returned,
   then they reference approved services and active categories.

4. Given an anonymous visitor or authenticated client with a valid service ID,
   email address, requested date, and notes of at least 10 characters,
   when they insert a booking request,
   then the database accepts the request.

5. Given an anonymous visitor or client,
   when they attempt to read bookings, including their own,
   then no booking rows or client contact information are returned.

6. Given an invalid booking email, notes shorter than 10 characters,
   or a nonexistent service ID,
   when a booking is inserted,
   then the database rejects it.

### Traceability

- Database: supabase/migrations/20261029140000_exam_services_persistence.sql
- Tables: service_categories, services, service_category_mappings, bookings
- Security: public read, booking insert, and booking visibility policies
- API: GET /api/services
- Booking insertion: database access governed by RLS; the assignment does
  not specify a booking route handler
- Verification: docs/security-audit.md

### Coverage Limitation

The story mentions neighborhood districts and active coverage zones.
The required schema provides coverage_radius_miles and active service
categories but no district or coverage-zone entities. Radius information
and active categories do not establish district or coverage-zone support.
That portion requires clarification or an agreed schema extension.

## Story 3 — Platform Administrator

As a platform administrator, I want to approve service listings,
deactivate bad actors, and audit client bookings so that I can maintain
a trustworthy service marketplace.

Scope estimate: Large

### Acceptance Criteria

1. Given an authorized administrator using trusted server-side
   elevated execution,
   when they change a service from draft or pending to approved,
   then the service becomes visible through public service queries.

2. Given an authorized administrator using trusted server-side
   elevated execution,
   when they suspend a service,
   then it is excluded from public service queries.

3. Given an authorized administrator using trusted server-side
   elevated execution,
   when they read or write the five subsystem tables,
   then permitted administrative operations succeed subject to
   database constraints.

4. Given bookings for multiple providers,
   when an authorized administrator audits them through elevated execution,
   then the administrator can inspect all bookings.

5. Given a provider accessing bookings through their authenticated session,
   when they query bookings,
   then only bookings for services they own are returned.

6. Given an account requiring deactivation,
   when an authorized administrator disables it through trusted
   Supabase Auth administration,
   then the account is prevented from signing in.
   Service suspension is a separate action.

7. Given an anonymous visitor, client, merchant, or provider,
   when they attempt to change their profile role to admin,
   then the operation is denied.

### Traceability

- Database: supabase/migrations/20261029140000_exam_services_persistence.sql
- Tables: profiles, service_categories, services,
  service_category_mappings, bookings
- Administration: trusted server-side elevated execution
- Account deactivation: Supabase Auth administration
- API coordination: the required /api/services route defines GET and POST;
  an administrative route is not specified by the assignment
- Verification: docs/security-audit.md

## Implementation and Verification Status

This document defines acceptance targets, not completed test results.

The migration, security policies, and authorization audit will be
implemented and verified in Parts 3 and 4. API integration must be
confirmed with the partner responsible for Part 5.

The physical location of the /api/services handler must be checked
against the repository's app directory structure.
