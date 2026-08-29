import api from './api';

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.category && params.category !== 'all') {
    query.append('category', params.category);
  }
  if (params.finish && params.finish !== 'all') {
    query.append('finish', params.finish);
  }
  if (params.application && params.application !== 'all') {
    query.append('application', params.application);
  }
  if (params.search && params.search.trim()) {
    query.append('search', params.search.trim());
  }
  if (params.sort) {
    query.append('sort', params.sort);
  }
  if (params.page) {
    query.append('page', params.page);
  }
  if (params.limit) {
    query.append('limit', params.limit);
  }

  const res = await api.get(`/products?${query.toString()}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data;
};

export const getGallery = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') {
    query.append('category', params.category);
  }
  const res = await api.get(`/gallery?${query.toString()}`);
  return res.data;
};

export const getSiteSettings = async () => {
  const res = await api.get('/settings');
  return res.data;
};

export const createInquiry = async (inquiryData) => {
  const res = await api.post('/inquiries', inquiryData);
  return res.data;
};
