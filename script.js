/**
 * Fungsi untuk mengatur navigasi halaman (Tabs/Routing sederhana)
 * @param {string} pageId - ID dari section target (cth: 'home', 'about')
 * @param {HTMLElement} btn - Elemen tombol aktif yang diklik
 */
function showPage(pageId, btn) {
  // 1. Sembunyikan semua element <section>
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    sec.classList.remove('active');
  });

  // 2. Tampilkan section yang dituju berdasarkan ID
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // 3. Hapus kelas 'active' dari semua tombol navigasi
  const navButtons = document.querySelectorAll('.nav-links button');
  navButtons.forEach(button => {
    button.classList.remove('active');
  });

  // 4. Tambahkan kembali kelas 'active' ke tombol yang sedang diklik
  if (btn) {
    btn.classList.add('active');
  }

  // Bonus: Scroll otomatis ke bagian atas layar setiap berganti halaman
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 
 
function kirimKeBackend(event) {
    event.preventDefault(); // Mencegah halaman reload otomatis

    // 1. Mengambil teks yang diketik user di form input
    const namaInput = document.getElementById('contact-name').value;
    const bisnisInput = document.getElementById('contact-company').value;
    const pesanInput = document.getElementById('contact-message').value;

    // 2. Mengirim data tersebut ke Server Node.js (Port 3000)
    fetch('http://localhost:3000/api/konsultasi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nama: namaInput, 
            bisnis: bisnisInput, 
            pesan: pesanInput 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Jika backend merespon sukses, munculkan notifikasi
            alert("Sip! Data konsultasi kamu berhasil terkirim ke server backend.");
            
            // Mengosongkan form kembali setelah sukses
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-company').value = '';
            document.getElementById('contact-message').value = '';
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Waduh, gagal terhubung ke server backend. Pastikan server Node.js sudah dinyalakan!");
    });
}

