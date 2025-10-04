import { NextRequest, NextResponse } from 'next/server';
import { fetcher } from '@/lib/fetcher';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    // Build the Strapi query with deep population
    const populateQuery = 'populate[modules][populate][classes][populate]=topics';
    let strapiEndpoint = '/api/courses';
    
    // If slug is provided, get specific course
    if (slug) {
      strapiEndpoint = `/api/courses?filters[slug][$eq]=${slug}&${populateQuery}`;
    } else {
      // Get all courses with population
      strapiEndpoint = `/api/courses?${populateQuery}`;
    }
    
    // Add thumbnail population for course listing
    strapiEndpoint += '&populate[thumbnail]=*';
    
    const response = await fetcher.get(strapiEndpoint);
    
    // If slug was provided, return the first course or 404
    if (slug) {
      const courses = response.data.data;
      if (courses.length === 0) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: courses[0] });
    }
    
    // Return all courses
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: error?.response?.status || 500 }
    );
  }
}