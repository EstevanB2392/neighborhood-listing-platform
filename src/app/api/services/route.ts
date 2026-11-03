import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { serviceSchema } from "@/schemas/service";

// GET: Return approved services only
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("services")
      .select(
        "id, title, hourly_rate, duration_minutes, coverage_radius_miles"
      )
      .eq("status", "approved");

    if (error) {
      console.error("Services GET error:", error.message);
      return NextResponse.json(
        { error: "Unable to load services" },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
}

// POST: Validate and create a provider's draft service
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    // Confirm the user is signed in
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in" },
        { status: 401 }
      );
    }

    // Confirm the user is a merchant or provider
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile ||
        !["merchant", "provider"].includes(profile.role)) {
      return NextResponse.json(
        { error: "Provider access required" },
        { status: 403 }
      );
    }

    // Read the request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Validate using our strict Zod schema
    const result = serviceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Insert using the authenticated user's Supabase session
    const { data, error } = await supabase
      .from("services")
      .insert({
        ...result.data,
        provider_id: user.id,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      console.error("Service insert error:", error.message);
      return NextResponse.json(
        { error: "Unable to create service" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
}