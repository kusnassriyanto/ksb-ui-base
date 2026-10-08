import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta = { title: 'ui/Card', component: Card } satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Ringkasan proyek</CardTitle>
        <CardDescription>Perkembangan minggu ini</CardDescription>
      </CardHeader>
      <CardContent>12 tugas selesai dari 20 tugas.</CardContent>
      <CardFooter>
        <Button>Lihat detail</Button>
      </CardFooter>
    </Card>
  ),
}
