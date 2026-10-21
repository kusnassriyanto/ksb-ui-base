import type { Meta, StoryObj } from '@storybook/react-vite'
import { CrudPage } from './crud-page'
import type { Column } from './list-page'

type Item = { id: string; nama: string; stok: number }

const columns: Column<Item>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'stok', header: 'Stok', render: (r) => r.stok },
]

const meta = {
  title: 'blocks/CrudPage',
  component: CrudPage<Item>,
  args: {
    title: 'Produk',
    noun: 'produk',
    columns,
    fields: [
      { key: 'nama', label: 'Nama' },
      { key: 'stok', label: 'Stok', type: 'number' },
    ],
    initialRows: [
      { id: '1', nama: 'Kertas A4', stok: 120 },
      { id: '2', nama: 'Tinta Printer', stok: 35 },
    ],
    searchText: (r) => r.nama,
  },
} satisfies Meta<typeof CrudPage<Item>>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
