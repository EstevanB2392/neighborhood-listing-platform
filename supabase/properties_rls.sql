-- Neighborhood Listing Platform
-- Database Authorization Matrix & RLS Policy Verification
-- Target table: public.properties

-- 1. Create the properties table
CREATE TABLE IF NOT EXISTS public.properties (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id UUID NOT NULL REFERENCES auth.users(id),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price > 0),
    bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
    bathrooms INTEGER NOT NULL CHECK (bathrooms > 0),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row-Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 3. Grant table permissions
-- RLS policies below determine which rows users can access.
GRANT SELECT, INSERT, UPDATE, DELETE
ON public.properties TO authenticated;

GRANT SELECT
ON public.properties TO anon;

GRANT USAGE, SELECT
ON SEQUENCE public.properties_id_seq TO authenticated;

-- 4. Anonymous users can view properties
CREATE POLICY "Anonymous users can view properties"
ON public.properties
FOR SELECT
TO anon
USING (true);

-- 5. Authenticated users can view properties
CREATE POLICY "Authenticated users can view properties"
ON public.properties
FOR SELECT
TO authenticated
USING (true);

-- 6. Owners can create their own properties
CREATE POLICY "Owners can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- 7. Owners can update only their own properties
CREATE POLICY "Owners can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- 8. Owners can delete only their own properties
CREATE POLICY "Owners can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);