import { NextResponse } from 'next/server';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants';

export async function GET() {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.VEHICLE_LOCATIONS}?limit=100`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle locations');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching vehicle locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicle locations' },
      { status: 500 }
    );
  }
} 