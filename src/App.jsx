import { useState, useEffect } from 'react';
import './App.css';
import AramaCubugu from './components/AramaCubugu';
import KategoriFiltre from './components/KategoriFiltre';
import KitapListe from './components/KitapListe';
import FavoriPaneli from './components/FavoriPaneli';

// Proje için sabit kitap verisi
const kitaplarData = [
  { id: 1, baslik: 'React\'e Giriş', yazar: 'D. Usta', kategori: 'Web' },
  { id: 2, baslik: 'İleri JavaScript', yazar: 'S. Kılıç', kategori: 'Web' },
  { id: 3, baslik: 'Veri Yapıları', yazar: 'A. Demir', kategori: 'CS' },
  { id: 4, baslik: 'Algoritmalar', yazar: 'E. Kaya', kategori: 'CS' },
  { id: 5, baslik: 'UI/UX Temelleri', yazar: 'N. Akın', kategori: 'Tasarım' },
];

// Kitap kategorilerini veriden otomatik olarak alalım (tekrar etmeyecek şekilde)
const tumKategoriler = [...new Set(kitaplarData.map(k => k.kategori))];

function App() {
  // --- STATE'LER ---
  // useState hook'u ile bileşenin durumlarını yönetiyoruz.

  // Arama metni state'i. Başlangıç değerini localStorage'dan alıyoruz.
  const [aramaMetni, setAramaMetni] = useState(() => {
    return localStorage.getItem('aramaMetni') || '';
  });

  // Seçili kategori state'i.
  const [seciliKategori, setSeciliKategori] = useState('Tümü');

  // Favoriler state'i. Başlangıç değerini localStorage'dan alıyoruz.
  const [favoriler, setFavoriler] = useState(() => {
    const kayitliFavoriler = localStorage.getItem('favoriler');
    return kayitliFavoriler ? JSON.parse(kayitliFavoriler) : [];
  });

  // --- SIDE-EFFECTS ---
  // useEffect hook'u, bileşen her render olduğunda veya belirli bağımlılıklar değiştiğinde çalışır.
  // Burada favoriler veya arama metni değiştiğinde localStorage'a kaydetmek için kullanıyoruz.
  // Bu, sayfa yenilendiğinde verilerin kaybolmamasını sağlar.

  useEffect(() => {
    localStorage.setItem('favoriler', JSON.stringify(favoriler));
  }, [favoriler]); // Sadece 'favoriler' state'i değiştiğinde çalış

  useEffect(() => {
    localStorage.setItem('aramaMetni', aramaMetni);
  }, [aramaMetni]); // Sadece 'aramaMetni' state'i değiştiğinde çalış


  // --- HANDLER FONKSİYONLARI ---
  // Olayları (event) yöneten fonksiyonlar. Bunları alt bileşenlere prop olarak geçiririz (Callback Handler).

  const handleFavoriToggle = (kitapId) => {
    const favorideMi = favoriler.some(kitap => kitap.id === kitapId);

    if (favorideMi) {
      // Zaten favorideyse, favorilerden çıkar
      setFavoriler(favoriler.filter(kitap => kitap.id !== kitapId));
    } else {
      // Favoride değilse, favorilere ekle
      const eklenecekKitap = kitaplarData.find(kitap => kitap.id === kitapId);
      setFavoriler([...favoriler, eklenecekKitap]);
    }
  };
  
  // Arama state'ini güncelleyen handler.
  const handleArama = (metin) => {
    setAramaMetni(metin);
  };
  
  // Kategori state'ini güncelleyen handler.
  const handleKategoriDegistir = (kategori) => {
    setSeciliKategori(kategori);
  }

  // --- FİLTRELEME MANTIĞI ---
  // Gösterilecek kitapları arama metni ve kategoriye göre filtrele
  const filtrelenmisKitaplar = kitaplarData.filter(kitap => {
    const kategoriKontrol = seciliKategori === 'Tümü' || kitap.kategori === seciliKategori;
    const aramaKontrol = kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
                         kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());
    return kategoriKontrol && aramaKontrol;
  });

  // Tüm state ve handler'lar bu ana bileşende tutulup, ilgili alt bileşenlere
  // props olarak gönderilir. Bu desene "Lifting State Up" (State'i Yukarı Taşıma) denir.
  return (
    // React.Fragment (<>...</>) birden fazla elementi tek bir root olmadan döndürmemizi sağlar.
    <>
      <div className="app-container">
        <header className="header">
          <h1>Mini Kitaplık</h1>
        </header>
        <div className="controls">
          <AramaCubugu aramaMetni={aramaMetni} onArama={handleArama} />
          <KategoriFiltre 
            kategoriler={tumKategoriler}
            seciliKategori={seciliKategori}
            onKategoriDegistir={handleKategoriDegistir}
          />
        </div>
        <main className="main-content">
          <KitapListe 
            kitaplar={filtrelenmisKitaplar} 
            onFavoriToggle={handleFavoriToggle}
            favoriler={favoriler}
          />
          <FavoriPaneli 
            favoriler={favoriler}
            onFavoriKaldir={handleFavoriToggle} // Toggle fonksiyonu burada kaldırma işlevi görür
          />
        </main>
      </div>
    </>
  );
}

export default App;