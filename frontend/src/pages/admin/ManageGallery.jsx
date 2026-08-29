import { useState, useEffect } from 'react';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

export default function ManageGallery() {
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', description: '', tags: '', imagePath: '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const [galRes, catRes] = await Promise.all([
        api.get('/admin/gallery'),
        api.get('/admin/categories'),
      ]);
      if (galRes.data?.success) setGallery(galRes.data.gallery || []);
      if (catRes.data?.success) setCategories(catRes.data.categories || []);
    } catch (err) {
      console.error('Failed to load gallery', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openAddModal = () => {
    setFormData({
      title: '',
      category: categories[0]?._id || '',
      description: '',
      tags: 'Flooring, Luxury, Custom Cut',
      imagePath: '',
    });
    setImageFile(null);
    setError(null);
    setModalOpen(true);
  };

  const handleUploadGallery = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Project title is required.');
      return;
    }

    if (!formData.imagePath.trim() && !imageFile) {
      setError('Please provide an image URL or choose an image file.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title.trim());
      data.append('category', formData.category);
      data.append('description', formData.description.trim());
      data.append('tags', formData.tags);

      if (formData.imagePath.trim()) {
        data.append('imagePath', formData.imagePath.trim());
      }
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await api.post('/admin/gallery', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        setFeedback('Gallery project uploaded successfully!');
        setModalOpen(false);
        fetchGallery();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Upload error', err);
      setError(err.response?.data?.message || 'Failed to upload gallery project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGallery = async (id, title) => {
    if (!window.confirm(`Delete gallery project "${title}"?`)) return;
    try {
      const res = await api.delete(`/admin/gallery/${id}`);
      if (res.data?.success) {
        setGallery((prev) => prev.filter((g) => g._id !== id));
        setFeedback('Project deleted from gallery.');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete gallery item.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
            Portfolio Gallery Management
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
            Upload, tag, and manage customer installation showcases displayed on the public gallery.
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          <span>＋</span> Upload New Project
        </button>
      </div>

      {feedback && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#D1FAE5', borderLeft: '4px solid #10B981', color: '#065F46', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {feedback}
        </div>
      )}

      {/* Gallery Cards */}
      {loading ? (
        <p style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>Loading gallery projects...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {gallery.map((item) => (
            <div
              key={item._id}
              style={{
                background: '#fff',
                border: '1px solid rgba(140, 130, 121, 0.15)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ aspectRatio: '16/10', background: '#EDE7DC', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.imagePath}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: C.gold, color: '#fff', fontSize: '0.625rem', fontWeight: 700, padding: '2px 8px', textTransform: 'uppercase' }}>
                  {item.category?.name || 'Project'}
                </span>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.35rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: C.stone, lineHeight: 1.5, marginBottom: '0.75rem', flex: 1 }}>
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
                    {item.tags.map((t) => (
                      <span key={t} style={{ background: '#FAF7F2', border: '1px solid #e0dbd3', fontSize: '0.6875rem', padding: '1px 6px', color: C.charcoal }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ borderTop: '1px solid #F4F1EA', paddingTop: '0.75rem', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDeleteGallery(item._id, item.title)}
                    style={{ padding: '0.35rem 0.75rem', background: 'rgba(224, 36, 36, 0.1)', border: '1px solid rgba(224, 36, 36, 0.3)', color: '#E02424', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div
          role="dialog"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setModalOpen(false)}
        >
          <div style={{ background: '#fff', maxWidth: '540px', width: '100%', padding: '2.25rem', border: `2px solid ${C.gold}` }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Upload Project to Gallery
            </h2>

            {error && <div style={{ padding: '0.5rem', background: '#FDF2F2', color: '#9B1C1C', fontSize: '0.8125rem', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleUploadGallery}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Penthouse Backlit Onyx Wall"
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', background: '#fff' }}
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id || c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details of stone variety, location, and cutting techniques used..."
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Flooring, Living Room, Ziarat White"
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Image Web URL</label>
                  <input
                    type="url"
                    value={formData.imagePath}
                    onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', fontSize: '0.8125rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Or Upload File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    style={{ width: '100%', padding: '0.5rem 0', fontSize: '0.8125rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #ccc', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  {saving ? 'Uploading...' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
