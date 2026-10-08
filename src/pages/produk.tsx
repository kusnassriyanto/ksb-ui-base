import { ListPage, type Column } from '@/blocks/list-page'

type Produk = { id: string; nama: string; stok: number }

const data: Produk[] = [
  { id: '1', nama: 'Kertas A4', stok: 120 },
  { id: '2', nama: 'Tinta Printer', stok: 35 },
]

const columns: Column<Produk>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'stok', header: 'Stok', render: (r) => r.stok },
]

export default function ProdukPage() {
  return (
    <ListPage
      title="Produk"
      columns={columns}
      rows={data}
      rowKey={(r) => r.id}
      searchText={(r) => r.nama}
      onCreate={() => {}}
      createLabel="Tambah produk"
    />
  )
}
