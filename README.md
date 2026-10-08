# test-ui

Starter UI: React + Vite + TypeScript + Tailwind v4 + shadcn/ui (base-nova) + Storybook.
Dirancang agar AI coding assistant menyusun komponen yang sudah ada, bukan mendesain dari nol.

## Mulai

```bash
npm install
npm run dev          # aplikasi
npm run storybook    # katalog komponen di http://localhost:6010
npm run lint         # oxlint + pemeriksaan token tema
npm run build
```

## Struktur

```
.storybook/              konfigurasi Storybook
scripts/check-tokens.mjs larang warna hardcode di kode aplikasi
src/components/ui/       komponen dasar shadcn + *.stories.tsx
src/blocks/              blok halaman (komposisi komponen ui)
src/lib/utils.ts         helper cn
src/index.css            satu-satunya sumber token tema
AGENTS.md  CLAUDE.md     aturan kerja untuk AI
```

## Menambah komponen shadcn

```bash
npx shadcn@latest add <nama>
```

Lalu buat `src/components/ui/<nama>.stories.tsx` dan tambahkan satu baris di katalog `AGENTS.md`. Jangan mengubah isi `src/components/ui/*` tanpa alasan desain.

## Menambah blok

1. Buat `src/blocks/<nama>.tsx` (komposisi komponen `ui`, hanya token tema).
2. Buat `src/blocks/<nama>.stories.tsx` (title `blocks/<Nama>`).
3. Tambahkan satu baris di bagian Blok pada `AGENTS.md`.

## Mengubah tema

Edit variabel oklch di `src/index.css` (`:root` dan `.dark`). Warna utama: biru `#2563eb` (`--primary`, `--ring`). Jangan menulis warna langsung di komponen; `npm run lint` akan menolaknya.

## MCP (opsional)

`.mcp.json` mendaftarkan MCP shadcn dan Storybook (aktif saat `npm run storybook` berjalan).
