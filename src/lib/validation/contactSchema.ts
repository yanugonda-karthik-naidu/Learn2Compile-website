import { z } from "zod";

// Indian phone validation: +91 followed by 10 digits, or 10 digits starting with 6-9
const indianPhoneRegex = /^(\+91\s?[6-9]\d{9}|\d{10})$/;

export const contactInquirySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid Indian phone number (+91 followed by 10 digits)")
    .max(15),
  email: z.string().email().max(180).optional().or(z.literal("")),
  businessName: z.string().min(2).max(120).optional().or(z.literal("")),
  businessType: z.string().min(2).max(120),
  projectType: z.string().min(2).max(120),
  requiredFeatures: z.string().max(500).optional().or(z.literal("")),
  referenceWebsites: z.string().max(500).optional().or(z.literal("")),
  budget: z.string().min(1).max(120),
  leadSource: z.string().max(120).optional().or(z.literal("")),
  timeline: z.string().min(1).max(120).optional().or(z.literal("")),
  description: z.string().min(10).max(4000),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

