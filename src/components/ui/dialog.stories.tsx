import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'

const meta = { title: 'ui/Dialog', component: Dialog } satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Hapus data</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus data ini?</DialogTitle>
          <DialogDescription>Tindakan ini tidak dapat dibatalkan.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Hapus</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
