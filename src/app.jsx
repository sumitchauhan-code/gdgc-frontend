import React, { useEffect, useMemo, useState } from 'react';
import Splash from './components/splash';
import { fetchMembers } from './api';
import Filters from './components/filters';
import MemberGrid from './components/memberGrid';
import ThemeToggle from './components/themeToggle';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ q: '', role: '', location: '' });

  useEffect(() => {
    fetchMembers().then(data => { setMembers(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const roles = useMemo(() => Array.from(new Set(members.map(m => m.role))), [members]);
  const locations = useMemo(() => Array.from(new Set(members.map(m => m.location))), [members]);

  const filtered = useMemo(() => {
    return members.filter(m => {
      if (filters.role && m.role !== filters.role) return false;
      if (filters.location && m.location !== filters.location) return false;
      const q = filters.q.trim().toLowerCase();
      if (!q) return true;
      return m.name.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q) || m.skills.join(' ').toLowerCase().includes(q);
    });
  }, [members, filters]);

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">GDGC Member Showcase</h2>
        <div className="flex gap-3 items-center">
          <ThemeToggle />
        </div>
      </header>

      <section className="mb-6">
        <Filters
          roles={roles} skills={[]} locationOptions={locations}
          filters={filters} setFilters={setFilters}
        />
      </section>

      <main>
        {loading && <div className="text-center py-12">Loading members...</div>}
        {error && (
          <div className="text-center py-6">
            <div>Failed to load members.</div>
            <button onClick={() => { setLoading(true); setError(null); fetchMembers().then(d => { setMembers(d); setLoading(false); }).catch(e => { setError(e.message); setLoading(false); }); }}
              className="mt-2 px-3 py-2 rounded border">Retry</button>
          </div>
        )}
        {!loading && !error && <MemberGrid list={filtered} />}
      </main>
    </div>
  );
}