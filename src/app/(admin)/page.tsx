import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminRootPage() {
  // Keep this page non-redirecting to avoid Next.js build invariants in this repo.
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Admin</h1>
        <p className="mt-3 text-white/70">
          Redirect target may not exist yet (e.g. <code className="text-white/90">/admin/dashboard</code>).
        </p>
      </div>
    </main>
  );
}

