# Panduan: menu dan warna

Panduan untuk manusia. Semua langkah bisa dikerjakan sendiri, atau diserahkan ke AI coding assistant
dengan contoh prompt di tiap bagian. Aturan untuk AI ada di `AGENTS.md` (jangan dicampur ke sini).

## 1. Menu

Menu didefinisikan di satu tempat: `MENU` pada `src/config/menu.ts`. Sidebar, route, dan breadcrumb
dibangun otomatis dari daftar itu. Satu menu = satu file halaman di `src/pages/`.

Bentuk data:

```ts
type MenuItem  = { label: string; path: string; icon: LucideIcon; component: ComponentType }
type MenuGroup = { label?: string; items: MenuItem[] }   // label kosong = grup tanpa judul
```

### Menambah menu ke grup yang ada

Contoh: menu **Supplier** di grup *Master Data*.

1. Buat `src/pages/supplier.tsx` dengan `export default` komponen halaman. Untuk halaman daftar,
   salin `src/pages/pelanggan.tsx` (memakai blok `ListPage`), lalu ganti data dan kolomnya.
2. Di `src/config/menu.ts`, impor halaman dan ikonnya, lalu tambahkan item:

   ```ts
   import { Truck, Users, Boxes, Factory /* ... */ } from 'lucide-react'
   import Supplier from '@/pages/supplier'

   { label: 'Supplier', path: '/supplier', icon: Factory, component: Supplier },
   ```

3. Selesai. Route dan breadcrumb otomatis ikut. Tidak ada file lain yang diubah.

Ikon: pilih dari <https://lucide.dev/icons> dan impor namanya dari `lucide-react`.

### Membuat grup baru

Tambahkan satu objek di `MENU`:

```ts
{ label: 'Gudang', items: [
  { label: 'Stok', path: '/stok', icon: Boxes, component: Stok },
] },
```

### Mengubah urutan, mengganti nama, menghapus

- Urutan: pindahkan objek di dalam `MENU` atau `items`.
- Ganti nama: ubah `label`.
- Hapus: hapus itemnya, lalu hapus file halaman dan impornya (jika tidak dipakai lagi, build akan memberi
  peringatan impor tidak terpakai).

### Contoh prompt untuk AI

```
Tambahkan menu "Supplier" di grup Master Data (ikon Factory).
Halamannya daftar dengan kolom nama, kota, telepon (data contoh 3 baris), pakai blok ListPage.
Hanya ubah src/config/menu.ts dan buat src/pages/supplier.tsx. Jalankan npm run lint dan npm run build.
```

```
Ubah menu menjadi: Dashboard; Penjualan (Order, Faktur); Stok; Pengaturan.
Hapus halaman yang tidak terpakai. Jalankan npm run lint dan npm run build.
```

## 2. Warna

Semua warna ada di satu file: `src/index.css`, dalam dua blok: `:root` (mode terang) dan `.dark`
(mode gelap). Komponen hanya memakai token seperti `bg-primary` dan `text-muted-foreground`,
jadi mengubah nilai di sini langsung berlaku ke seluruh aplikasi dan Storybook.

### Mengganti warna utama

Warna utama saat ini biru `#2563eb`. Yang diubah ada tiga variabel, di **kedua** blok (`:root` dan `.dark`):

| Variabel | Fungsi |
| --- | --- |
| `--primary` | warna tombol utama, tautan, elemen aktif |
| `--primary-foreground` | warna teks di atas `--primary` |
| `--ring` | warna cincin fokus |

Agar sidebar ikut, ubah juga `--sidebar-primary` dan `--sidebar-ring`.

Langkah:

1. Pilih warna hex, mis. hijau `#15803d`.
2. Ubah ke format oklch (format yang dipakai file ini). Jalankan di terminal:

   ```bash
   node -e "const h=process.argv[1].replace('#','');const c=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);const[r,g,b]=c;const l=Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b),m=Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b),s=Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);const L=0.2104542553*l+0.793617785*m-0.0040720468*s,A=1.9779984951*l-2.428592205*m+0.4505937099*s,B=0.0259040371*l+0.7827717662*m-0.808675766*s;console.log('oklch('+L.toFixed(3)+' '+Math.hypot(A,B).toFixed(3)+' '+((Math.atan2(B,A)*180/Math.PI+360)%360).toFixed(1)+')')" '#15803d'
   ```

   Hasil: `oklch(0.527 0.137 150.1)`. Alternatif: situs <https://oklch.com>.
3. Tempel hasilnya ke `--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring` di `:root` dan `.dark`.
4. Periksa kontras teks di atas warna itu (lihat di bawah), lalu jalankan `npm run storybook` untuk melihat hasilnya.

Contoh hasil di `src/index.css` (potongan):

```css
:root {
  --primary: oklch(0.527 0.137 150.1);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.527 0.137 150.1);
}
.dark {
  --primary: oklch(0.527 0.137 150.1);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.527 0.137 150.1);
}
```

### Memeriksa kontras

Teks pada tombol utama harus punya rasio kontras minimal **4.5:1**. Periksa di
<https://webaim.org/resources/contrastchecker/> dengan warna hex utama dan warna teks (putih untuk
`--primary-foreground` bawaan).

Contoh nyata: putih di atas hijau `#16a34a` hanya 3.3:1 (tidak lolos), sedangkan `#15803d` 5.0:1 (lolos).
Bila warna pilihan terlalu terang, gelapkan warnanya atau ganti `--primary-foreground` menjadi gelap.

### Menambah warna semantik (mis. `success`)

1. Tambah variabel di `:root` dan `.dark`:

   ```css
   --success: oklch(0.527 0.137 150.1);
   --success-foreground: oklch(0.985 0 0);
   ```

2. Daftarkan di blok `@theme inline` (di atas file yang sama):

   ```css
   --color-success: var(--success);
   --color-success-foreground: var(--success-foreground);
   ```

3. Pakai di komponen: `bg-success text-success-foreground`.

### Hal lain di tema

- Sudut lebih tajam atau bulat: ubah `--radius`.
- Mode gelap memakai blok `.dark`. Ubah nilainya di sana, terpisah dari mode terang.
- Jangan menulis warna langsung di komponen (`#fff`, `bg-[...]`, `bg-blue-500`). `npm run lint` akan menolaknya.

### Contoh prompt untuk AI

```
Ganti warna utama menjadi hijau #15803d. Ubah --primary, --primary-foreground, --ring,
--sidebar-primary, --sidebar-ring di :root dan .dark pada src/index.css (format oklch).
Pastikan kontras teks tombol utama minimal 4.5:1. Jangan edit komponen.
Jalankan npm run lint dan npm run build.
```

```
Tambah warna semantik success (hijau) dan warning (kuning) di src/index.css
mengikuti aturan di AGENTS.md, lalu ubah Badge status "Aktif" memakai bg-success.
```

## 3. Memeriksa hasil

```bash
npm run dev          # lihat aplikasi
npm run storybook    # katalog komponen di http://localhost:6010 (terang dan gelap)
npm run lint         # oxlint + larangan warna hardcode
npm run build
```
