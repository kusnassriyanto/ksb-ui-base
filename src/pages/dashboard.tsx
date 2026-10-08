import { useState } from 'react'
import {
  AlertTriangle, ArrowDownCircle, ArrowUpCircle, CarFront, CheckCircle2, Clock, GitFork, Package,
  Timer, Truck, TrendingDown, TrendingUp, type LucideIcon,
} from 'lucide-react'
import { Bar, CartesianGrid, ComposedChart, Line, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { StatCard } from '@/blocks/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TONE_ICON } from '@/lib/tone'
import { cn } from '@/lib/utils'
import {
  ALASAN_PENGECUALIAN, BULAN, KPI, PERFORMA_PENGIRIMAN, PESANAN_PER_NEGARA, STATUS_KENDARAAN,
  statistikPengiriman,
} from '@/mocks/dashboard'

const KPI_ICON: Record<(typeof KPI)[number]['key'], LucideIcon> = {
  rute: Truck, error: AlertTriangle, melenceng: GitFork, terlambat: Clock,
}
const STATUS_ICON: Record<(typeof STATUS_KENDARAAN)[number]['key'], LucideIcon> = {
  jalan: CarFront, bongkar: ArrowDownCircle, muat: ArrowUpCircle, tunggu: Clock,
}
const STATUS_BAR = ['bg-muted text-foreground', 'bg-primary text-primary-foreground', 'bg-info text-primary-foreground', 'bg-foreground text-background']
const PERFORMA_ICON: Record<(typeof PERFORMA_PENGIRIMAN)[number]['key'], LucideIcon> = {
  transit: Package, antar: Truck, tiba: CheckCircle2, sukses: TrendingUp, waktu: Timer,
}

const num = new Intl.NumberFormat('id-ID')
const pct = new Intl.NumberFormat('id-ID', { signDisplay: 'exceptZero', maximumFractionDigits: 1 })

const statistikConfig = {
  pengiriman: { label: 'Pengiriman', color: 'var(--chart-2)' },
  pengantaran: { label: 'Pengantaran', color: 'var(--chart-1)' },
} satisfies ChartConfig

const pengecualianConfig = {
  alamat: { label: 'Alamat salah', color: 'var(--chart-1)' },
  cuaca: { label: 'Cuaca buruk', color: 'var(--chart-3)' },
  libur: { label: 'Hari libur nasional', color: 'var(--chart-4)' },
  rusak: { label: 'Rusak saat transit', color: 'var(--chart-2)' },
} satisfies ChartConfig

const LEGEND_DOT: Record<keyof typeof pengecualianConfig, string> = {
  alamat: 'bg-chart-1', cuaca: 'bg-chart-3', libur: 'bg-chart-4', rusak: 'bg-chart-2',
}

function Perubahan({ nilai }: { nilai: number }) {
  const Icon = nilai >= 0 ? TrendingUp : TrendingDown
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm', nilai >= 0 ? 'text-success' : 'text-destructive')}>
      <Icon className="size-4" />
      {pct.format(nilai)}%
    </span>
  )
}

export default function Dashboard() {
  const [bulan, setBulan] = useState('Januari')
  const data = statistikPengiriman(bulan)
  const pie = ALASAN_PENGECUALIAN.map((a) => ({ name: a.key, persen: a.persen, fill: `var(--color-${a.key})` }))

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {KPI.map((k) => (
          <StatCard key={k.key} icon={KPI_ICON[k.key]} tone={k.tone} value={k.value} label={k.label} change={k.change} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex overflow-hidden rounded-lg text-sm font-medium">
              {STATUS_KENDARAAN.map((s, i) => (
                <div key={s.key} className={cn('px-3 py-4', STATUS_BAR[i])} style={{ width: `${s.persen}%` }}>
                  {num.format(s.persen)}%
                </div>
              ))}
            </div>
            <div className="divide-y">
              {STATUS_KENDARAAN.map((s) => {
                const Icon = STATUS_ICON[s.key]
                return (
                  <div key={s.key} className="flex items-center gap-3 py-3">
                    <Icon className="size-5 text-muted-foreground" />
                    <span className="flex-1">{s.label}</span>
                    <span className="w-24 text-right">{s.durasi}</span>
                    <span className="w-16 text-right text-muted-foreground">{num.format(s.persen)}%</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div className="grid gap-1">
              <CardTitle>Statistik Pengiriman</CardTitle>
              <CardDescription>Total pengiriman 23,8 rb</CardDescription>
            </div>
            <Select value={bulan} onValueChange={(v) => v && setBulan(v)}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BULAN.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statistikConfig} className="h-72 w-full">
              <ComposedChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="hari" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 50]} ticks={[0, 12.5, 25, 37.5, 50]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} width={48} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pengiriman" fill="var(--color-pengiriman)" radius={4} barSize={20} />
                <Line dataKey="pengantaran" type="monotone" stroke="var(--color-pengantaran)" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ChartContainer>
            <div className="mt-2 flex justify-center gap-3 text-sm">
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-2" />Pengiriman</span>
              <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-chart-1" />Pengantaran</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Performa Pengiriman</CardTitle>
            <CardDescription>Naik 12% bulan ini</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {PERFORMA_PENGIRIMAN.map((p) => {
              const Icon = PERFORMA_ICON[p.key]
              return (
                <div key={p.key} className="flex items-center gap-3">
                  <span className={cn('flex size-10 items-center justify-center rounded-lg', TONE_ICON[p.tone])}>
                    <Icon className="size-5" />
                  </span>
                  <div className="flex-1">
                    <div>{p.label}</div>
                    <Perubahan nilai={p.perubahan} />
                  </div>
                  <span className="text-muted-foreground">{p.nilai}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alasan pengecualian pengiriman</CardTitle>
          </CardHeader>
          <CardContent className="grid min-w-0 gap-4">
            <ChartContainer config={pengecualianConfig} className="mx-auto h-52 w-full min-w-0">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={pie} dataKey="persen" nameKey="name" innerRadius={50} outerRadius={85} strokeWidth={2} />
              </PieChart>
            </ChartContainer>
            <ul className="grid gap-2 text-sm">
              {ALASAN_PENGECUALIAN.map((a) => (
                <li key={a.key} className="flex items-center gap-2">
                  <span className={cn('size-2 rounded-full', LEGEND_DOT[a.key])} />
                  <span className="flex-1">{a.label}</span>
                  <span className="text-muted-foreground">{a.persen}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesanan per Negara</CardTitle>
            <CardDescription>62 pengiriman sedang berjalan</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="baru">
              <TabsList>
                <TabsTrigger value="baru">Baru</TabsTrigger>
                <TabsTrigger value="disiapkan">Disiapkan</TabsTrigger>
                <TabsTrigger value="dikirim">Dikirim</TabsTrigger>
              </TabsList>
              {(Object.keys(PESANAN_PER_NEGARA) as (keyof typeof PESANAN_PER_NEGARA)[]).map((tab) => (
                <TabsContent key={tab} value={tab} className="divide-y">
                  {PESANAN_PER_NEGARA[tab].map((n) => (
                    <div key={n.negara} className="flex items-center gap-3 py-3">
                      <span className="flex-1">{n.negara}</span>
                      <span className="font-medium">{num.format(n.jumlah)}</span>
                      <span className="w-20 text-right"><Perubahan nilai={n.perubahan} /></span>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
