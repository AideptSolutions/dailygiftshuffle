'use client';

import { useState, useEffect, useCallback } from 'react';

interface ClickRow {
  key: string;
  clicks: number;
  name: string | null;
  url: string;
  previous?: number;
  topPage?: string | null;
}

interface PageRow {
  path: string;
  clicks: number;
}

const PERIODS: { days: number | null; label: string }[] = [
  { days: null, label: 'All time' },
  { days: 7, label: '7 days' },
  { days: 30, label: '30 days' },
  { days: 90, label: '90 days' },
];

export default function AdminClicksPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [rows, setRows] = useState<ClickRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<number | null>(null);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [previousTotal, setPreviousTotal] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(days ? `/api/admin/clicks?days=${days}` : '/api/admin/clicks');
    if (r.ok) {
      const data = await r.json();
      setRows(data.items ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? []);
      setPreviousTotal(data.previousTotal ?? null);
      setAuthed(true);
    } else if (r.status === 401) {
      setAuthed(false);
    }
    setLoading(false);
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  async function login() {
    setAuthError('');
    const r = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      setAuthed(true);
      load();
    } else {
      setAuthError('Wrong password');
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-lg font-bold text-gray-900 mb-1">Click Analytics</h1>
          <p className="text-sm text-gray-500 mb-4">Enter the admin password to view click stats.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3"
          />
          {authError && <p className="text-xs text-red-500 mb-3">{authError}</p>}
          <button
            onClick={login}
            className="btn-amazon w-full text-center font-bold py-2.5 rounded-lg text-sm"
          >
            Sign in
          </button>
        </div>
      </main>
    );
  }

  const max = rows[0]?.clicks ?? 1;

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Click Analytics</h1>
          <p className="text-sm text-gray-500">
            {total.toLocaleString()} affiliate clicks across {rows.length} item(s)
            {days && previousTotal !== null
              ? `, compared with ${previousTotal.toLocaleString()} in the previous ${days} days`
              : ''}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="text-sm font-semibold border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.label}
            onClick={() => setDays(p.days)}
            aria-pressed={days === p.days}
            className={`text-sm font-semibold rounded-lg px-3 py-1.5 border ${
              days === p.days
                ? 'bg-[#F04E30] border-[#F04E30] text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
          {days
            ? `No clicks in the last ${days} days. Dated clicks start on November 7, 2026.`
            : 'No clicks recorded yet. Once visitors start clicking “Buy on Amazon”, they’ll show up here.'}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4 w-10">#</th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4 text-right w-24">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.key} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4 text-gray-400 font-medium">{i + 1}</td>
                  <td className="py-3 px-4">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 hover:text-[#F04E30]"
                    >
                      {r.name ?? r.key}
                    </a>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-[#F04E30]"
                        style={{ width: `${Math.max(4, (r.clicks / max) * 100)}%` }}
                      />
                    </div>
                    {!r.name && <span className="text-xs text-gray-400">{r.key}</span>}
                    {r.topPage && (
                      <span className="block mt-1 text-xs text-gray-400">Mostly from {r.topPage}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    {r.clicks.toLocaleString()}
                    {r.previous !== undefined && (
                      <span className="block text-xs font-normal text-gray-400">was {r.previous}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4">Page the click came from</th>
                <th className="py-3 px-4 text-right w-24">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.path} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4 font-medium text-gray-900 break-all">{p.path}</td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    {p.clicks.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        Dated clicks and source pages start on November 7, 2026, in UTC days, and are kept for about
        two years. All time counts start on June 20, 2026.{' '}
        First-party counts (instant, ad-blocker-proof). Also mirrored to GA4 as{' '}
        <code>select_item</code> events under Engagement → Events.
      </p>
    </main>
  );
}
