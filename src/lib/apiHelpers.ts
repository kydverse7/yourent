import { NextResponse } from 'next/server';

export function apiError(
  message: string,
  status = 400,
  details?: unknown,
): NextResponse {
  return NextResponse.json(
    { error: message, ...(details !== undefined ? { details } : {}) },
    { status },
  );
}

export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}

export function apiPaginated<T>(
  items: T[],
  meta: { total: number; page: number; limit: number },
): NextResponse {
  const { total, page, limit } = meta;
  return NextResponse.json({
    data: items,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
}
