import { CrudPage } from '@/blocks/crud-page'
import type { Column } from '@/blocks/list-page'
import { PRODUK, type Produk } from '@/mocks/produk'

const columns: Column<Produk>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'stok', header: 'Stok', render: (r) => r.stok },
]

export default function ProdukPage() {
  return (
    <CrudPage
      title="Produk"
      noun="produk"
      columns={columns}
      fields={[
        { key: 'nama', label: 'Nama' },
        { key: 'stok', label: 'Stok', type: 'number' },
      ]}
      initialRows={PRODUK}
      searchText={(r) => r.nama}
    />
  )
}
