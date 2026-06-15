import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { API_URL } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import Step1Kelengkapan from './components/step1';
import Step2Biodata from './components/step2';
import AdminDashboard from './components/AdminDashboard';

const initialDocs = {
  ijazah: false, kk: false, akte: false, foto: false, kip: false, kks: false, pkh: false, kis: false, ktp_ayah: false, ktp_ibu: false, dok_lain: ''
};

const initialBio = {
  no_registrasi: '', nama: '', nisn: '', jk: 'Laki-laki', tempat_lahir: '', tanggal_lahir: '', nik: '',
  alamat: '', rt: '', rw: '', dusun: '', kelurahan: '', kecamatan: '', kabupaten: '', kode_pos: '',
  sekolah_asal: '', anak_ke: '', no_kk: '', jml_saudara: '', no_hp: '', jenis_tinggal: 'Bersama Orang Tua', 
  nama_ayah: '', pekerjaan_ayah: '', nik_ayah: '', nama_ibu: '', pekerjaan_ibu: '', nik_ibu: '',
  nama_wali: '', pekerjaan_wali: '', nik_wali: '', no_kip: '', no_kks: '', no_pkh: '', no_kis: ''
};

export default function App() {
  const [currentView, setCurrentView] = useState('form'); 
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedReg, setSavedReg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [docs, setDocs] = useState(initialDocs);
  const [bio, setBio] = useState(initialBio);

  const dataWilayah = {
    "Caruy_Cipari": { kelurahan: "Caruy", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Sidasari_Cipari": { kelurahan: "Sidasari", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Kutasari_Cipari": { kelurahan: "Kutasari", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Karangreja_Cipari": { kelurahan: "Karangreja", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Cipari_Cipari": { kelurahan: "Cipari", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Pegadingan_Cipari": { kelurahan: "Pegadingan", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Segaralangu_Cipari": { kelurahan: "Segaralangu", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Mulyadadi_Cipari": { kelurahan: "Mulyadadi", kecamatan: "Cipari", kabupaten: "Cilacap", kode_pos: "53262" },
    "Karangreja_Cimanggu": { kelurahan: "Karangreja", kecamatan: "Cimanggu", kabupaten: "Cilacap", kode_pos: "53256" },
    "Rejodadi_Cimanggu": { kelurahan: "Rejodadi", kecamatan: "Cimanggu", kabupaten: "Cilacap", kode_pos: "53256" },
    "Cimanggu_Cimanggu": { kelurahan: "Cimanggu", kecamatan: "Cimanggu", kabupaten: "Cilacap", kode_pos: "53256" }
  };

  const handleDocChange = (e) => {
    const { name, type, checked, value } = e.target;
    setDocs(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBioChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pilih_desa_cepat') {
      if (value && dataWilayah[value]) {
        setBio(prev => ({ ...prev, kelurahan: dataWilayah[value].kelurahan, kecamatan: dataWilayah[value].kecamatan, kabupaten: dataWilayah[value].kabupaten, kode_pos: dataWilayah[value].kode_pos }));
      } else {
        setBio(prev => ({ ...prev, kelurahan: '', kecamatan: '', kabupaten: '', kode_pos: '' }));
      }
      return; 
    }
    setBio(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handlePrevStep = () => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  
  const resetForm = () => { 
    setDocs(initialDocs); 
    setBio(initialBio); 
    setSuccess(false); 
    setStep(1); 
    setErrorMsg(''); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(''); 
    const payload = { ...docs, ...bio, action: 'create' };
    try {
      const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.status === 'success') {
        setSavedReg(result.no_registrasi);
        setSuccess(true);
      } else { setErrorMsg("Kesalahan Server: " + result.message); }
    } catch (error) { setErrorMsg("Gagal terhubung. Pastikan internet stabil."); }
    setLoading(false);
  };

  const toggleView = () => { setCurrentView(prev => prev === 'form' ? 'admin' : 'form'); };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header currentView={currentView} toggleView={toggleView} />
      <main className="flex-grow max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {currentView === 'admin' ? (
          <AdminDashboard />
        ) : success ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm mx-auto border border-emerald-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-emerald-600" /></div>
            <h2 className="text-xl font-bold text-slate-800">Berhasil Daftar!</h2>
            <div className="my-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <span className="block text-[10px] font-bold text-amber-700 uppercase mb-1">No. Registrasi</span>
              <p className="text-xl font-mono font-bold text-emerald-900">{savedReg}</p>
            </div>
            <button onClick={resetForm} className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">Kembali / Input Siswa Lain</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-6 max-w-4xl mx-auto">
              <div className={`flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${step === 1 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'text-slate-400'}`}>1 Berkas</div>
              <div className="w-8 h-0.5 bg-slate-300 mx-1"></div>
              <div className={`flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${step === 2 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'text-slate-400'}`}>2 Biodata</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
              {step === 1 && <Step1Kelengkapan bio={bio} docs={docs} handleBioChange={handleBioChange} handleDocChange={handleDocChange} onNext={handleNextStep} />}
              {step === 2 && <Step2Biodata bio={bio} docs={docs} handleBioChange={handleBioChange} onBack={handlePrevStep} onSubmit={handleSubmit} loading={loading} error={errorMsg} />}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}