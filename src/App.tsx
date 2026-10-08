import { Route, Routes } from 'react-router'
import { AppShell } from '@/blocks/app-shell'
import { MENU } from '@/config/menu'

export default function App() {
  return (
    <AppShell title="test-ui" menu={MENU}>
      <Routes>
        {MENU.flatMap((g) => g.items).map((i) => (
          <Route key={i.path} path={i.path} element={<i.component />} />
        ))}
      </Routes>
    </AppShell>
  )
}
