import React from 'react';
import KitapKart from './KitapKart';

function KitapListe({ kitaplar, onFavoriToggle, favoriler }) {
  return (
    <div className="kitap-listesi">
      {kitaplar.map((kitap) => (
        <KitapKart
          key={kitap.id}
          kitap={kitap}
          onFavoriToggle={onFavoriToggle}
          favorideMi={favoriler.some(fav => fav.id === kitap.id)}
        />
      ))}
    </div>
  );
}

export default KitapListe;