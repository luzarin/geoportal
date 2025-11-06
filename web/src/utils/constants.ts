// Ported constants
export const CENSO_CATEGORY_COLORS: Record<string, string> = {
  'Población': '#f97316',
  'Vivienda': '#2563eb',
  'Fecundidad': '#db2777',
  'Vivienda y servicios básicos': '#06b6d4',
  'Inmigración': '#22c55e',
  'Discapacidad': '#8b5cf6',
  'Educación': '#1d4ed8'
};

export const CENSO_PASTEL_COLORS: Record<string, string> = {
  'Población': '#fed7aa',
  'Vivienda': '#bfdbfe',
  'Fecundidad': '#fbcfe8',
  'Vivienda y servicios básicos': '#bae6fd',
  'Inmigración': '#bbf7d0',
  'Discapacidad': '#ddd6fe',
  'Educación': '#dbeafe'
};

export const LAYER_STYLES = {
  sectores: { fillColor: '#3b82f6', color: '#2563eb', weight: 2.5, fillOpacity: 0.25 },
  unidades_vecinales: { fillColor: '#a855f7', color: '#9333ea', weight: 2.5, fillOpacity: 0.25 },
  villas: { fillColor: '#10b981', color: '#059669', weight: 2.5, fillOpacity: 0.25 },
  peee_2024: { fillColor: '#d73027', color: '#8b1b16' },
  peee_2025: { fillColor: '#fdae61', color: '#b56b36' },
  peee_2024_2025: { fillColor: '#f46d43', color: '#9b3f28' },
  puntos_limpios: { fillColor: '#2563eb', color: '#1e40af' },
  puntos_verdes_comunidad: { fillColor: '#10b981', color: '#059669' },
  puntos_verdes_internos: { fillColor: '#f59e0b', color: '#d97706' }
};

export const MAP_CENTER: [number, number] = [-70.575, -33.61];
export const MAP_ZOOM = 12;

export const DATA_FILES = {
  comuna: '/datos/puentealto.geojson',
  censo: '/censo/CENSO_PUENTE_ALTO_UNIFICADO.csv',
  sectores: '/datos/sectores.geojson',
  villas: '/datos/villas.geojson',
  unidades_vecinales: '/datos/unidades_vecinales.geojson',
};
