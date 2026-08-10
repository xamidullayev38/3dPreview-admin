import fs from 'fs';
import path from 'path';
import { inMemoryModels, getUploadsDir, Model3D } from '../../utils/modelStore';

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Chunk ma\'lumotlari topilmadi' });
  }

  let uploadId = '';
  let chunkIndex = 0;
  let totalChunks = 1;
  let name = '';
  let description = '';
  let originalName = '';
  let fileBuffer: Buffer | null = null;

  for (const part of parts) {
    if (part.name === 'uploadId') uploadId = part.data.toString('utf-8');
    else if (part.name === 'chunkIndex') chunkIndex = parseInt(part.data.toString('utf-8'), 10);
    else if (part.name === 'totalChunks') totalChunks = parseInt(part.data.toString('utf-8'), 10);
    else if (part.name === 'name') name = part.data.toString('utf-8');
    else if (part.name === 'description') description = part.data.toString('utf-8');
    else if (part.name === 'originalName') originalName = part.data.toString('utf-8');
    else if (part.name === 'glbFile') fileBuffer = part.data;
  }

  if (!fileBuffer || !uploadId) {
    throw createError({ statusCode: 400, statusMessage: 'Fayl bo\'lagi (chunk) yoki UploadId topilmadi' });
  }

  const uploadsDir = getUploadsDir();
  const tempFilePath = path.join(uploadsDir, `temp-${uploadId}`);

  // Append chunk to temp file
  fs.appendFileSync(tempFilePath, fileBuffer);

  // If last chunk
  if (chunkIndex === totalChunks - 1) {
    const ext = path.extname(originalName || 'file.glb') || '.glb';
    const finalFileName = `model-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const finalFilePath = path.join(uploadsDir, finalFileName);

    fs.renameSync(tempFilePath, finalFilePath);
    const stats = fs.statSync(finalFilePath);

    const newModel: Model3D = {
      id: `mod-${Date.now()}`,
      name: name || originalName || '3D Model',
      description: description || '',
      fileUrl: `/uploads/${finalFileName}`,
      fileSize: stats.size,
      createdAt: new Date().toISOString()
    };

    inMemoryModels.unshift(newModel);
    setResponseStatus(event, 201);
    return newModel;
  }

  return { message: `Chunk ${chunkIndex + 1}/${totalChunks} qabul qilindi` };
});
