import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/validation/contactSchema";
import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { createResendServerClient } from "@/lib/resend/serverClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Server-side validation
    const parsed = contactInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid input",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;

    const supabase = createSupabaseServerClient();

    const { error: dbError } = await supabase
      .from("inquiries")
      .insert({
        name: input.name,
        phone: input.phone,
        email: input.email ?? null,
        business_type: input.businessType,
        project_type: input.projectType,
        budget: input.budget,
        timeline: input.timeline,
        description: input.description,
      });

    if (dbError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to store inquiry",
          details: dbError.message,
        },
        { status: 500 }
      );
    }

    // Email notifications (stub unless `resend` dependency exists and the stub is replaced)
    try {
      const resend = createResendServerClient();

      // Auto-response email to the client (simple text)
      await resend.send({
        to: input.email ?? "",
        from: process.env.RESEND_FROM_EMAIL ?? "",
        subject: "Thanks! We received your inquiry",
        html: `<p>Hi ${input.name},</p><p>Thanks for contacting Learn2Compile. We\'ll respond shortly with next steps and a premium execution plan.</p><p>— Learn2Compile</p>`,
      });

      // Optional: notify admin
      if (process.env.ADMIN_EMAIL) {
        await resend.send({
          to: process.env.ADMIN_EMAIL,
          from: process.env.RESEND_FROM_EMAIL ?? "",
          subject: "New website inquiry",
          html: `<p><b>Name:</b> ${input.name}</p><p><b>Phone:</b> ${input.phone}</p><p><b>Email:</b> ${input.email ?? "(none)"}</p><p><b>Business Type:</b> ${input.businessType}</p><p><b>Project Type:</b> ${input.projectType}</p><p><b>Budget:</b> ${input.budget}</p><p><b>Timeline:</b> ${input.timeline}</p><p><b>Description:</b> ${input.description.replaceAll("<", "<")}</p>`,
        });
      }
    } catch {
      // Keep UX premium: don't fail the request if email fails.
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

