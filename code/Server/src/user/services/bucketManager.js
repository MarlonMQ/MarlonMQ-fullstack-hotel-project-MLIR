import { promises as fsPromises } from 'fs';
import path from 'path';

async function deleteImageFromBucket(imageUrl) {
  const fileName = imageUrl.split('/').pop();
  const currentDir = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.resolve(currentDir, '../../uploads', fileName);

  try {
    await fsPromises.unlink(filePath);
    console.log(`File ${fileName} deleted from bucket`);
  } catch (error) {
    console.error('Error deleting file from bucket', error);
  }
}

export { deleteImageFromBucket };
