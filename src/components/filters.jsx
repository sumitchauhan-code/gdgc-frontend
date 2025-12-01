import React from 'react';

export default function Filters({ roles, skills, locationOptions, filters, setFilters }) {
  function update(k, v) { setFilters(prev => ({ ...prev, [k]: v })); }

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      <input
        value={filters.q}
        onChange={e => update('q', e.target.value)}
        placeholder="Search name or bio..."
        className="px-3 py-2 rounded-md border w-full md:w-64"
      />
      <select value={filters.role} onChange={e => update('role', e.target.value)} className="px-3 py-2 rounded-md border">
        <option value="">All Roles</option>
        {roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={filters.location} onChange={e => update('location', e.target.value)} className="px-3 py-2 rounded-md border">
        <option value="">All Locations</option>
        {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </div>
  );
}