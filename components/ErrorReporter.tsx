'use client';

// Mounted once in the root layout: reports uncaught script errors and unhandled
// promise rejections (see lib/clientErrors.ts). Renders nothing.

import { useEffect } from 'react';
import { reportClientError } from '@/lib/clientErrors';

export default function ErrorReporter() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      reportClientError({ message: e.message, source: e.filename ? `${e.filename}:${e.lineno}` : '' });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason as { message?: string } | string | undefined;
      const message = typeof r === 'string' ? r : r?.message || 'unhandled rejection';
      reportClientError({ message: `Unhandled rejection: ${message}` });
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);
  return null;
}
