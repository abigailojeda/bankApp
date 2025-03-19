// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../modules/dashboard/components/DashboardPage';
import { Navbar } from '../modules/shared/components/Navbar';
import { Footer } from '../modules/shared/components/Footer';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
