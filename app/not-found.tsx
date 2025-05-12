'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}
