import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import ProductListPage from '@/pages/ProductListPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/product-list" element={<ProductListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
