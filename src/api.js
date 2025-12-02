const BASE = import.meta.env.VITE_API_BASE;
export async function fetchMembers() {
  const res = await fetch(`${BASE}/members`);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}
export async function fetchMember(id) {
  const res = await fetch(`${BASE}/members/${id}`);
  if (!res.ok) throw new Error('Failed to fetch member');
  return res.json();
}