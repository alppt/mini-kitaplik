import React from 'react';

// Props'ları doğrudan { } içinde almak "destructuring" yöntemidir.
// Bu, props.kitap, props.favorideMi demek yerine doğrudan isimleriyle kullanmamızı sağlar.
function KitapKart({ kitap, onFavoriToggle, favorideMi }) {
  return (
    <div className="kitap-karti">
      <div className="info">
        <h2>{kitap.baslik}</h2>
        <p>{kitap.yazar} · {kitap.kategori}</p>
      </div>
      <button
        onClick={() => onFavoriToggle(kitap.id)}
        className={`btn btn-favori ${favorideMi ? 'favoride' : ''}`}
      >
        {favorideMi ? '★ Favoride' : '☆ Favori Ekle'}
      </button>
    </div>
  );
}

export default KitapKart;