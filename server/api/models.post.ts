import fs from 'fs';
import path from 'path';
import { inMemoryModels, getUploadsDir, Model3D } from '../utils/modelStore';

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'FormData ma\'lumotlari topilmadi' });
  }

  let name = '';
  let description = '';
  let fileBuffer: Buffer | null = null;
  let fileName = '';

  for (const part of parts) {
    if (part.name === 'name') {
      name = part.data.toString('utf-8');
    } else if (part.name === 'description') {
      description = part.data.toString('utf-8');
    } else if (part.name === 'glbFile' && part.filename) {
      fileBuffer = part.data;
      fileName = part.filename;
    }
  }

  if (!fileBuffer) {
    throw createError({ statusCode: 400, statusMessage: 'GLB fayli yuklanishi shart' });
  }

  const fileBase64 = fileBuffer.toString('base64');
  const fileUrl = `data:model/gltf-binary;base64,${fileBase64}`;

  const newModel: Model3D = {
    id: `mod-${Date.now()}`,
    name: name || fileName,
    description: description || '',
    fileUrl,
    fileSize: fileBuffer.length,
    createdAt: new Date().toISOString()
  };

  inMemoryModels.unshift(newModel);
  setResponseStatus(event, 201);
  return newModel;
});
