'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          <p>{error || "An unknown error occurred"}</p>
        </div>
        <div className="text-center text-sm text-gray-600">
          <a href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Try signing in again
          </a>
        </div>
      </div>
    </div>
  );
}
