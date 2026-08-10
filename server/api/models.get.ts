import { inMemoryModels } from '../utils/modelStore';

export default defineEventHandler(() => {
  return inMemoryModels;
});
