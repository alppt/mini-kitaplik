import React from 'react';

// Bu da bir "Controlled Component". Seçili kategori ve değişim eventi
// parent olan App bileşeninden yönetilir.
function KategoriFiltre({ kategoriler, seciliKategori, onKategoriDegistir }) {
  return (
    <select
      className="category-select"
      value={seciliKategori}
      onChange={(e) => onKategoriDegistir(e.target.value)}
    >
      <option value="Tümü">Tümü</option>
      {kategoriler.map((kategori) => (
        <option key={kategori} value={kategori}>
          {kategori}
        </option>
      ))}
    </select>
  );
}

export default KategoriFiltre;