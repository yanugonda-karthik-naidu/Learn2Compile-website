import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(180).optional().or(z.literal("")),
  businessType: z.string().min(2).max(120),
  projectType: z.string().min(2).max(120),
  budget: z.string().min(1).max(120),
  timeline: z.string().min(1).max(120),
  description: z.string().min(10).max(4000),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

