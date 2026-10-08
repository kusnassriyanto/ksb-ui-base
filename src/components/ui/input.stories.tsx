import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = { title: 'ui/Input', component: Input, args: { placeholder: 'Ketik di sini...' } } satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Email: Story = { args: { type: 'email', placeholder: 'nama@contoh.com' } }
export const Disabled: Story = { args: { disabled: true, placeholder: 'Tidak dapat diubah' } }
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'nilai salah' } }
