import fs from 'fs';
import path from 'path';

export interface Model3D {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  fileSize: number;
  createdAt: string;
}

// In-memory model store with sample data
export const inMemoryModels: Model3D[] = [
  {
    id: 'sample-1',
    name: 'Futuristic Cyber Helmet',
    description: 'A high-detail 3D helmet model with metallic textures and glowing visor.',
    fileUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    fileSize: 3715124,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-2',
    name: 'Astronaut Suit 3D',
    description: 'Detailed space suit 3D model ready for PBR rendering.',
    fileUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Astronaut/glTF-Binary/Astronaut.glb',
    fileSize: 2840000,
    createdAt: new Date().toISOString()
  }
];

export const getUploadsDir = () => {
  const uploadsDir = process.env.VERCEL 
    ? path.join('/tmp', 'uploads') 
    : path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  return uploadsDir;
};
