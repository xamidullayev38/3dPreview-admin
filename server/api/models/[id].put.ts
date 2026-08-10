import { inMemoryModels } from '../../utils/modelStore';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  const model = inMemoryModels.find(m => m.id === id);
  if (!model) {
    throw createError({ statusCode: 404, statusMessage: 'Model topilmadi' });
  }

  if (body?.name) model.name = body.name;
  if (body?.description !== undefined) model.description = body.description;

  return model;
});
