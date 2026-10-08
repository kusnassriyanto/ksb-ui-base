import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'

const meta = { title: 'ui/Button', component: Button, args: { children: 'Simpan' } } satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Outline: Story = { args: { variant: 'outline' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Hapus' } }
export const Link: Story = { args: { variant: 'link', children: 'Lihat detail' } }
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
export const Disabled: Story = { args: { disabled: true } }
