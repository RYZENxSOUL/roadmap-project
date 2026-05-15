import { connectDB } from '@/lib/mongodb';
import Roadmap from '@/app/models/Roadmap';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Connecting to DB...');

    await connectDB();

    console.log(
      'Connected! Fetching roadmaps...'
    );

    const roadmaps =
      await Roadmap.find({}).lean();

    console.log(
      'Roadmaps found:',
      roadmaps.length
    );

    return NextResponse.json(
      roadmaps
    );
  } catch (error: any) {
    console.error(
      'API Error:',
      error
    );

    return NextResponse.json(
      {
        error:
          'Failed to fetch roadmaps',
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}