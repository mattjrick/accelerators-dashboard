import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the Zod schema
const acceleratorSchema = z.object({
  name: z.string(),
  offerings: z.array(z.string()),
  effort: z.string().transform((str) => parseInt(str)),
  timesUsed: z.string().transform((str) => parseInt(str)),
  status: z.enum(['active', 'draft', 'archived']),
  createdBy: z.string(),
  createdDate: z.date(),
  storyBranding: z.object({
    character: z.string().optional(),
    externalProblem: z.string().optional(),
    internalProblem: z.string().optional(),
    philosophicalProblem: z.string().optional(),
    empathyStatement: z.string().optional(),
    authorityStatement: z.string().optional(),
    plan: z.string().optional(),
    callToActions: z.string().optional(),
    avoidFailure: z.string().optional(),
    successLooksLike: z.string().optional(),
  }).optional(),
  marketing: z.object({
    oneLiner: z.string().optional(),
    elevatorPitch: z.string().optional(),
    landingPage: z.string().optional(),
  }).optional(),
  links: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = acceleratorSchema.parse(body);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as z.ZodError).errors }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
}