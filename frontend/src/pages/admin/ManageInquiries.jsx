import { useState, useEffect } from 'react';
import api from '../../services/api';

const C = {
  marble: '#F8F5F0',
  charcoal: '#2C2C2C',
  gold: '#C9A84C',
  stone: '#8C8279',
  cream: '#FAF7F2',
};

const STATUS_LIST = ['All', 'New', 'In Progress', 'Quoted', 'Closed', 'Spam'];

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState('');

  // Detail Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editingStatus, setEditingStatus] = useState('New');
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const statusParam = selectedStatus === 'All' ? '' : selectedStatus;
      const res = await api.get(
        `/admin/inquiries?status=${encodeURIComponent(statusParam)}&search=${encodeURIComponent(search)}`
      );
      if (res.data?.success) {
        setInquiries(res.data.inquiries || []);
      }
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus]);

  const openDetailModal = (inq) => {
    setSelectedInquiry(inq);
    setEditingStatus(inq.status || 'New');
    setAdminNotes(inq.adminNotes || '');
  };

  const handleUpdateStatusAndNotes = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    setUpdating(true);
    try {
      const res = await api.patch(`/admin/inquiries/${selectedInquiry._id}/status`, {
        status: editingStatus,
        adminNotes,
      });
      if (res.data?.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === selectedInquiry._id ? res.data.inquiry : item))
        );
        setSelectedInquiry(res.data.inquiry);
        setFeedback('Inquiry status and notes saved successfully!');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Update inquiry status error', err);
      alert('Failed to update inquiry status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteInquiry = async (id, name) => {
    if (!window.confirm(`Delete inquiry from ${name}?`)) return;
    try {
      const res = await api.delete(`/admin/inquiries/${id}`);
      if (res.data?.success) {
        setInquiries((prev) => prev.filter((i) => i._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        setFeedback('Inquiry deleted.');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Delete inquiry error', err);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'New':
        return { background: '#FEF3C7', color: '#92400E', border: '1px solid #FCD34D' };
      case 'In Progress':
        return { background: '#DBEAFE', color: '#1E40AF', border: '1px solid #93C5FD' };
      case 'Quoted':
        return { background: '#D1FAE5', color: '#065F46', border: '1px solid #6EE7B7' };
      case 'Closed':
        return { background: '#F3F4F6', color: '#4B5563', border: '1px solid #D1D5DB' };
      case 'Spam':
        return { background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5' };
      default:
        return { background: '#FAF7F2', color: C.charcoal, border: '1px solid #EDE7DC' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: C.charcoal, marginBottom: '0.25rem' }}>
            Customer Inquiries & Quotations
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: C.stone }}>
            Review, track lead statuses, record sales notes, and connect with prospective clients.
          </p>
        </div>

        <button onClick={fetchInquiries} style={{ padding: '0.6rem 1.25rem', background: '#fff', border: '1px solid rgba(140, 130, 121, 0.3)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600 }}>
          🔄 Refresh Inquiries
        </button>
      </div>

      {feedback && (
        <div style={{ padding: '0.875rem 1.25rem', background: '#D1FAE5', borderLeft: '4px solid #10B981', color: '#065F46', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {feedback}
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
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
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {STATUS_LIST.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.8125rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: selectedStatus === st ? 700 : 500,
                background: selectedStatus === st ? C.charcoal : '#FAF7F2',
                color: selectedStatus === st ? '#fff' : C.charcoal,
                border: selectedStatus === st ? `1px solid ${C.charcoal}` : '1px solid #EDE7DC',
                cursor: 'pointer',
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchInquiries(); }} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search name, phone, stone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.5rem 0.85rem', border: '1px solid #ccc', fontSize: '0.8125rem', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', background: C.gold, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem' }}>
            Filter
          </button>
        </form>
      </div>

      {/* Inquiries Table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(140, 130, 121, 0.15)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: '#FAF7F2', borderBottom: '1px solid #EDE7DC', color: C.stone, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <th style={{ padding: '1rem' }}>Customer Details</th>
              <th style={{ padding: '1rem' }}>Type</th>
              <th style={{ padding: '1rem' }}>Stone Interest</th>
              <th style={{ padding: '1rem' }}>Dimensions / Qty</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>
                  Loading inquiries...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: C.stone }}>
                  No customer inquiries match the selected status filter.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => {
                const badgeStyle = getStatusBadgeStyle(inq.status);
                return (
                  <tr key={inq._id} style={{ borderBottom: '1px solid #F4F1EA' }}>
                    {/* Customer */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: C.charcoal, fontSize: '0.875rem' }}>
                        {inq.customerName}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                        <a
                          href={`tel:${inq.phone.replace(/\s+/g, '')}`}
                          style={{ color: C.gold, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}
                        >
                          📞 {inq.phone}
                        </a>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1E6B37', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </td>

                    {/* Type */}
                    <td style={{ padding: '0.875rem 1rem', color: C.stone }}>
                      {inq.inquiryType || 'General Contact'}
                    </td>

                    {/* Stone Interest */}
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: C.charcoal }}>
                      {inq.productInterest || 'N/A'}
                    </td>

                    {/* Dimensions & Qty */}
                    <td style={{ padding: '0.875rem 1rem', color: C.stone }}>
                      <div>{inq.dimensions || '—'}</div>
                      {inq.quantity && <div style={{ fontSize: '0.75rem' }}>Qty: {inq.quantity}</div>}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span
                        style={{
                          ...badgeStyle,
                          padding: '3px 8px',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          display: 'inline-block',
                        }}
                      >
                        {inq.status || 'New'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openDetailModal(inq)}
                          style={{ padding: '0.35rem 0.75rem', background: '#fff', border: `1px solid ${C.gold}`, color: C.gold, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                        >
                          View & Update
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq._id, inq.customerName)}
                          style={{ padding: '0.35rem 0.65rem', background: 'rgba(224,36,36,0.1)', border: '1px solid rgba(224,36,36,0.3)', color: '#E02424', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          ✕
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

      {/* ─── Detail & Status Update Modal ─── */}
      {selectedInquiry && (
        <div
          role="dialog"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            style={{ background: '#fff', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: `2px solid ${C.gold}`, padding: '2.25rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EDE7DC', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', color: C.gold, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {selectedInquiry.inquiryType || 'Customer Inquiry'}
                </span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 700, color: C.charcoal }}>
                  {selectedInquiry.customerName}
                </h2>
              </div>
              <button onClick={() => setSelectedInquiry(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: C.stone }}>
                ✕
              </button>
            </div>

            {/* Customer Details Box */}
            <div style={{ background: '#FAF7F2', padding: '1.25rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.6875rem', color: C.stone, textTransform: 'uppercase' }}>Phone Number</div>
                <div style={{ fontWeight: 600, color: C.charcoal, marginTop: '0.2rem' }}>{selectedInquiry.phone}</div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
                  <a href={`tel:${selectedInquiry.phone}`} style={{ color: C.gold, fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
                    📞 Call
                  </a>
                  <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1E6B37', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.6875rem', color: C.stone, textTransform: 'uppercase' }}>Email Address</div>
                <div style={{ fontWeight: 600, color: C.charcoal, marginTop: '0.2rem' }}>
                  {selectedInquiry.email || 'Not provided'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.6875rem', color: C.stone, textTransform: 'uppercase' }}>Stone Interest</div>
                <div style={{ fontWeight: 600, color: C.charcoal, marginTop: '0.2rem' }}>
                  {selectedInquiry.productInterest || 'General Inquiry'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.6875rem', color: C.stone, textTransform: 'uppercase' }}>Finish & Dimensions</div>
                <div style={{ color: C.charcoal, marginTop: '0.2rem', fontSize: '0.8125rem' }}>
                  {selectedInquiry.preferredFinish && <span>Finish: {selectedInquiry.preferredFinish}<br/></span>}
                  {selectedInquiry.dimensions && <span>Size: {selectedInquiry.dimensions}<br/></span>}
                  {selectedInquiry.quantity && <span>Qty: {selectedInquiry.quantity}</span>}
                </div>
              </div>
            </div>

            {/* Message Body */}
            {selectedInquiry.message && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.4rem' }}>
                  Customer Message:
                </div>
                <blockquote style={{ background: '#fff', borderLeft: `3px solid ${C.gold}`, padding: '0.75rem 1rem', fontStyle: 'italic', color: C.stone, lineHeight: 1.6, fontSize: '0.875rem' }}>
                  {selectedInquiry.message}
                </blockquote>
              </div>
            )}

            {/* Status & Admin Notes Form */}
            <form onSubmit={handleUpdateStatusAndNotes}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.35rem' }}>
                  Update Lead Status
                </label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', background: '#fff', fontWeight: 600 }}
                >
                  <option value="New">🟡 New (Uncontacted)</option>
                  <option value="In Progress">🔵 In Progress (Contacted / Samples Sent)</option>
                  <option value="Quoted">🟢 Quoted (Price Schedule Issued)</option>
                  <option value="Closed">⚪ Closed / Completed</option>
                  <option value="Spam">🔴 Spam</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: C.charcoal, marginBottom: '0.35rem' }}>
                  Internal Admin Notes
                </label>
                <textarea
                  rows="3"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call outcomes, custom quotation rates, or delivery commitments..."
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #ccc', outline: 'none', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setSelectedInquiry(null)} style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid #ccc', cursor: 'pointer' }}>
                  Close
                </button>
                <button type="submit" disabled={updating} className="btn-primary" style={{ padding: '0.65rem 1.75rem' }}>
                  {updating ? 'Saving Changes...' : 'Save Status & Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
