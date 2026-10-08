import { ListPage, type Column } from '@/blocks/list-page'

type Pelanggan = { id: string; nama: string; kota: string }

const data: Pelanggan[] = [
  { id: '1', nama: 'PT Maju Jaya', kota: 'Jakarta' },
  { id: '2', nama: 'CV Sinar Terang', kota: 'Bandung' },
]

const columns: Column<Pelanggan>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'kota', header: 'Kota', render: (r) => r.kota },
]

export default function PelangganPage() {
  return (
    <ListPage
      title="Pelanggan"
      columns={columns}
      rows={data}
      rowKey={(r) => r.id}
      searchText={(r) => `${r.nama} ${r.kota}`}
      onCreate={() => {}}
      createLabel="Tambah pelanggan"
    />
  )
}
