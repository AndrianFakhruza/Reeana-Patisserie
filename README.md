# Ulvoria Patisserie Website

Website landing page untuk Ulvoria Patisserie dengan sistem pemesanan terintegrasi WhatsApp.

## 📁 Struktur File

```
ulvoria-website/
├── index.html          # Halaman utama website
├── order.html          # Halaman form pemesanan
├── style.css           # Semua styling
├── menu-data.js        # Data menu (EDIT DI SINI!)
├── order-form.js       # Logic form pemesanan
└── assets/             # Folder gambar produk
    ├── LogoUlvoria.jpeg
    ├── ChocBanGranola.jpeg
    ├── FudgyBrownies.jpeg
    ├── BurntCheeseCake.jpeg
    ├── TiramisuCake.jpeg
    └── BananaPudding.jpeg
```

## 🛒 Fitur Pemesanan

### Halaman Order (order.html)
Pelanggan dapat:
- ✅ Isi informasi (Nama & No. WhatsApp)
- ✅ Tambah multiple items (bisa pesan lebih dari 1 produk)
- ✅ Pilih menu dan varian untuk setiap item
- ✅ Atur jumlah/quantity
- ✅ Lihat auto-calculate subtotal per item
- ✅ Lihat total harga keseluruhan
- ✅ Tambah catatan/request khusus
- ✅ Kirim semua data ke WhatsApp dalam format rapi

### Flow Pemesanan
1. Klik "Pesan Sekarang" di homepage
2. Isi form pemesanan di `order.html`
3. Klik "Kirim Pesanan via WhatsApp"
4. Otomatis buka WhatsApp dengan pesan terformat

## 🔧 Cara Edit Menu

### 1️⃣ Tambah Menu Baru
Buka file `menu-data.js` dan tambahkan object baru di array `menuItems`:

```javascript
{
    id: 6,  // Nomor urut (increment dari terakhir)
    name: 'Nama Produk Baru',
    description: 'Deskripsi singkat',
    fullDescription: 'Deskripsi lengkap untuk modal',
    price: '50k',
    image: 'assets/NamaProdukBaru.jpeg',
    options: [
        'Opsi 1 : 50k',
        'Opsi 2 : 75k'
    ]
}
```

⚠️ **PENTING**: Format opsi harus ada angka + "k" (contoh: "80k", "110k") agar sistem bisa calculate harga otomatis!

### 2️⃣ Edit Menu yang Ada
Cari menu berdasarkan `id` atau `name`, lalu edit field yang diinginkan:

```javascript
{
    id: 1,
    name: 'ChocoBan Granola',  // ← Edit nama
    description: 'Banana bread dengan granola',  // ← Edit deskripsi
    price: '85k',  // ← Edit harga (yang tampil di card)
    options: [
        '1 loyang ukuran 22x10x7 : 85k'  // ← Edit opsi & harga
    ]
}
```

### 3️⃣ Hapus Menu
Hapus object menu yang tidak diperlukan dari array `menuItems`.

### 4️⃣ Ganti Gambar
1. Upload gambar baru ke folder `assets/`
2. Update field `image` di `menu-data.js`:
   ```javascript
   image: 'assets/NamaGambarBaru.jpeg'
   ```

## 🎨 Cara Edit Styling

Buka file `style.css` untuk mengubah:
- Warna tema
- Font size
- Spacing
- Hover effects
- dll.

Contoh ubah warna:
```css
/* Cari di bagian atas file */
body {
    background-color: #E8D8C4;  /* ← Warna background */
    color: #561C24;              /* ← Warna text */
}
```

## 📱 Fitur Website

✅ Fully responsive (Mobile, Tablet, Desktop)
✅ Smooth scroll & animations
✅ Modal product detail
✅ Form pemesanan lengkap dengan:
   - Multiple items order
   - Auto calculate total price
   - Custom notes/request
   - WhatsApp integration
✅ FAQ accordion
✅ Google Maps embed
✅ Back to top button
✅ Mobile hamburger menu

## 🚀 Deployment

Upload semua file ke hosting:
1. `index.html` (homepage)
2. `order.html` (order form)
3. `style.css`
4. `menu-data.js`
5. `order-form.js`
6. Folder `assets/` beserta semua gambar

**PENTING:** Jangan ubah nama file atau struktur folder agar tidak error!

## 💡 Tips

- **Edit menu:** Hanya edit file `menu-data.js`
- **Edit style:** Hanya edit file `style.css`
- **Edit konten:** Edit langsung di `index.html`
- Semua menu akan auto-render, tidak perlu edit HTML!

## 📞 Support

Jika ada kendala, hubungi developer atau cek dokumentasi di file ini.