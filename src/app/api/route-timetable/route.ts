import { NextResponse } from 'next/server';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lineRef = searchParams.get('lineRef');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    if (!lineRef) {
      return NextResponse.json(
        { error: 'Line reference is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.ROUTE_TIMETABLE}?line_ref=${lineRef}&date=${date}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch route timetable');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching route timetable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch route timetable' },
      { status: 500 }
    );
  }
} 