import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Navigation Button */}
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Kembali ke halaman sebelumnya"
      >
        &larr; Kembali
      </button>

      <section className="hero-section">
        <h1>Belajar Bersama, Berkembang Bersama</h1>
        <p>Platform kami hadir untuk memudahkan siapa saja yang ingin belajar dan berbagi pengetahuan</p>
      </section>

      <section className="main-content">
        <div className="philosophy">
          <h2>Prinsip Kami</h2>
          <p>
            Kami yakin bahwa pendidikan seharusnya tersedia untuk semua, tanpa hambatan biaya atau akses.
            Dengan semangat gotong royong, kami membangun tempat di mana siapa pun bisa belajar dan mengajar.
          </p>
        </div>

        <div className="goals">
          <div className="learning-goals">
            <h3>Tujuan Pembelajaran</h3>
            <ul>
              <li>Menyediakan materi pembelajaran yang mudah dipahami</li>
              <li>Menghubungkan pembelajar dengan sumber pengetahuan</li>
              <li>Mendorong pembelajaran mandiri dan kolaboratif</li>
            </ul>
          </div>
          
          <div className="community-goals">
            <h3>Tujuan Sosial</h3>
            <ul>
              <li>Memberdayakan masyarakat melalui pengetahuan</li>
              <li>Menciptakan ekosistem berbagi ilmu</li>
              <li>Mendukung pendidikan sepanjang hayat</li>
            </ul>
          </div>
        </div>

        <div className="how-it-works">
          <h2>Cara Kami Bekerja</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <p>Mengumpulkan materi pembelajaran dari berbagai sumber terpercaya</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Menyusunnya secara sistematis untuk memudahkan pemahaman</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Membagikannya secara gratis kepada siapa saja yang membutuhkan</p>
            </div>
          </div>
        </div>

        <div className="join-us">
          <h2>Anda Juga Bisa Berkontribusi</h2>
          <p>
            Platform ini dikembangkan oleh komunitas untuk komunitas. Jika Anda memiliki keahlian tertentu,
            pertimbangkan untuk berbagi pengetahuan Anda dengan orang lain.
          </p>
          <p className="closing">
            Bersama, kita bisa menciptakan dunia di mana belajar adalah hak semua orang.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;