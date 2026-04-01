import { useState } from 'react';

export function useRole() {
  const [role, setRole] = useState('Admin');
  const toggleRole = () => setRole(r => (r === 'Admin' ? 'Viewer' : 'Admin'));
  return { role, setRole, toggleRole };
}
