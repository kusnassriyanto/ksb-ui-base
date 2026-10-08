import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta = { title: 'ui/Badge', component: Badge, args: { children: 'Aktif' } } satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Draf' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Baru' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Ditolak' } }
