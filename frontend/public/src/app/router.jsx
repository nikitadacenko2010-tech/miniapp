import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import CreateDeal from '../pages/CreateDeal'
import MyDeals from '../pages/MyDeals'
import Requisites from '../pages/Requisites'
import Profile from '../pages/Profile'
import Withdraw from '../pages/Withdraw'
import Support from '../pages/Support'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateDeal />} />
          <Route path="/deals" element={<MyDeals />} />
          <Route path="/requisites" element={<Requisites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}