import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ListPage, type Column } from './list-page'

export type CrudField<T> = { key: keyof T & string; label: string; type?: 'text' | 'number' }

type CrudPageProps<T extends { id: string }> = {
  title: string
  /** Kata benda tunggal untuk tombol dan dialog, mis. "pelanggan". */
  noun: string
  columns: Column<T>[]
  fields: CrudField<T>[]
  initialRows: T[]
  searchText: (row: T) => string
}

type Draft = Record<string, string>

/** Blok CRUD: ListPage + kolom Edit/Hapus + dialog form tambah/ubah + konfirmasi hapus. Data disimpan di state lokal. */
export function CrudPage<T extends { id: string }>({
  title, noun, columns, fields, initialRows, searchText,
}: CrudPageProps<T>) {
  const [rows, setRows] = useState(initialRows)
  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [draft, setDraft] = useState<Draft>({})
  const [deleting, setDeleting] = useState<T | null>(null)

  const openForm = (row: T | 'new') => {
    setDraft(Object.fromEntries(fields.map((f) => [f.key, row === 'new' ? '' : String(row[f.key])])))
    setEditing(row)
  }

  const valid = fields.every((f) => draft[f.key]?.trim())

  const save = () => {
    if (!valid || !editing) return
    const values = Object.fromEntries(
      fields.map((f) => [f.key, f.type === 'number' ? Number(draft[f.key]) : draft[f.key].trim()]),
    )
    if (editing === 'new') {
      setRows((prev) => [...prev, { ...values, id: crypto.randomUUID() } as unknown as T])
    } else {
      setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...values } : r)))
    }
    setEditing(null)
  }

  const remove = () => {
    if (!deleting) return
    setRows((prev) => prev.filter((r) => r.id !== deleting.id))
    setDeleting(null)
  }

  return (
    <>
      <ListPage
        title={title}
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        searchText={searchText}
        createLabel={`Tambah ${noun}`}
        onCreate={() => openForm('new')}
        onEdit={openForm}
        onDelete={setDeleting}
      />

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              save()
            }}
          >
            <DialogHeader>
              <DialogTitle>{editing === 'new' ? `Tambah ${noun}` : `Ubah ${noun}`}</DialogTitle>
              <DialogDescription>Semua kolom wajib diisi.</DialogDescription>
            </DialogHeader>
            {fields.map((f) => (
              <div key={f.key} className="grid gap-2">
                <Label htmlFor={`field-${f.key}`}>{f.label}</Label>
                <Input
                  id={`field-${f.key}`}
                  type={f.type ?? 'text'}
                  value={draft[f.key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Batal</Button>
              <Button type="submit" disabled={!valid}>Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleting !== null} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus {noun}?</DialogTitle>
            <DialogDescription>Data yang dihapus tidak dapat dikembalikan.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>Batal</Button>
            <Button variant="destructive" onClick={remove}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
