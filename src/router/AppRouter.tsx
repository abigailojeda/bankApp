// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../modules/dashboard/components/DashboardPage';
import { Navbar } from '../modules/shared/components/Navbar';
import { Footer } from '../modules/shared/components/Footer';
import { useDarkMode } from '../modules/shared/hooks/useDarkMode';

export function AppRouter() {
    const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
