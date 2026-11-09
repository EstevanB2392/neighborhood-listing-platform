-- Part 4: Row-Level Security and least-privilege grants
-- Apply after 20261029140000_exam_services_persistence.sql.

BEGIN;

-- Remove default application privileges on these five tables.
REVOKE ALL PRIVILEGES ON TABLE
    public.profiles,
    public.service_categories,
    public.services,
    public.service_category_mappings,
    public.bookings
FROM PUBLIC, anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Profiles are provisioned by trusted administration.
-- Users can read their own role but cannot change it.
GRANT SELECT ON public.profiles TO authenticated;

CREATE POLICY profiles_read_own
ON public.profiles
FOR SELECT TO authenticated
USING (id = (SELECT auth.uid()));

-- Public discovery.
GRANT SELECT ON
    public.service_categories,
    public.services,
    public.service_category_mappings
TO anon, authenticated;

CREATE POLICY categories_read_active
ON public.service_categories
FOR SELECT TO anon, authenticated
USING (active_status = true);

CREATE POLICY services_read_approved
ON public.services
FOR SELECT TO anon, authenticated
USING (status = 'approved');

CREATE POLICY mappings_read_public
ON public.service_category_mappings
FOR SELECT TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.services AS s
        WHERE s.id = service_category_mappings.service_id
          AND s.status = 'approved'
    )
    AND EXISTS (
        SELECT 1
        FROM public.service_categories AS c
        WHERE c.id = service_category_mappings.category_id
          AND c.active_status = true
    )
);

-- Providers can also read their own nonpublic services.
CREATE POLICY services_read_own
ON public.services
FOR SELECT TO authenticated
USING (
    provider_id = (SELECT auth.uid())
    AND EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
);

-- Providers can create only their own drafts.
GRANT INSERT, DELETE ON public.services TO authenticated;

CREATE POLICY services_insert_own_draft
ON public.services
FOR INSERT TO authenticated
WITH CHECK (
    provider_id = (SELECT auth.uid())
    AND status = 'draft'
    AND EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
);

-- Ordinary users may update only these content columns.
-- Ownership, status, IDs, and timestamps cannot be changed.
GRANT UPDATE (
    title,
    hourly_rate,
    duration_minutes,
    coverage_radius_miles
)
ON public.services TO authenticated;

CREATE POLICY services_update_own_unapproved
ON public.services
FOR UPDATE TO authenticated
USING (
    provider_id = (SELECT auth.uid())
    AND status IN ('draft', 'suspended')
    AND EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
)
WITH CHECK (
    provider_id = (SELECT auth.uid())
    AND status IN ('draft', 'suspended')
    AND EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
);

CREATE POLICY services_delete_own_unapproved
ON public.services
FOR DELETE TO authenticated
USING (
    provider_id = (SELECT auth.uid())
    AND status IN ('draft', 'suspended')
    AND EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
);

-- Anyone may submit a booking, subject to table constraints.
GRANT INSERT ON public.bookings TO anon, authenticated;

CREATE POLICY bookings_insert_public
ON public.bookings
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- SELECT privileges permit queries, but RLS filters their rows.
-- There is no anonymous/client read policy.
GRANT SELECT ON public.bookings TO anon, authenticated;

CREATE POLICY bookings_read_service_owner
ON public.bookings
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = (SELECT auth.uid())
          AND p.role IN ('merchant', 'provider')
    )
    AND EXISTS (
        SELECT 1
        FROM public.services AS s
        WHERE s.id = bookings.service_id
          AND s.provider_id = (SELECT auth.uid())
    )
);

-- Administrative operations use trusted elevated execution.
-- An ordinary authenticated account with role='admin' does not
-- automatically receive the service_role database role.
GRANT ALL PRIVILEGES ON TABLE
    public.profiles,
    public.service_categories,
    public.services,
    public.service_category_mappings,
    public.bookings
TO service_role;

COMMIT;
