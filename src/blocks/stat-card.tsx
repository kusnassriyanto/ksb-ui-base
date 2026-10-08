import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { TONE_ICON, type Tone } from '@/lib/tone'
import { cn } from '@/lib/utils'

const TONE_LINE: Record<Tone, string> = {
  primary: 'bg-primary',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  info: 'bg-info',
  success: 'bg-success',
}

const persen = new Intl.NumberFormat('id-ID', { signDisplay: 'exceptZero', maximumFractionDigits: 1 })

type StatCardProps = {
  icon: LucideIcon
  tone: Tone
  value: number | string
  label: string
  change?: number
  changeLabel?: string
}

/** Kartu angka ringkas: ikon berwarna + nilai + label + perubahan (opsional). */
export function StatCard({ icon: Icon, tone, value, label, change, changeLabel = 'dari minggu lalu' }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="grid gap-2">
        <div className="flex items-center gap-3">
          <span className={cn('flex size-10 items-center justify-center rounded-lg', TONE_ICON[tone])}>
            <Icon className="size-5" />
          </span>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
        <div className="text-muted-foreground">{label}</div>
        {change !== undefined && (
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-semibold">{persen.format(change)}%</span>
            <span className="text-muted-foreground">{changeLabel}</span>
          </div>
        )}
      </CardContent>
      <span className={cn('absolute inset-x-0 bottom-0 h-0.5', TONE_LINE[tone])} />
    </Card>
  )
}
