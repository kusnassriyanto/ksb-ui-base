import type { Meta, StoryObj } from '@storybook/react-vite'
import { Truck } from 'lucide-react'
import { StatCard } from './stat-card'

const meta = {
  title: 'blocks/StatCard',
  component: StatCard,
  args: { icon: Truck, tone: 'primary', value: 42, label: 'Kendaraan di rute', change: 18.2 },
} satisfies Meta<typeof StatCard>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Warning: Story = { args: { tone: 'warning', value: 8, label: 'Kendaraan bermasalah', change: -8.7 } }
export const Destructive: Story = { args: { tone: 'destructive', value: 27, label: 'Menyimpang dari rute', change: 4.3 } }
export const Info: Story = { args: { tone: 'info', value: 13, label: 'Kendaraan terlambat', change: -2.5 } }
export const TanpaPerubahan: Story = { args: { change: undefined } }
