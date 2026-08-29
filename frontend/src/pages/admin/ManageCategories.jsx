import { useState, useEffect } from 'react';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '', sortOrder: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/categories');
      if (res.data?.success) {
        setCategories(res.data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load categories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ name: '', description: '', image: '', sortOrder: categories.length + 1 });
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setIsEditing(true);
    setEditingId(cat._id);
    setFormData({
      name: cat.name || '',
      description: cat.description || '',
      image: cat.image || '',
      sortOrder: cat.sortOrder || 0,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Category name is required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      if (isEditing) {
        await api.put(`/admin/categories/${editingId}`, formData);
        setFeedback('Category updated successfully!');
      } else {
        await api.post('/admin/categories', formData);
        setFeedback('Category created successfully!');
      }
      setModalOpen(false);
      fetchCategories();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error('Save category error', err);
      setError(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await api.delete(`/admin/categories/${id}`);
      if (res.data?.success) {
        setFeedback('Category deleted successfully.');
        fetchCategories();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete category.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
            Stone Categories Management
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
            Organize marble, granite, travertine, and exotic stone product classifications.
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          <span>＋</span> Add New Category
        </button>
      </div>

      {feedback && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#D1FAE5', borderLeft: '4px solid #10B981', color: '#065F46', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {feedback}
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <p style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>Loading categories...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <div
              key={cat._id}
              style={{
                background: '#fff',
                border: '1px solid rgba(140, 130, 121, 0.18)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '140px', background: '#EDE7DC', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.6875rem', padding: '2px 8px', fontWeight: 600 }}>
                  Order: #{cat.sortOrder || 0}
                </div>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.35rem' }}>
                  {cat.name}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: C.stone, lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                  {cat.description || 'No description provided.'}
                </p>

                <div style={{ borderTop: '1px solid #F4F1EA', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: C.gold, fontWeight: 600 }}>
                    💎 {cat.productCount ?? 0} Product(s)
                  </span>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditModal(cat)}
                      style={{ padding: '0.3rem 0.65rem', background: '#FAF7F2', border: '1px solid #d4cecb', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id, cat.name)}
                      style={{ padding: '0.3rem 0.65rem', background: 'rgba(224, 36, 36, 0.1)', border: '1px solid rgba(224, 36, 36, 0.3)', color: '#E02424', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setModalOpen(false)}
        >
          <div style={{ background: '#fff', maxWidth: '500px', width: '100%', padding: '2rem', border: `2px solid ${C.gold}` }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              {isEditing ? 'Edit Category' : 'Add Category'}
            </h2>

            {error && <div style={{ padding: '0.5rem', background: '#FDF2F2', color: '#9B1C1C', fontSize: '0.8125rem', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleSaveCategory}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Italian Marble"
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', fontSize: '0.8125rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value || '0', 10) })}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #ccc', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  {saving ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
