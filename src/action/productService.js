import axios from 'axios';
import { storage } from '../appwrite/appwriteConfig';
import { ID, Permission, Role } from 'appwrite';
import conf from "../conf/conf"

export async function uploadImageToAppwrite(file) {
  const res = await storage.createFile(
    conf.appwriteBucketId,
    ID.unique(),
    file,
    [Permission.read(Role.any())]
  );
  return res.$id;
}

export async function createProductAPI(formData) {
  const imageIds = [];
  for (let [key, val] of formData.entries()) {
    if (key.startsWith('image_') && val instanceof File) {
      const fileId = await uploadImageToAppwrite(val);
      imageIds.push(fileId);
      formData.delete(key);
    }
  }

  imageIds.forEach(id => formData.append('images', id));
  const stored = JSON.parse(localStorage.getItem('seller') || '{}');
  const token = stored.token || '';
  const sellerId = stored.userId || '';

  const resp = await axios.post(
    `http://localhost:3000/products?sellerId=${sellerId}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    }
  );
  return resp.data;
}

export async function updateProductAPI(id, updateObj) {
  const token = JSON.parse(localStorage.getItem('seller') || '{}').token || '';
  const resp = await axios.patch(
    `http://localhost:3000/products/${id}`,
    updateObj,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    }
  );
  return resp.data;
}
