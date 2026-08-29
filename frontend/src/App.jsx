import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// ── Lazy-Loaded Public Pages for Lighthouse Performance ───────────────────────
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() =>
  import('./pages/PageStubs').then((module) => ({ default: module.Projects }))
);
const NotFound = lazy(() =>
  import('./pages/PageStubs').then((module) => ({ default: module.NotFound }))
);

// ── Lazy-Loaded Admin Pages ───────────────────────────────────────────────────
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProducts = lazy(() => import('./pages/admin/ManageProducts'));
const ManageCategories = lazy(() => import('./pages/admin/ManageCategories'));
const ManageGallery = lazy(() => import('./pages/admin/ManageGallery'));
const ManageInquiries = lazy(() => import('./pages/admin/ManageInquiries'));
const ManageSettings = lazy(() => import('./pages/admin/ManageSettings'));

// Luxury Marble Page Loading Fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="font-serif text-lg tracking-wider text-[#2C2C2C]">
        Abdullah Marble Factory
      </span>
    </div>
  );
}

import FloatingWhatsApp from './components/common/FloatingWhatsApp';

// Public Layout containing Navbar, Footer, and Floating WhatsApp
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes with Navbar & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes with Persistent AdminLayout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="inquiries" element={<ManageInquiries />} />
              <Route path="settings" element={<ManageSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
