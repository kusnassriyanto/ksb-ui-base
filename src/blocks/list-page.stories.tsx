import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'
import { ListPage, type Column } from './list-page'

type Pengguna = { id: string; nama: string; email: string; status: 'Aktif' | 'Nonaktif' }

const data: Pengguna[] = [
  { id: '1', nama: 'Budi Santoso', email: 'budi@contoh.com', status: 'Aktif' },
  { id: '2', nama: 'Sari Wulandari', email: 'sari@contoh.com', status: 'Aktif' },
  { id: '3', nama: 'Agus Pratama', email: 'agus@contoh.com', status: 'Nonaktif' },
]

const columns: Column<Pengguna>[] = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'email', header: 'Email', render: (r) => r.email },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <Badge variant={r.status === 'Aktif' ? 'default' : 'secondary'}>{r.status}</Badge>,
  },
]

const meta = {
  title: 'blocks/ListPage',
  component: ListPage<Pengguna>,
  args: {
    title: 'Pengguna',
    columns,
    rows: data,
    rowKey: (r) => r.id,
    searchText: (r) => `${r.nama} ${r.email}`,
    onCreate: () => {},
    createLabel: 'Tambah pengguna',
  },
} satisfies Meta<typeof ListPage<Pengguna>>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TanpaTombolTambah: Story = { args: { onCreate: undefined } }
