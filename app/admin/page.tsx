'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminProduct } from '@/lib/admin-store';
import { BudgetTier, NicheTag, Recipient } from '@/data/products';

const ALL_RECIPIENTS: Recipient[] = ['her','him','mom','dad','grandparents','teens','kids','baby','couples','friends','pets','coworker','employees','myself'];
const ALL_BUDGETS: { id: BudgetTier; label: string }[] = [
  { id: 'under25',   label: 'Under $25' },
  { id: '25to50',    label: '$25–$50' },
  { id: '50to100',   label: '$50–$100' },
  { id: '100to150',  label: '$100–$150' },
  { id: '150to250',  label: '$150–$250' },
  { id: '250plus',   label: '$250+' },
];
const ALL_TAGS: NicheTag[] = ['tech','diy-tools','home','gaming','sports','gardening','finance','fitness','parenting','office','luxury','hobby','kitchen','pets','kids','car-accessories'];

export default function AdminPage() {
  const [authed, setAuthed]     = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [importTags, setImportTags] = useState<NicheTag[]>([]);
  const [importRecipients, setImportRecipients] = useState<Recipient[]>([]);
  const [importBudget, setImportBudget] = useState<BudgetTier>('under25');
  const [importCranes, setImportCranes] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<AdminProduct>>({});
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const loadProducts = useCallback(async () => {
    const r = await fetch('/api/admin/products');
    if (r.ok) setProducts(await r.json());
  }, []);

  useEffect(() => {
    // Check if already authed by trying to load products
    fetch('/api/admin/products').then(r => {
      if (r.ok) { setAuthed(true); loadProducts(); }
    });
  }, [loadProducts]);

  async function login() {
    setAuthError('');
    const r = await fetch('/api/admin/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (r.ok) { setAuthed(true); loadProducts(); }
    else setAuthError('Wrong password');
  }

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthed(false);
  }

  async function handleImport() {
    setImporting(true); setImportError('');
    const urls = urlInput.split('\n').map(u => u.trim()).filter(Boolean);
    if (!urls.length) { setImporting(false); return; }
    const r = await fetch('/api/admin/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls, tags: importTags, recipients: importRecipients, budgetTier: importBudget, cranes: importCranes }),
    });
    if (r.ok) {
      setUrlInput('');
      await loadProducts();
      setStatusMsg(`Imported ${urls.length} product(s). Fill in details below.`);
    } else {
      setImportError('Import failed. Check your URLs.');
    }
    setImporting(false);
  }

  function startEdit(p: AdminProduct) {
    setEditingId(p.id);
    setEditDraft({ ...p });
  }

  function cancelEdit() { setEditingId(null); setEditDraft({}); }

  async function saveEdit() {
    if (!editingId) return;
    setSaving(true);
    const r = await fetch(`/api/admin/products/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editDraft),
    });
    if (r.ok) {
      await loadProducts();
      setEditingId(null);
      setEditDraft({});
      setStatusMsg('Saved.');
    }
    setSaving(false);
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    await loadProducts();
    setStatusMsg('Deleted.');
  }

  async function publishAll() {
    const drafts = products.filter(p => p.status === 'draft');
    if (!drafts.length) { setStatusMsg('No drafts to publish.'); return; }
    await Promise.all(drafts.map(p =>
      fetch(`/api/admin/products/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })
    ));
    await loadProducts();
    setStatusMsg(`Published ${drafts.length} product${drafts.length > 1 ? 's' : ''}.`);
  }

  async function togglePublish(p: AdminProduct) {
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    await fetch(`/api/admin/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    await loadProducts();
    setStatusMsg(`${p.name} is now ${newStatus}.`);
  }

  // Import form toggles
  function toggleImportTag(t: NicheTag) {
    setImportTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }
  function toggleImportRecipient(r: Recipient) {
    setImportRecipients(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  // Edit form toggles
  function toggleRecipient(r: Recipient) {
    const current = (editDraft.recipients || []) as Recipient[];
    setEditDraft({ ...editDraft, recipients: current.includes(r) ? current.filter(x => x !== r) : [...current, r] });
  }

  function toggleTag(t: NicheTag) {
    const current = (editDraft.tags || []) as NicheTag[];
    setEditDraft({ ...editDraft, tags: current.includes(t) ? current.filter(x => x !== t) : [...current, t] });
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Admin</h1>
        <p className="text-sm text-gray-500 mb-6">DailyGiftShuffle backend</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {authError && <p className="text-red-500 text-xs mb-3">{authError}</p>}
        <button onClick={login} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
          Sign In
        </button>
      </div>
    </main>
  );

  const published = products.filter(p => p.status === 'published').length;
  const drafts    = products.filter(p => p.status === 'draft').length;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">DailyGiftShuffle Admin</h1>
          <p className="text-xs text-gray-400">{published} published &bull; {drafts} drafts</p>
        </div>
        <button onClick={logout} className="text-xs text-gray-400 hover:text-gray-600">Sign out</button>
      </div>

      {statusMsg && (
        <div className="bg-green-50 border-b border-green-200 px-6 py-2 text-sm text-green-700 flex justify-between">
          {statusMsg}
          <button onClick={() => setStatusMsg('')} className="text-green-500">dismiss</button>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* ── Import box ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <h2 className="font-bold text-gray-900 mb-1">Import Amazon Links</h2>
            <p className="text-sm text-gray-500">
              Paste one Amazon affiliate URL per line (from your SiteStripe toolbar).
              Tag everything below before hitting Import — you can always edit per-item after.
            </p>
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono h-28 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            placeholder={"https://www.amazon.com/dp/B077Z1R28P?tag=yourtag-20\nhttps://www.amazon.com/dp/B00LJ5RV7I?tag=yourtag-20"}
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
          />

          {/* Categories */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Categories <span className="font-normal text-gray-400">(select all that apply)</span></p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleImportTag(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    importTags.includes(t)
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Recipients <span className="font-normal text-gray-400">(select all that apply)</span></p>
            <div className="flex flex-wrap gap-2">
              {ALL_RECIPIENTS.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleImportRecipient(r)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    importRecipients.includes(r)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Budget tier */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Budget Tier</p>
            <div className="flex flex-wrap gap-2">
              {ALL_BUDGETS.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setImportBudget(b.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    importBudget === b.id
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crane's List toggle */}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={importCranes}
              onChange={e => setImportCranes(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-semibold text-gray-700">🎁 Add to Crane&apos;s List</span>
            <span className="text-xs text-gray-400">(shows on /cranes — temp, remove after creator API approval)</span>
          </label>

          {importError && <p className="text-red-500 text-xs">{importError}</p>}

          <button
            onClick={handleImport}
            disabled={importing || !urlInput.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors"
          >
            {importing ? 'Importing...' : 'Import'}
          </button>
        </section>

        {/* ── Products table ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Products ({products.length})</h2>
            {products.some(p => p.status === 'draft') && (
              <button
                onClick={publishAll}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors"
              >
                Publish All Drafts ({products.filter(p => p.status === 'draft').length})
              </button>
            )}
          </div>
          {products.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
              No products yet. Paste some Amazon links above to get started.
            </div>
          )}
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {editingId === p.id ? (
                  /* ── Edit form ── */
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Product Name *</label>
                        <input value={editDraft.name || ''} onChange={e => setEditDraft({...editDraft, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Affiliate URL *</label>
                        <input value={editDraft.affiliateUrl || ''} onChange={e => setEditDraft({...editDraft, affiliateUrl: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Price (e.g. 9.99)</label>
                        <input type="number" step="0.01" value={editDraft.price || ''} onChange={e => { const v = parseFloat(e.target.value); setEditDraft({...editDraft, price: v, priceDisplay: `$${v.toFixed(2)}`}); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Budget Tier</label>
                        <select value={editDraft.budgetTier || 'under25'} onChange={e => setEditDraft({...editDraft, budgetTier: e.target.value as BudgetTier})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                          {ALL_BUDGETS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                      <textarea value={editDraft.description || ''} onChange={e => setEditDraft({...editDraft, description: e.target.value})} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Recipients</label>
                      <div className="flex flex-wrap gap-2">
                        {ALL_RECIPIENTS.map(r => (
                          <button key={r} onClick={() => toggleRecipient(r)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${(editDraft.recipients || []).includes(r) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Category Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {ALL_TAGS.map(t => (
                          <button key={t} onClick={() => toggleTag(t)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${(editDraft.tags || []).includes(t) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        checked={!!editDraft.cranes}
                        onChange={e => setEditDraft({ ...editDraft, cranes: e.target.checked })}
                        className="w-4 h-4 accent-orange-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">🎁 Add to Crane&apos;s List</span>
                    </label>

                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                      <button onClick={saveEdit} disabled={saving} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                    </div>
                  </div>
                ) : (
                  /* ── Row view ── */
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.status}
                        </span>
                        {p.cranes && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">🎁 Crane&apos;s</span>}
                        <span className="text-xs text-gray-400 font-mono">{p.asin || 'no asin'}</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {p.priceDisplay || 'no price'} &bull; {p.recipients.join(', ') || 'no recipients'} &bull; {p.budgetTier}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(p)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${p.status === 'published' ? 'border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500' : 'border-green-400 text-green-600 hover:bg-green-50'}`}>
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => startEdit(p)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => deleteProduct(p.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
