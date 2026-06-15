import React from 'react';
import { MapPin, Database, FileText } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header({ currentView, toggleView }) {
  return (
    <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border-b-[3px] border-amber-500 py-3 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-white rounded-full p-0.5 shadow-sm border border-amber-400">
            <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="text-white">
            <h2 className="text-[10px] md:text-xs font-semibold tracking-widest text-amber-400 uppercase leading-tight">Sistem Pendaftaran</h2>
            <h1 className="text-lg md:text-xl font-bold tracking-wide uppercase leading-tight drop-shadow-sm">SMP Islam Caruy</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center text-xs text-emerald-100 gap-1.5 font-medium bg-black/10 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400" /><span>Kec. Cipari, Kab. Cilacap</span>
          </div>
          <button onClick={toggleView} className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-emerald-950 px-3 py-1.5 md:py-2 rounded-full transition-colors shadow-sm">
            {currentView === 'form' ? (<><Database className="w-4 h-4 md:w-3.5 md:h-3.5" /><span className="hidden md:inline">Data Admin</span></>) : (<><FileText className="w-4 h-4 md:w-3.5 md:h-3.5" /><span className="hidden md:inline">Isi Formulir</span></>)}
          </button>
        </div>
      </div>
    </header>
  );
}