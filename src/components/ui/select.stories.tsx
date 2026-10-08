import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

const meta = { title: 'ui/Select', component: Select } satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select defaultValue="aktif">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pilih status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aktif">Aktif</SelectItem>
        <SelectItem value="draf">Draf</SelectItem>
        <SelectItem value="arsip">Arsip</SelectItem>
      </SelectContent>
    </Select>
  ),
}
