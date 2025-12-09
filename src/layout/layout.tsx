import { useState } from 'react';
import { Header } from '@/layout/Header';
import { StudentProvider } from '@/contexts/StudentContext';
import { Sidebar } from '@/layout/Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';

export function Layout() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <StudentProvider>
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </StudentProvider>
  );
}