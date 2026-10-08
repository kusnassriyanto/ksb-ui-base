import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { MENU } from '@/config/menu'
import { AppShell } from './app-shell'

const meta = {
  title: 'blocks/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: { title: 'test-ui', menu: MENU, children: 'Isi halaman ditampilkan di sini.' },
  decorators: [
    (Story, ctx) => (
      <MemoryRouter initialEntries={[ctx.parameters.path ?? '/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AppShell>
export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {}
export const MenuBersarang: Story = { parameters: { path: '/pelanggan' } }
