import { NextResponse } from 'next/server';
import { seedData } from '@/lib/seedData';
import { projectsStorage } from '@/lib/storage';

export async function POST() {
  try {
    // Force seed by temporarily bypassing the check
    await seedData();
    const projects = await projectsStorage.getAll();
    return NextResponse.json({ 
      success: true, 
      message: `Seeded successfully. ${projects.length} projects in DB.` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
