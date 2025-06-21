import { Permission, Role, ID } from 'appwrite';
import { storage } from './appwriteConfig';
import conf from '../conf/conf';

export const uploadImageToAppwrite = async (file) => {
  try {
    const response = await storage.createFile(
      conf.appwriteBucketId, // Your bucket ID
      ID.unique(),             // Use Appwrite's built-in unique ID generator
      file,
      [Permission.read(Role.any())]  // Grants public read access
    );
    return response.$id;
  } catch (error) {
    console.error('Appwrite storage error:', error);
    throw new Error('Image upload failed: ' + error.message);
  }
};

export function getImageUrl(img) {
  if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
    return img;
  }
  return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${img}/view?project=${conf.appwriteProjectId}&mode=admin`;
}
