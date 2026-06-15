import React, { useState, useEffect } from 'react';
import { RefreshCcw, Database, Trash2, Edit2, X, Save } from 'lucide-react';
import { API_URL } from '../data';

export default function AdminDashboard() {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.status === 'success') setDataSiswa(result.data);
      else setError(result.message);
    } catch (err) { setError("Gagal menarik data."); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (noReg) => {
    if (!window.confirm(`Hapus pendaftar ${noReg}?`)) return;
    setActionLoading(true);
    try {
      const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'delete', no_registrasi: noReg }) });
      const result = await response.json();
      if (result.status === 'success') fetchData();
      else alert("Gagal menghapus: " + result.message);
    } catch (err) { alert("Error jaringan."); }
    setActionLoading(false);
  };

  // Buka Modal Edit dan isi dengan semua data dari row yang dipilih
  const openEditModal = (siswa) => {
    setEditForm({
      no_registrasi: siswa['No_Registrasi'] || siswa['No Registrasi'],
      nama: siswa['Nama'] || '', nisn: siswa['NISN'] || '', jk: siswa['JK'] || 'Laki-laki',
      tempat_lahir: siswa['Tempat Lahir'] || '', tanggal_lahir: siswa['Tanggal Lahir'] || '',
      nik: siswa['NIK'] || '', alamat: siswa['Alamat'] || '', rt: siswa['RT'] || '', rw: siswa['RW'] || '',
      dusun: siswa['Dusun'] || '', kelurahan: siswa['Kelurahan'] || '', kecamatan: siswa['Kecamatan'] || '',
      kabupaten: siswa['Kabupaten'] || '', kode_pos: siswa['Kode Pos'] || '',
      sekolah_asal: siswa['Sekolah Asal'] || '', anak_ke: siswa['Anak ke-berapa'] || siswa['Anak ke'] || '',
      no_kk: siswa['No KK'] || '', jml_saudara: siswa['jml saudara'] || '', no_hp: siswa['no.hp'] || siswa['no_hp'] || '',
      jenis_tinggal: siswa['jenis tinggal'] || 'Bersama Orang Tua',
      nama_ayah: siswa['nama_ayah'] || '', pekerjaan_ayah: siswa['pekerjaan_ayah'] || '', nik_ayah: siswa['nik_ayah'] || '',
      nama_ibu: siswa['nama_ibu'] || '', pekerjaan_ibu: siswa['pekerjaan_ibu'] || '', nik_ibu: siswa['nik_ibu'] || '',
      nama_wali: siswa['nama_wali'] || '', pekerjaan_wali: siswa['pekerjaan_wali'] || '', nik_wali: siswa['nik_wali'] || '',
      no_kip: siswa['no.kip'] || '', no_kks: siswa['no.kks'] || '', no_pkh: siswa['no.pkh'] || '', no_kis: siswa['no_kis'] || siswa['no.kis'] || ''
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ ...editForm, action: 'update' }) });
      const result = await response.json();
      if (result.status === 'success') {
        alert("Data diperbarui!");
        setIsEditing(false);
        fetchData();
      } else { alert("Gagal: " + result.message); }
    } catch (err) { alert("Error jaringan."); }
    setActionLoading(false);
  };

  return (
    <div className="w-full">
      {/* MODAL EDIT PENUH */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mt-10">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-slate-800">Edit Data: {editForm.no_registrasi}</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-500"/></button>
            </div>
            
            <form onSubmit={submitEdit} className="p-6 space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6">
                <div className="col-span-1 md:col-span-3 font-bold text-emerald-700">1. Data Siswa</div>
                <div><label className="block text-xs font-semibold mb-1">Nama</label><input type="text" name="nama" value={editForm.nama} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">NISN</label><input type="text" name="nisn" value={editForm.nisn} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">L/P</label><select name="jk" value={editForm.jk} onChange={handleEditChange} className="w-full border rounded p-2"><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option></select></div>
                <div><label className="block text-xs font-semibold mb-1">NIK</label><input type="text" name="nik" value={editForm.nik} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">Tempat Lahir</label><input type="text" name="tempat_lahir" value={editForm.tempat_lahir} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">Tgl Lahir</label><input type="date" name="tanggal_lahir" value={editForm.tanggal_lahir} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">Sekolah Asal</label><input type="text" name="sekolah_asal" value={editForm.sekolah_asal} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">No HP</label><input type="text" name="no_hp" value={editForm.no_hp} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b pb-6">
                <div className="col-span-2 md:col-span-4 font-bold text-emerald-700">2. Alamat</div>
                <div className="col-span-2 md:col-span-4"><label className="block text-xs font-semibold mb-1">Jalan</label><input type="text" name="alamat" value={editForm.alamat} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">RT</label><input type="text" name="rt" value={editForm.rt} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div><label className="block text-xs font-semibold mb-1">RW</label><input type="text" name="rw" value={editForm.rw} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div className="col-span-2"><label className="block text-xs font-semibold mb-1">Dusun</label><input type="text" name="dusun" value={editForm.dusun} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div className="col-span-2"><label className="block text-xs font-semibold mb-1">Kelurahan</label><input type="text" name="kelurahan" value={editForm.kelurahan} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
                <div className="col-span-2"><label className="block text-xs font-semibold mb-1">Kecamatan</label><input type="text" name="kecamatan" value={editForm.kecamatan} onChange={handleEditChange} className="w-full border rounded p-2"/></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <div className="font-bold text-emerald-700 col-span-1 md:col-span-2">3. Orang Tua & Bansos</div>
                <div className="space-y-3 bg-slate-50 p-4 rounded border">
                  <h4 className="font-bold text-xs text-slate-500">Ayah</h4>
                  <input type="text" name="nama_ayah" value={editForm.nama_ayah} onChange={handleEditChange} placeholder="Nama Ayah" className="w-full border rounded p-2"/>
                  <input type="text" name="pekerjaan_ayah" value={editForm.pekerjaan_ayah} onChange={handleEditChange} placeholder="Pekerjaan" className="w-full border rounded p-2"/>
                  <input type="text" name="nik_ayah" value={editForm.nik_ayah} onChange={handleEditChange} placeholder="NIK Ayah" className="w-full border rounded p-2"/>
                </div>
                <div className="space-y-3 bg-slate-50 p-4 rounded border">
                  <h4 className="font-bold text-xs text-slate-500">Ibu</h4>
                  <input type="text" name="nama_ibu" value={editForm.nama_ibu} onChange={handleEditChange} placeholder="Nama Ibu" className="w-full border rounded p-2"/>
                  <input type="text" name="pekerjaan_ibu" value={editForm.pekerjaan_ibu} onChange={handleEditChange} placeholder="Pekerjaan" className="w-full border rounded p-2"/>
                  <input type="text" name="nik_ibu" value={editForm.nik_ibu} onChange={handleEditChange} placeholder="NIK Ibu" className="w-full border rounded p-2"/>
                </div>
                <div className="space-y-3 bg-amber-50 p-4 rounded border col-span-1 md:col-span-2 grid grid-cols-2 gap-3">
                   <div className="col-span-2"><h4 className="font-bold text-xs text-amber-700">Kartu Bantuan</h4></div>
                   <input type="text" name="no_kip" value={editForm.no_kip} onChange={handleEditChange} placeholder="No KIP" className="w-full border rounded p-2"/>
                   <input type="text" name="no_pkh" value={editForm.no_pkh} onChange={handleEditChange} placeholder="No PKH" className="w-full border rounded p-2"/>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-slate-200 py-4 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold">Batal</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-2">
                  {actionLoading ? 'Menyimpan...' : <><Save className="w-4 h-4"/> Simpan Perubahan</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAMPILAN TABEL ADMIN */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:px-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2"><div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600"><Database className="w-5 h-5" /></div><div><h2 className="text-base font-bold text-slate-800">Database CRUD Admin</h2><p className="text-[10px] text-slate-500">Total data: {dataSiswa.length}</p></div></div>
          <button onClick={fetchData} disabled={loading || actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"><RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-500' : ''}`} /> Refresh</button>
        </div>

        <div className="p-0">
          {loading && dataSiswa.length === 0 ? (<div className="p-10 text-center">Memuat data...</div>) : 
           dataSiswa.length === 0 ? (<div className="p-10 text-center">Belum ada data.</div>) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                <thead>
                  <tr className="bg-slate-100 uppercase text-slate-600 border-b border-slate-200">
                    <th className="px-4 py-3">Aksi</th><th className="px-4 py-3">No. Reg</th><th className="px-4 py-3">Nama</th><th className="px-4 py-3">NISN</th><th className="px-4 py-3">L/P</th><th className="px-4 py-3">Alamat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataSiswa.map((siswa, index) => {
                    const noReg = siswa['No_Registrasi'] || siswa['No Registrasi'];
                    return (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-2 flex gap-1">
                          <button onClick={() => openEditModal(siswa)} className="p-1.5 bg-amber-100 text-amber-700 rounded"><Edit2 className="w-3.5 h-3.5"/></button>
                          <button onClick={() => handleDelete(noReg)} className="p-1.5 bg-red-100 text-red-700 rounded"><Trash2 className="w-3.5 h-3.5"/></button>
                        </td>
                        <td className="px-4 py-2 font-mono font-bold text-emerald-700">{noReg || '-'}</td>
                        <td className="px-4 py-2 font-semibold">{siswa['Nama'] || '-'}</td>
                        <td className="px-4 py-2">{siswa['NISN'] || '-'}</td>
                        <td className="px-4 py-2">{siswa['JK'] === 'Laki-laki' ? 'L' : siswa['JK'] === 'Perempuan' ? 'P' : siswa['JK']}</td>
                        <td className="px-4 py-2 truncate max-w-[200px]">{siswa['Alamat']}, Desa {siswa['Kelurahan']}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}