// Data simulasi untuk halaman Dashboard. Ganti dengan data API saat tersedia.

export const KPI = [
  { key: 'rute', tone: 'primary', value: 42, label: 'Kendaraan di rute', change: 18.2 },
  { key: 'error', tone: 'warning', value: 8, label: 'Kendaraan bermasalah', change: -8.7 },
  { key: 'melenceng', tone: 'destructive', value: 27, label: 'Menyimpang dari rute', change: 4.3 },
  { key: 'terlambat', tone: 'info', value: 13, label: 'Kendaraan terlambat', change: -2.5 },
] as const

export const STATUS_KENDARAAN = [
  { key: 'jalan', label: 'Dalam perjalanan', durasi: '2j 10m', persen: 39.7 },
  { key: 'bongkar', label: 'Bongkar muat', durasi: '3j 15m', persen: 28.3 },
  { key: 'muat', label: 'Memuat', durasi: '1j 24m', persen: 17.4 },
  { key: 'tunggu', label: 'Menunggu', durasi: '5j 19m', persen: 14.6 },
] as const

export const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/** 10 hari data pengiriman (batang) dan pengantaran (garis), stabil per bulan. */
export function statistikPengiriman(bulan: string) {
  let seed = (BULAN.indexOf(bulan) + 1) * 9301
  const rand = () => {
    seed = (seed * 49297 + 233280) % 233280
    return seed / 233280
  }
  return Array.from({ length: 10 }, (_, i) => ({
    hari: `${i + 1} ${bulan.slice(0, 3)}`,
    pengiriman: Math.round((25 + rand() * 25) * 10) / 10,
    pengantaran: Math.round((18 + rand() * 24) * 10) / 10,
  }))
}

export const PERFORMA_PENGIRIMAN = [
  { key: 'transit', label: 'Paket dalam transit', nilai: '10 rb', perubahan: 25.8, tone: 'primary' },
  { key: 'antar', label: 'Paket sedang diantar', nilai: '5 rb', perubahan: 4.3, tone: 'info' },
  { key: 'tiba', label: 'Paket terkirim', nilai: '15 rb', perubahan: -12.5, tone: 'success' },
  { key: 'sukses', label: 'Tingkat keberhasilan', nilai: '95%', perubahan: 35.6, tone: 'warning' },
  { key: 'waktu', label: 'Rata-rata waktu kirim', nilai: '2,5 hari', perubahan: -15.5, tone: 'destructive' },
] as const

export const ALASAN_PENGECUALIAN = [
  { key: 'alamat', label: 'Alamat salah', persen: 13 },
  { key: 'cuaca', label: 'Cuaca buruk', persen: 25 },
  { key: 'libur', label: 'Hari libur nasional', persen: 26 },
  { key: 'rusak', label: 'Rusak saat transit', persen: 36 },
] as const

export const PESANAN_PER_NEGARA = {
  baru: [
    { negara: 'Indonesia', jumlah: 8_540, perubahan: 12.4 },
    { negara: 'Malaysia', jumlah: 4_120, perubahan: 3.1 },
    { negara: 'Singapura', jumlah: 3_260, perubahan: -2.6 },
    { negara: 'Thailand', jumlah: 2_815, perubahan: 7.9 },
  ],
  disiapkan: [
    { negara: 'Indonesia', jumlah: 5_210, perubahan: 6.8 },
    { negara: 'Vietnam', jumlah: 2_930, perubahan: 9.2 },
    { negara: 'Malaysia', jumlah: 2_475, perubahan: -1.4 },
    { negara: 'Filipina', jumlah: 1_760, perubahan: 4.5 },
  ],
  dikirim: [
    { negara: 'Indonesia', jumlah: 9_880, perubahan: 15.3 },
    { negara: 'Thailand', jumlah: 3_640, perubahan: -3.8 },
    { negara: 'Singapura', jumlah: 2_990, perubahan: 5.7 },
    { negara: 'Vietnam', jumlah: 2_205, perubahan: 8.1 },
  ],
} as const
