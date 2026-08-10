import fs from 'fs';
import path from 'path';
import { inMemoryModels, getUploadsDir } from '../../utils/modelStore';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const index = inMemoryModels.findIndex(m => m.id === id);

  if (index !== -1) {
    const model = inMemoryModels[index];
    if (model.fileUrl && model.fileUrl.startsWith('/uploads/')) {
      const fileName = model.fileUrl.replace('/uploads/', '');
      const filePath = path.join(getUploadsDir(), fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    inMemoryModels.splice(index, 1);
    return { message: "Model muvaffaqiyatli o'chirildi" };
  }

  throw createError({ statusCode: 404, statusMessage: 'Model topilmadi' });
});
