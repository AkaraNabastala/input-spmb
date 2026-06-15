import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-4 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400">
        <div><span className="font-bold text-amber-500">SMP ISLAM CARUY</span> &copy; {new Date().getFullYear()}</div>
        <div className="mt-1 sm:mt-0">Sistem Penerimaan Peserta Didik Baru</div>
      </div>
    </footer>
  );
}