import React from 'react';
import MemberCard from './memberCard';

export default function MemberGrid({ list }) {
  if (!list.length) return <div className="text-center p-8">No members found</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {list.map(m => <MemberCard key={m.id} m={m} />)}
    </div>
  );
}