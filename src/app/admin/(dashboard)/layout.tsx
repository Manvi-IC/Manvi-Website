import { logoutAction } from '../actions';
import { LayoutDashboard, LogOut, Package, Users, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1220] text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-[#050914] font-bold text-xl tracking-wider">
          M5C ADMIN
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-slate-100">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/upload-rates" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Package size={20} />
            Upload Rates
          </Link>
          <Link href="/admin/service-mapping" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Serviceable Zipcode Mapping
          </Link>
          <Link href="/admin/site-settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Site Settings
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Settings size={20} />
            Profile Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:hidden">
          <div className="font-bold text-lg text-slate-900">M5C ADMIN</div>
          <form action={logoutAction}>
            <button type="submit" className="text-gray-500 hover:text-red-600">
              <LogOut size={24} />
            </button>
          </form>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
