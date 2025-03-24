import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../modules/dashboard/components/DashboardPage';
import { Navbar } from '../modules/shared/components/Navbar';
import { Footer } from '../modules/shared/components/Footer';
import { useDarkMode } from '../modules/shared/hooks/useDarkMode';
import { TransfersList } from '../modules/transfers/components/TransfersList';

export function AppRouter() {
    const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransfersList />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
