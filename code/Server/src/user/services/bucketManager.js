import { promises as fsPromises } from 'fs';
import path from 'path';

async function deleteImageFromBucket(imageUrl, baseDir) {
  const fileName = imageUrl.split('/').pop();
  const filePath = path.resolve(baseDir, 'uploads', fileName);

  try {
    await fsPromises.unlink(filePath);
    console.log(`File ${fileName} deleted from bucket`);
  } catch (error) {
    console.error('Error deleting file from bucket', error);
  }
}

export { deleteImageFromBucket };