import { useState, useEffect } from 'react';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  charcoalDark: '#1A1A1A',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

const FINISH_LIST = ['Polished', 'Honed', 'Brushed', 'Sandblasted', 'Flamed', 'Natural'];
const APPLICATION_LIST = ['Flooring', 'Wall Cladding', 'Countertops', 'Stairs', 'Bathroom', 'Outdoor', 'Decorative'];

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    finish: ['Polished'],
    size: '12" x 12", 24" x 24", Custom Slabs',
    application: ['Flooring', 'Wall Cladding'],
    availability: 'In Stock',
    isFeatured: false,
    isActive: true,
  });

  const [imageFiles, setImageFiles] = useState(null);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get(`/admin/products?search=${encodeURIComponent(search)}&category=${selectedCat}`),
        api.get('/admin/categories'),
      ]);

      if (prodRes.data?.success) setProducts(prodRes.data.products || []);
      if (catRes.data?.success) setCategories(catRes.data.categories || []);
    } catch (err) {
      console.error('Failed to load products/categories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, [selectedCat]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProductsAndCategories();
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      category: categories[0]?._id || '',
      description: '',
      imageUrl: '',
      finish: ['Polished'],
      size: '12" x 12", 24" x 24", Custom Slabs',
      application: ['Flooring', 'Wall Cladding'],
      availability: 'In Stock',
      isFeatured: false,
      isActive: true,
    });
    setImageFiles(null);
    setModalError(null);
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setIsEditing(true);
    setEditingId(p._id);
    setFormData({
      name: p.name || '',
      category: p.category?._id || p.category || '',
      description: p.description || '',
      imageUrl: p.images?.[0] || '',
      finish: p.finish || ['Polished'],
      size: Array.isArray(p.size) ? p.size.join(', ') : p.size || '',
      application: p.application || ['Flooring'],
      availability: p.availability || 'In Stock',
      isFeatured: !!p.isFeatured,
      isActive: p.isActive !== false,
    });
    setImageFiles(null);
    setModalError(null);
    setModalOpen(true);
  };

  const handleFinishToggle = (f) => {
    setFormData((prev) => ({
      ...prev,
      finish: prev.finish.includes(f)
        ? prev.finish.filter((item) => item !== f)
        : [...prev.finish, f],
    }));
  };

  const handleAppToggle = (app) => {
    setFormData((prev) => ({
      ...prev,
      application: prev.application.includes(app)
        ? prev.application.filter((item) => item !== app)
        : [...prev.application, app],
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setModalError(null);

    if (!formData.name.trim()) {
      setModalError('Product name is required.');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('availability', formData.availability);
      data.append('isFeatured', formData.isFeatured);
      data.append('isActive', formData.isActive);

      formData.finish.forEach((f) => data.append('finish[]', f));
      formData.application.forEach((a) => data.append('application[]', a));

      // Parse sizes
      const sizeArr = formData.size.split(',').map((s) => s.trim()).filter(Boolean);
      sizeArr.forEach((s) => data.append('size[]', s));

      if (formData.imageUrl.trim()) {
        data.append('images', formData.imageUrl.trim());
      }

      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          data.append('images', imageFiles[i]);
        }
      }

      if (isEditing) {
        await api.put(`/admin/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFeedback('Product updated successfully!');
      } else {
        await api.post('/admin/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFeedback('New product created successfully!');
      }

      setModalOpen(false);
      fetchProductsAndCategories();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error('Save product error:', err);
      setModalError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/admin/products/${id}/toggle-status`);
      if (res.data?.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isActive: res.data.isActive } : p))
        );
        setFeedback(res.data.message);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Toggle status error', err);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      const res = await api.delete(`/admin/products/${id}`);
      if (res.data?.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setFeedback('Product deleted successfully.');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Delete product error', err);
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
            Products Inventory Management
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
            Add, update, publish/hide, or delete natural marble and granite catalog items.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>＋</span> Add New Stone Product
        </button>
      </div>

      {feedback && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#D1FAE5', borderLeft: '4px solid #10B981', color: '#065F46', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {feedback}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div
        style={{
          background: '#fff',
          padding: '1.25rem',
          border: '1px solid rgba(140, 130, 121, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px' }}>
          <input
            type="text"
            placeholder="Search stone by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem 0.85rem',
              border: '1px solid rgba(140, 130, 121, 0.3)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.65rem 1.25rem',
              background: C.charcoal,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            Search
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: C.stone }}>Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              border: '1px solid rgba(140, 130, 121, 0.3)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              outline: 'none',
              background: '#fff',
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id || c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(140, 130, 121, 0.15)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: '#FAF7F2', borderBottom: '1px solid #EDE7DC', color: C.stone, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <th style={{ padding: '1rem' }}>Product</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Finishes</th>
              <th style={{ padding: '1rem' }}>Availability</th>
              <th style={{ padding: '1rem' }}>Visibility</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>
                  Loading catalog inventory...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>
                  No products found. Click "Add New Stone Product" above to create one.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const imgUrl = p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                return (
                  <tr key={p._id} style={{ borderBottom: '1px solid #F4F1EA' }}>
                    {/* Product Name & Thumbnail */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <img
                          src={imgUrl}
                          alt={p.name}
                          style={{
                            width: '48px',
                            height: '38px',
                            objectFit: 'cover',
                            background: '#EDE7DC',
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: C.charcoal, fontSize: '0.875rem' }}>{p.name}</div>
                          {p.isFeatured && (
                            <span style={{ fontSize: '0.625rem', color: C.gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              ★ Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '0.875rem 1rem', color: C.stone }}>
                      {p.category?.name || 'Uncategorized'}
                    </td>

                    {/* Finishes */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {(p.finish || []).slice(0, 2).map((f) => (
                          <span key={f} style={{ background: '#F0EBE3', padding: '2px 6px', fontSize: '0.6875rem' }}>
                            {f}
                          </span>
                        ))}
                        {(p.finish || []).length > 2 && (
                          <span style={{ fontSize: '0.6875rem', color: C.stone }}>+{p.finish.length - 2}</span>
                        )}
                      </div>
                    </td>

                    {/* Availability */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span
                        style={{
                          background: p.availability === 'In Stock' ? '#D1FAE5' : '#FEF3C7',
                          color: p.availability === 'In Stock' ? '#065F46' : '#92400E',
                          padding: '2px 8px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {p.availability || 'In Stock'}
                      </span>
                    </td>

                    {/* Visibility Toggle */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <button
                        onClick={() => handleToggleStatus(p._id)}
                        style={{
                          border: 'none',
                          background: p.isActive ? '#1E6B37' : '#9CA3AF',
                          color: '#fff',
                          padding: '3px 8px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                        title="Click to toggle visibility on public site"
                      >
                        {p.isActive ? '● Live' : '○ Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEditModal(p)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            background: '#fff',
                            border: '1px solid rgba(140, 130, 121, 0.3)',
                            color: C.charcoal,
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            background: 'rgba(224, 36, 36, 0.1)',
                            border: '1px solid rgba(224, 36, 36, 0.3)',
                            color: '#E02424',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Add / Edit Modal ─── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: `2px solid ${C.gold}`,
              padding: '2.25rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 700, color: C.charcoal }}>
                {isEditing ? 'Edit Stone Product' : 'Add New Stone Product'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: C.stone }}>
                ✕
              </button>
            </div>

            {modalError && (
              <div style={{ padding: '0.75rem', background: '#FDF2F2', borderLeft: '3px solid #E02424', color: '#9B1C1C', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveProduct}>
              {/* Name & Category Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ziarat White Super Prime"
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.875rem', background: '#fff' }}
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id || c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                  Description & Geological Origin
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Quarried in Balochistan with crystalline white background..."
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.875rem', resize: 'vertical' }}
                />
              </div>

              {/* Image URL or File Upload */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Image Web URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.8125rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Or Upload Image File (Multer)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(e.target.files)}
                    style={{ width: '100%', padding: '0.5rem 0', fontSize: '0.8125rem' }}
                  />
                </div>
              </div>

              {/* Finishes Checkbox Group */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.4rem' }}>
                  Available Finishes
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {FINISH_LIST.map((f) => {
                    const isChecked = formData.finish.includes(f);
                    return (
                      <button
                        type="button"
                        key={f}
                        onClick={() => handleFinishToggle(f)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          background: isChecked ? C.gold : '#FAF7F2',
                          color: isChecked ? '#fff' : C.charcoal,
                          border: isChecked ? `1px solid ${C.gold}` : '1px solid #d4cecb',
                          cursor: 'pointer',
                          fontWeight: isChecked ? 600 : 400,
                        }}
                      >
                        {isChecked ? '✓ ' : ''}{f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Applications */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.4rem' }}>
                  Recommended Applications
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {APPLICATION_LIST.map((app) => {
                    const isChecked = formData.application.includes(app);
                    return (
                      <button
                        type="button"
                        key={app}
                        onClick={() => handleAppToggle(app)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          background: isChecked ? C.charcoal : '#FAF7F2',
                          color: isChecked ? '#fff' : C.charcoal,
                          border: isChecked ? `1px solid ${C.charcoal}` : '1px solid #d4cecb',
                          cursor: 'pointer',
                          fontWeight: isChecked ? 600 : 400,
                        }}
                      >
                        {isChecked ? '✓ ' : ''}{app}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes / Availability */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Available Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder='12"x12", 24"x24", Custom Slabs'
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.8125rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.3rem' }}>
                    Stock Status
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #d4cecb', outline: 'none', fontSize: '0.8125rem', background: '#fff' }}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Toggles: isFeatured, isActive */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', background: '#FAF7F2', padding: '0.75rem 1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Show as <strong>Featured Variety</strong> on Home Page</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>Publish / Visible on Public Website</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
