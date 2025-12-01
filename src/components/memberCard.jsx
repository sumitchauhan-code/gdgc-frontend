import React from 'react';

export default function MemberCard({ m }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold">{m.name}</h3>
          <div className="text-xs text-slate-500 dark:text-slate-300">{m.role} • {m.location}</div>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{m.bio}</p>
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {m.skills.map(s => <span key={s} className="text-xs px-2 py-1 rounded-full border">{s}</span>)}
        </div>
      </div>
    </article>
  );
}