export type Tone = 'primary' | 'warning' | 'destructive' | 'info' | 'success'

/** Kelas ikon berlatar tipis per warna semantik (token tema). */
export const TONE_ICON: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
}
