import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/products';

export async function createProductAPI(formData) {
  const stored = JSON.parse(localStorage.getItem('seller') || '{}');
  const token  = stored.token  || '';
  const sellerId = stored.userId || '';

  const resp = await axios.post(`${API_BASE}?sellerId=${sellerId}`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    // 'Content-Type': 'multipart/form-data'
  },
  withCredentials: true
});

  return resp.data;
}

export async function updateProductAPI(id, updateObj) {
  const token = JSON.parse(localStorage.getItem('seller') || '{}').token || '';
  const resp = await axios.patch(
    `${API_BASE}/${id}`,
    updateObj,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    }
  );
  return resp.data;
}

export async function deleteProductAPI(id) {
  const token = JSON.parse(localStorage.getItem('seller') || '{}').token || '';
  const resp = await axios.delete(
    `${API_BASE}/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    }
  );
  return resp.data;
}
