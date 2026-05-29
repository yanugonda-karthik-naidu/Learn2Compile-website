// Resend integration is intentionally stubbed until the `resend` dependency is confirmed.
// If `resend` is installed in your environment, replace this file with a proper client.

export function createResendServerClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing env var: RESEND_API_KEY");
  return {
    async send(_payload: unknown) {
      // Stub: safely ignore payload since Resend is not yet configured
      void _payload;
      return { id: "resend_stub" };
    },
  };
}


