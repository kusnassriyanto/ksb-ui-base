import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table'

const meta = { title: 'ui/Table', component: Table } satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Daftar pengguna</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Peran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Budi Santoso</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sari Wulandari</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
