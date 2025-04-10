import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import ProductListPage from '@/pages/ProductListPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
