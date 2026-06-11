'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: unknown, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const dbName = process.env.NEXT_PUBLIC_X_DATABASE || 'm5clogs';
    
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-database': dbName
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', 'true', { path: '/' });
      redirect('/admin');
    } else {
      return { error: data.message || 'Invalid username or password.' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login. Please try again.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin/login');
}