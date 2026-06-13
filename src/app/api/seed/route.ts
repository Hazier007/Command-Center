import { NextResponse } from 'next/server'

// Legacy seed data intentionally disabled for the LocalLead clean-sheet reset.
// We do not want old Hazier/CollectPro/demo records to be restored accidentally.
export async function POST() {
  return NextResponse.json({
    success: false,
    message: 'Legacy seed is disabled. Use the live UI or targeted LocalLead imports to add new clean-sheet data.',
  }, { status: 410 })
}
