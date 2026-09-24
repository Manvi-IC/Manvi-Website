'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: unknown, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  let redirectTarget = '/admin';

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_API_PUBLIC_URL ||
      process.env.NEXT_API_URL ||
      'http://127.0.0.1:5000';
    const dbName = process.env.NEXT_PUBLIC_X_DATABASE || 'manvi';
    
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-database': dbName
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!data.success) {
      return { error: data.message || 'Invalid username or password.' };
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { path: '/' });
    const role = data.role || 'admin';
    cookieStore.set('admin_role', role, { path: '/' });
    if (data.username) {
      cookieStore.set('admin_user', data.username, { path: '/' });
    }

    if (role === 'salesperson') {
      redirectTarget = '/admin/proposal';
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login. Please try again.' };
  }

  // redirect must be called OUTSIDE try/catch
  redirect(redirectTarget);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  cookieStore.delete('admin_role');
  cookieStore.delete('admin_user');
  redirect('/admin/login');
}