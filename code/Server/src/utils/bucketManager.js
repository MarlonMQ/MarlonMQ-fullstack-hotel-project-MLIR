import { promises as fsPromises } from 'fs';
import path from 'path';

async function deleteImageFromBucket(imageUrl, baseDir) {
  const fileName = imageUrl.split('/').pop();
  const filePath = path.resolve(baseDir, 'uploads', fileName);
  
  try {
    await fsPromises.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file from bucket', error);
  }
}

export { deleteImageFromBucket };