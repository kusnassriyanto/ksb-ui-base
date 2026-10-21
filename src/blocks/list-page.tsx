import { useState, type ReactNode } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export type Column<T> = { key: string; header: string; render: (row: T) => ReactNode }

type ListPageProps<T> = {
  title: string
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  searchText: (row: T) => string
  onCreate?: () => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  createLabel?: string
}

/** Blok halaman daftar: judul + cari + tombol tambah + tabel. Isi hanya `columns` dan `rows`. */
export function ListPage<T>({
  title, columns, rows, rowKey, searchText, onCreate, onEdit, onDelete, createLabel = 'Tambah',
}: ListPageProps<T>) {
  const [q, setQ] = useState('')
  const hasActions = Boolean(onEdit || onDelete)
  const shown = rows.filter((r) => searchText(r).toLowerCase().includes(q.toLowerCase()))
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          <Input placeholder="Cari..." value={q} onChange={(e) => setQ(e.target.value)} />
          {onCreate && <Button onClick={onCreate}>{createLabel}</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>{columns.map((c) => <TableHead key={c.key}>{c.header}</TableHead>)}
              {hasActions && <TableHead className="w-24 text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((r) => (
              <TableRow key={rowKey(r)}>
                {columns.map((c) => <TableCell key={c.key}>{c.render(r)}</TableCell>)}
                {hasActions && (
                  <TableCell className="text-right">
                    {onEdit && (
                      <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => onEdit(r)}>
                        <Pencil />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => onDelete(r)}>
                        <Trash2 className="text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
