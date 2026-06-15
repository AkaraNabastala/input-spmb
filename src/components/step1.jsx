import React from 'react';
import { Check, UserPlus, ChevronRight } from 'lucide-react';

const docLabels = {
  ijazah: { short: 'Ijazah', long: 'Ijazah Lengkap' }, kk: { short: 'KK', long: 'Kartu Keluarga (KK)' }, akte: { short: 'Akte', long: 'Akte Kelahiran' }, foto: { short: 'Foto', long: 'Pas Foto Resmi' },
  kip: { short: 'KIP', long: 'Kartu Indonesia Pintar (KIP)' }, kks: { short: 'KKS', long: 'Kartu Keluarga Sejahtera (KKS)' }, pkh: { short: 'PKH', long: 'Program Keluarga Harapan (PKH)' }, kis: { short: 'KIS', long: 'Kartu Indonesia Sehat (KIS)' },
  ktp_ayah: { short: 'KTP Ayah', long: 'KTP Ayah Kandung' }, ktp_ibu: { short: 'KTP Ibu', long: 'KTP Ibu Kandung' }
};

export default function Step1Kelengkapan({ bio, docs, handleBioChange, handleDocChange, onNext }) {
  const handleSubmit = (e) => { e.preventDefault(); onNext(); };
  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-8 animate-in fade-in duration-300">
      <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
        <div className="bg-emerald-50 p-2 rounded-lg mr-3 text-emerald-600"><UserPlus className="w-5 h-5" /></div>
        <div><h2 className="text-lg font-bold text-slate-800">Ceklis Berkas & Pendaftaran</h2><p className="text-xs text-slate-500">Tentukan nomor registrasi dan kelengkapan dokumen.</p></div>
      </div>
      <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200 mb-6">
        <label className="block text-[11px] font-bold text-emerald-800 uppercase mb-1">Nomor Registrasi (Manual) <span className="text-red-500">*</span></label>
        <input required type="text" name="no_registrasi" value={bio.no_registrasi} onChange={handleBioChange} placeholder="Misal: REG-2024-001" className="w-full sm:w-1/2 bg-white border border-emerald-300 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 uppercase font-mono" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {Object.keys(docLabels).map((item) => (
          <label key={item} className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${docs[item] ? 'bg-emerald-50 border-emerald-400 ring-1' : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-slate-50'}`} title={docLabels[item].long}>
            <input type="checkbox" name={item} checked={docs[item]} onChange={handleDocChange} className="hidden" />
            <div className={`w-4 h-4 rounded flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${docs[item] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border border-slate-300 bg-white'}`}>{docs[item] && <Check className="w-3 h-3" />}</div>
            <span className={`text-[11px] sm:text-xs font-semibold truncate ${docs[item] ? 'text-emerald-800' : 'text-slate-700'}`}>
              <span className="sm:hidden">{docLabels[item].short}</span><span className="hidden sm:inline">{docLabels[item].long}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Dokumen Pendukung Lainnya</label>
        <input type="text" name="dok_lain" value={docs.dok_lain} onChange={handleDocChange} placeholder="Misal: Piagam Kejuaraan" className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500" />
      </div>
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <button type="submit" className="flex items-center py-2.5 px-6 rounded-lg text-sm font-bold text-emerald-900 bg-amber-400 hover:bg-amber-500 transition shadow-sm">Lanjut Isi Biodata <ChevronRight className="ml-1 w-4 h-4" /></button>
      </div>
    </form>
  );
}