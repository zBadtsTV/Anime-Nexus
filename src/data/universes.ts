export type UniverseId = 'saiyajin' | 'ninja' | 'pirate';

export interface Universe {
  id: UniverseId;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  shadowColor: string;
}

export const UNIVERSES: readonly Universe[] = [
  {
    id: 'saiyajin',
    name: 'Saiyajin',
    description: 'Guerreiros lendarios que superam seus limites.',
    icon: 'SAI',
    accentColor: '#ff7a1a',
    shadowColor: '#8a1c00',
  },
  {
    id: 'ninja',
    name: 'Ninja',
    description: 'Mestres de furtividade, velocidade e tecnicas precisas.',
    icon: 'NIN',
    accentColor: '#3ddc97',
    shadowColor: '#0f3d6e',
  },
  {
    id: 'pirate',
    name: 'Pirata',
    description: 'Aventureiros que navegam em busca de tesouros e liberdade.',
    icon: 'PIR',
    accentColor: '#f5c518',
    shadowColor: '#14305c',
  },
];
