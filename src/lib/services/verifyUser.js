// utils/verifyUser.ts

import {API_BASE_URL} from '@/lib/api_base_url.ts';
export async function verifyUser(isSignedIn, userId, pathname) {
  if (!isSignedIn) return { allowed: false, redirectTo: '/' };

  const prefix = pathname.split('/')[1];

  try {
    const res = await fetch(`${API_BASE_URL}/user/find-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerkId: userId }),
    });

    if (!res.ok) throw new Error('Failed to fetch user');

    const data = await res.json(); // assuming data.role exists
    const userRole = data.role;

    if (userRole === prefix) {
      return { allowed: true }; // ✅ route matches role
    }

    // ❌ role does not match path → redirect to correct dashboard
    return { allowed: false, redirectTo: `/${userRole}/dashboard` };
  } catch (error) {
    console.error('verifyUser error:', error);
    return { allowed: false, redirectTo: '/' }; // fallback to homepage
  }
}
