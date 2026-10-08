import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'
import { Label } from './label'

const meta = { title: 'ui/Label', component: Label, args: { children: 'Nama lengkap' } } satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const DenganInput: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="nama">Nama lengkap</Label>
      <Input id="nama" placeholder="Masukkan nama" />
    </div>
  ),
}
