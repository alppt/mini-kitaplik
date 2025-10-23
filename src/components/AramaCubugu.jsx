import React from 'react';

// Bu bir "Controlled Component" örneğidir.
// Değeri ve değişimini props olarak App bileşeninden alır.
function AramaCubugu({ aramaMetni, onArama }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Başlık veya yazar ara..."
      value={aramaMetni}
      onChange={(e) => onArama(e.target.value)}
    />
  );
}

export default AramaCubugu;