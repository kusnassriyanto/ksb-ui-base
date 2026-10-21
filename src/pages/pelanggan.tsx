import { CrudPage } from '@/blocks/crud-page'
import type { Column } from '@/blocks/list-page'
import { PELANGGAN, type Pelanggan } from '@/mocks/pelanggan'

const columns: Column<Pelanggan>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'kota', header: 'Kota', render: (r) => r.kota },
]

export default function PelangganPage() {
  return (
    <CrudPage
      title="Pelanggan"
      noun="pelanggan"
      columns={columns}
      fields={[
        { key: 'nama', label: 'Nama' },
        { key: 'kota', label: 'Kota' },
      ]}
      initialRows={PELANGGAN}
      searchText={(r) => `${r.nama} ${r.kota}`}
    />
  )
}
