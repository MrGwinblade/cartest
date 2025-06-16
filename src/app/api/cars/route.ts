import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('_page') || '1';
    const sort = searchParams.get('_sort');
    const order = searchParams.get('_order');

    let url = `https://testing-api.ru-rating.ru/cars?_limit=12&_page=${page}`;
    if (sort && order) {
      url += `&_sort=${sort}&_order=${order}`;
    }

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying cars API:', error);
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}