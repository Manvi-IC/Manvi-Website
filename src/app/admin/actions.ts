'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: unknown, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'admin123') {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { path: '/' });
    redirect('/admin');
  } else {
    return { error: 'Invalid username or password.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin/login');
}
