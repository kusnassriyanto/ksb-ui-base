import type { ComponentType } from 'react'
import {
  BarChart3, Boxes, LayoutDashboard, Settings, ShoppingCart, Truck, Users,
  type LucideIcon,
} from 'lucide-react'
import Dashboard from '@/pages/dashboard'
import Laporan from '@/pages/laporan'
import Pelanggan from '@/pages/pelanggan'
import Pembelian from '@/pages/pembelian'
import Pengaturan from '@/pages/pengaturan'
import Penjualan from '@/pages/penjualan'
import Produk from '@/pages/produk'

export type MenuItem = { label: string; path: string; icon: LucideIcon; component: ComponentType }
export type MenuGroup = { label?: string; items: MenuItem[] }

/** Satu-satunya tempat menu didefinisikan. Sidebar, route, dan breadcrumb dibangun dari sini. */
export const MENU: MenuGroup[] = [
  { items: [{ label: 'Dashboard', path: '/', icon: LayoutDashboard, component: Dashboard }] },
  {
    label: 'Master Data',
    items: [
      { label: 'Pelanggan', path: '/pelanggan', icon: Users, component: Pelanggan },
      { label: 'Produk', path: '/produk', icon: Boxes, component: Produk },
    ],
  },
  {
    label: 'Transaksi',
    items: [
      { label: 'Penjualan', path: '/penjualan', icon: ShoppingCart, component: Penjualan },
      { label: 'Pembelian', path: '/pembelian', icon: Truck, component: Pembelian },
    ],
  },
  { items: [{ label: 'Laporan', path: '/laporan', icon: BarChart3, component: Laporan }] },
  { items: [{ label: 'Pengaturan', path: '/pengaturan', icon: Settings, component: Pengaturan }] },
]
