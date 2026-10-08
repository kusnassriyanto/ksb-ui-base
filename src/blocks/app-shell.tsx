import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from '@/components/ui/sidebar'
import type { MenuGroup } from '@/config/menu'

type AppShellProps = { title: string; menu: MenuGroup[]; children: ReactNode }

/** Kerangka aplikasi: sidebar dari `menu` + header breadcrumb + area konten. Tidak berisi data menu. */
export function AppShell({ title, menu, children }: AppShellProps) {
  const { pathname } = useLocation()
  const group = menu.find((g) => g.items.some((i) => i.path === pathname))
  const current = group?.items.find((i) => i.path === pathname)
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-4 py-3 text-base font-semibold">{title}</SidebarHeader>
        <SidebarContent>
          {menu.map((g, idx) => (
            <SidebarGroup key={g.label ?? idx}>
              {g.label && <SidebarGroupLabel>{g.label}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {g.items.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton isActive={item.path === pathname} render={<NavLink to={item.path} />}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4 self-center" />
          <Breadcrumb>
            <BreadcrumbList>
              {group?.label && (
                <>
                  <BreadcrumbItem>{group.label}</BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
              <BreadcrumbItem>
                <BreadcrumbPage>{current?.label ?? title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
