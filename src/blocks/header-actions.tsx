import { useEffect, useRef } from 'react'
import { Bell, Moon, Search, Sun } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/lib/use-theme'

type HeaderActionsProps = { userName: string; hasNotification?: boolean }

const initials = (name: string) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/** Sisi kanan header: pencarian (Ctrl+K), pengganti tema, notifikasi, avatar pengguna. */
export function HeaderActions({ userName, hasNotification = false }: HeaderActionsProps) {
  const { theme, toggle } = useTheme()
  const search = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        search.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="ml-auto flex items-center gap-2">
      <div className="relative hidden sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input ref={search} placeholder="Cari [CTRL + K]" className="w-56 pl-8" aria-label="Cari" />
      </div>
      <Button variant="ghost" size="icon" onClick={toggle} aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
      <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
        <Bell />
        {hasNotification && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />}
      </Button>
      <Avatar>
        <AvatarFallback>{initials(userName)}</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
    </div>
  )
}
