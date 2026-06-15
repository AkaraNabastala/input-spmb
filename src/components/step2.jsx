import React from 'react';
import { ChevronLeft, Send, UserCheck, AlertCircle } from 'lucide-react';

const InputLabel = ({ label, isRequired }) => (
  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
    {label} {isRequired && <span className="text-red-500 font-bold">*</span>}
  </label>
);

export default function Step2Biodata({ bio, docs, handleBioChange, onBack, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="animate-in fade-in duration-300">
      <div className="p-5 sm:px-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><UserCheck className="w-5 h-5" /></div>
          <div><h2 className="text-lg font-bold text-slate-800">Formulir Pendaftaran</h2><p className="text-xs text-slate-500">Tanda <span className="text-red-500 font-bold">*</span> wajib diisi.</p></div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        <div>
          <h3 className="text-xs font-bold text-emerald-600 uppercase mb-4 border-b border-emerald-100 pb-1">1. Identitas Siswa</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2"><InputLabel label="Nama Lengkap" isRequired={true} /><input required type="text" name="nama" value={bio.nama} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500" /></div>
            <div><InputLabel label="Jenis Kelamin" isRequired={true} /><select required name="jk" value={bio.jk} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500"><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option></select></div>
            <div><InputLabel label="NISN" isRequired={docs.ijazah} /><input required={docs.ijazah} type="text" inputMode="numeric" name="nisn" value={bio.nisn} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="NIK Siswa" isRequired={docs.kk} /><input required={docs.kk} type="text" inputMode="numeric" name="nik" value={bio.nik} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="No. Handphone" /><input type="text" inputMode="numeric" name="no_hp" value={bio.no_hp} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Tempat Lahir" isRequired={docs.akte} /><input required={docs.akte} type="text" name="tempat_lahir" value={bio.tempat_lahir} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Tanggal Lahir" isRequired={docs.akte} /><input required={docs.akte} type="date" name="tanggal_lahir" value={bio.tanggal_lahir} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Sekolah Asal" isRequired={docs.ijazah} /><input required={docs.ijazah} type="text" name="sekolah_asal" value={bio.sekolah_asal} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Anak Ke-" isRequired={docs.kk} /><input required={docs.kk} type="number" name="anak_ke" value={bio.anak_ke} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Jml Sdr" isRequired={docs.kk} /><input required={docs.kk} type="number" name="jml_saudara" value={bio.jml_saudara} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-emerald-600 uppercase mb-4 border-b border-emerald-100 pb-1">2. Domisili</h3>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-4">
            <InputLabel label="Cari Cepat Wilayah" />
            <select name="pilih_desa_cepat" onChange={handleBioChange} className="w-full border border-emerald-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-emerald-900">
              <option value="">-- Ketik Manual --</option>
              <optgroup label="Kec. Cipari"><option value="Caruy_Cipari">Desa Caruy</option><option value="Sidasari_Cipari">Desa Sidasari</option><option value="Kutasari_Cipari">Desa Kutasari</option><option value="Karangreja_Cipari">Desa Karangreja (Cipari)</option><option value="Cipari_Cipari">Desa Cipari</option><option value="Pegadingan_Cipari">Desa Pegadingan</option><option value="Segaralangu_Cipari">Desa Segaralangu</option><option value="Mulyadadi_Cipari">Desa Mulyadadi</option></optgroup>
              <optgroup label="Kec. Cimanggu"><option value="Karangreja_Cimanggu">Desa Karangreja (Cimanggu)</option><option value="Rejodadi_Cimanggu">Desa Rejodadi</option><option value="Cimanggu_Cimanggu">Desa Cimanggu</option></optgroup>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-4"><InputLabel label="Jalan/Kampung" isRequired={docs.kk} /><input required={docs.kk} type="text" name="alamat" value={bio.alamat} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="RT" isRequired={docs.kk} /><input required={docs.kk} type="text" name="rt" value={bio.rt} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="RW" isRequired={docs.kk} /><input required={docs.kk} type="text" name="rw" value={bio.rw} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div className="col-span-2"><InputLabel label="Dusun" isRequired={docs.kk} /><input required={docs.kk} type="text" name="dusun" value={bio.dusun} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div className="col-span-2"><InputLabel label="Kelurahan" isRequired={docs.kk} /><input required={docs.kk} type="text" name="kelurahan" value={bio.kelurahan} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm bg-slate-50" /></div>
            <div className="col-span-2"><InputLabel label="Kecamatan" isRequired={docs.kk} /><input required={docs.kk} type="text" name="kecamatan" value={bio.kecamatan} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm bg-slate-50" /></div>
            <div className="col-span-2"><InputLabel label="Kabupaten" isRequired={docs.kk} /><input required={docs.kk} type="text" name="kabupaten" value={bio.kabupaten} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm bg-slate-50" /></div>
            <div className="col-span-2"><InputLabel label="Kode Pos" isRequired={docs.kk} /><input required={docs.kk} type="text" inputMode="numeric" name="kode_pos" value={bio.kode_pos} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm bg-slate-50" /></div>
          </div>
        </div>

        {(docs.kip || docs.kks || docs.pkh || docs.kis) && (
          <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
            <h3 className="text-xs font-bold text-amber-800 uppercase mb-4">Nomor Bantuan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {docs.kip && <div><InputLabel label="No KIP" isRequired={true} /><input required type="text" name="no_kip" value={bio.no_kip} onChange={handleBioChange} className="w-full border border-amber-300 rounded-md py-2 px-3 text-sm" /></div>}
              {docs.kks && <div><InputLabel label="No KKS" isRequired={true} /><input required type="text" name="no_kks" value={bio.no_kks} onChange={handleBioChange} className="w-full border border-amber-300 rounded-md py-2 px-3 text-sm" /></div>}
              {docs.pkh && <div><InputLabel label="No PKH" isRequired={true} /><input required type="text" name="no_pkh" value={bio.no_pkh} onChange={handleBioChange} className="w-full border border-amber-300 rounded-md py-2 px-3 text-sm" /></div>}
              {docs.kis && <div><InputLabel label="No KIS" isRequired={true} /><input required type="text" name="no_kis" value={bio.no_kis} onChange={handleBioChange} className="w-full border border-amber-300 rounded-md py-2 px-3 text-sm" /></div>}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xs font-bold text-emerald-600 uppercase mb-4 border-b border-emerald-100 pb-1">3. Data Keluarga</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div><InputLabel label="No KK" isRequired={docs.kk} /><input required={docs.kk} type="text" inputMode="numeric" name="no_kk" value={bio.no_kk} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div>
              <InputLabel label="Jenis Tinggal" isRequired={true} />
              <select required name="jenis_tinggal" value={bio.jenis_tinggal} onChange={handleBioChange} className="w-full border border-slate-300 rounded-md py-2 px-3 text-sm">
                <option value="Bersama Orang Tua">Bersama Orang Tua</option><option value="Bersama Wali">Bersama Wali</option><option value="Kost">Kost</option><option value="Asrama">Asrama</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase">Ayah</h4>
              <div><InputLabel label="Nama Ayah" isRequired={docs.kk || docs.ktp_ayah} /><input required={docs.kk || docs.ktp_ayah} type="text" name="nama_ayah" value={bio.nama_ayah} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
              <div><InputLabel label="Pekerjaan" isRequired={docs.kk || docs.ktp_ayah} /><input required={docs.kk || docs.ktp_ayah} type="text" name="pekerjaan_ayah" value={bio.pekerjaan_ayah} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
              <div><InputLabel label="NIK Ayah" isRequired={docs.kk || docs.ktp_ayah} /><input required={docs.kk || docs.ktp_ayah} type="text" inputMode="numeric" name="nik_ayah" value={bio.nik_ayah} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase">Ibu</h4>
              <div><InputLabel label="Nama Ibu" isRequired={docs.kk || docs.ktp_ibu} /><input required={docs.kk || docs.ktp_ibu} type="text" name="nama_ibu" value={bio.nama_ibu} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
              <div><InputLabel label="Pekerjaan" isRequired={docs.kk || docs.ktp_ibu} /><input required={docs.kk || docs.ktp_ibu} type="text" name="pekerjaan_ibu" value={bio.pekerjaan_ibu} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
              <div><InputLabel label="NIK Ibu" isRequired={docs.kk || docs.ktp_ibu} /><input required={docs.kk || docs.ktp_ibu} type="text" inputMode="numeric" name="nik_ibu" value={bio.nik_ibu} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            </div>
          </div>
        </div>

        {bio.jenis_tinggal === 'Bersama Wali' && (
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="sm:col-span-3"><h4 className="text-[10px] font-bold text-emerald-700 uppercase">Identitas Wali</h4></div>
            <div><InputLabel label="Nama Wali" isRequired={true} /><input required type="text" name="nama_wali" value={bio.nama_wali} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="Pekerjaan Wali" isRequired={true} /><input required type="text" name="pekerjaan_wali" value={bio.pekerjaan_wali} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
            <div><InputLabel label="NIK Wali" isRequired={true} /><input required type="text" inputMode="numeric" name="nik_wali" value={bio.nik_wali} onChange={handleBioChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm" /></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 mt-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div><h4 className="text-sm font-bold text-red-800">Gagal Menyimpan</h4><p className="text-xs text-red-600 mt-1">{error}</p></div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-200">
          <button type="button" onClick={onBack} className="w-full sm:w-1/3 flex items-center justify-center py-3 px-4 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 transition"><ChevronLeft className="w-4 h-4 mr-1" /> Kembali</button>
          <button type="submit" disabled={loading} className="w-full sm:w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 transition">{loading ? 'Menyimpan Data...' : <><Send className="mr-2 w-4 h-4" /> Simpan Data</>}</button>
        </div>
      </div>
    </form>
  );
}