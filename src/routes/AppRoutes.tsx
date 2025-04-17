import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import ProductListPage from '@/pages/ProductListPage';
import ProductPage from '@/pages/ProductPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product-list" element={<MainLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
        {/* catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
