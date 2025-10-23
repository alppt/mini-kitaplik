import React from 'react';

function FavoriPaneli({ favoriler, onFavoriKaldir }) {
  return (
    <div className="favori-paneli">
      <h3>Favoriler ({favoriler.length})</h3>
      {favoriler.length > 0 ? (
        <ul>
          {favoriler.map((kitap) => (
            <li key={kitap.id}>
              <span>{kitap.baslik}</span>
              <button
                onClick={() => onFavoriKaldir(kitap.id)}
                className="btn btn-kaldir"
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz favori kitap eklenmedi.</p>
      )}
    </div>
  );
}

export default FavoriPaneli;