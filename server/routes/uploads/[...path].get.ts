import fs from 'fs';
import path from 'path';
import { getUploadsDir } from '../../utils/modelStore';

export default defineEventHandler((event) => {
  const filePathParam = getRouterParam(event, 'path');
  if (!filePathParam) {
    throw createError({ statusCode: 404, statusMessage: 'Fayl yo\'li berilmadi' });
  }

  const fileName = path.basename(filePathParam);
  const fullPath = path.join(getUploadsDir(), fileName);

  if (!fs.existsSync(fullPath)) {
    throw createError({ statusCode: 404, statusMessage: '3D fayl topilmadi' });
  }

  const stream = fs.createReadStream(fullPath);
  setResponseHeader(event, 'Content-Type', 'model/gltf-binary');
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000');

  return sendStream(event, stream);
});
