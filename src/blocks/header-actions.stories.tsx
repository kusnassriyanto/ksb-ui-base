import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeaderActions } from './header-actions'

const meta = {
  title: 'blocks/HeaderActions',
  component: HeaderActions,
  args: { userName: 'Budi Santoso', hasNotification: true },
  decorators: [(Story) => <div className="flex w-[640px] items-center border-b p-2"><Story /></div>],
} satisfies Meta<typeof HeaderActions>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const TanpaNotifikasi: Story = { args: { hasNotification: false } }
