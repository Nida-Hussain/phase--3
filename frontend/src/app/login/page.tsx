import { Suspense } from 'react';
import LoginContent from './content';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 flex items-center justify-center p-4"><div className="text-white text-xl">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}