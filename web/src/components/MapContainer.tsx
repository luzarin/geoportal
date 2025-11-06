'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { MAP_CENTER, MAP_ZOOM } from '../utils/constants';

interface MapContainerProps {
  onMapLoad?: (map: maplibregl.Map) => void;
  activeLayers?: Record<string, boolean>; // wiring from Sidebar
}

export default function MapContainer({ onMapLoad, activeLayers }: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [currentBasemap, setCurrentBasemap] = useState<'osm' | 'satellite' | 'topo'>('osm');
  const [showBasemapOptions, setShowBasemapOptions] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          { id: 'osm', type: 'raster', source: 'osm', minzoom: 0, maxzoom: 19 }
        ]
      },
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapInstance.addControl(new maplibregl.ScaleControl(), 'bottom-right');

    map.current = mapInstance;

    mapInstance.on('load', () => {
      if (onMapLoad) onMapLoad(mapInstance);
    });

    mapInstance.on('error', (e) => {
      console.error('Error en el mapa:', e);
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [onMapLoad]);

  // Helper to add/remove a GeoJSON source+layers for a given id
  const ensureLayer = async (
    id: string,
    url: string,
    kind: 'fill' | 'line' | 'circle',
  ) => {
    if (!map.current) return;
    const m = map.current;
    const sourceId = `src-${id}`;

    // Create source if missing
    if (!m.getSource(sourceId)) {
      m.addSource(sourceId, {
        type: 'geojson',
        data: url,
      } as any);
    }

    // Add layers according to kind
    if (kind === 'fill') {
      if (!m.getLayer(`fill-${id}`)) {
        m.addLayer({
          id: `fill-${id}`,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': '#10b981',
            'fill-opacity': 0.25,
          },
        } as any);
      }
      if (!m.getLayer(`line-${id}`)) {
        m.addLayer({
          id: `line-${id}`,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': '#059669',
            'line-width': 2,
          },
        } as any);
      }
    } else if (kind === 'line') {
      if (!m.getLayer(`line-${id}`)) {
        m.addLayer({
          id: `line-${id}`,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': '#2563eb',
            'line-width': 2,
          },
        } as any);
      }
    } else if (kind === 'circle') {
      if (!m.getLayer(`circle-${id}`)) {
        m.addLayer({
          id: `circle-${id}`,
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-color': '#2563eb',
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#1e40af',
          },
        } as any);
      }
    }
  };

  const removeLayer = (id: string) => {
    if (!map.current) return;
    const m = map.current;
    const sourceId = `src-${id}`;
    // Remove possible layers
    ['fill-', 'line-', 'circle-'].forEach((p) => {
      const lid = `${p}${id}`;
      if (m.getLayer(lid)) m.removeLayer(lid);
    });
    if (m.getSource(sourceId)) m.removeSource(sourceId);
  };

  // Wiring: react to sidebar activeLayers
  useEffect(() => {
    if (!map.current || !activeLayers) return;
    const entries = Object.entries(activeLayers);
    for (const [id, checked] of entries) {
      // Map known ids to files/kinds
      if (id === 'chk-sectores') {
        checked ? ensureLayer(id, '/datos/sectores.geojson', 'fill') : removeLayer(id);
      } else if (id === 'chk-unidades') {
        checked ? ensureLayer(id, '/datos/unidades_vecinales.geojson', 'fill') : removeLayer(id);
      } else if (id === 'chk-villas') {
        checked ? ensureLayer(id, '/datos/villas.geojson', 'fill') : removeLayer(id);
      } else {
        // TODO: conectar el resto cuando definamos sus archivos
        if (!checked) removeLayer(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayers]);

  const handleBasemapChange = (type: 'osm' | 'satellite' | 'topo') => {
    if (!map.current) return;
    setCurrentBasemap(type);

    const newStyle = type === 'satellite' ? {
      version: 8,
      sources: {
        'satellite': {
          type: 'raster',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: '© Esri'
        }
      },
      layers: [{ id: 'satellite', type: 'raster', source: 'satellite', minzoom: 0, maxzoom: 22 }]
    } : type === 'topo' ? {
      version: 8,
      sources: {
        'topo': {
          type: 'raster',
          tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenTopoMap contributors'
        }
      },
      layers: [{ id: 'topo', type: 'raster', source: 'topo', minzoom: 0, maxzoom: 17 }]
    } : {
      version: 8,
      sources: {
        'osm': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors'
        }
      },
      layers: [{ id: 'osm', type: 'raster', source: 'osm', minzoom: 0, maxzoom: 19 }]
    };

    map.current.setStyle(newStyle as any);
    setShowBasemapOptions(false);
    map.current.once('styledata', () => { if (onMapLoad && map.current) onMapLoad(map.current); });
  };

  const handleHomeClick = () => {
    if (!map.current) return;
    map.current.flyTo({ center: MAP_CENTER, zoom: MAP_ZOOM, duration: 1000 });
  };

  return (
    <div className="relative w-full h-full" style={{ minHeight: '100%' }}>
      <div ref={mapContainer} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />

      <div className="absolute bottom-24 right-4 text-gray-400 text-xs font-mono pointer-events-none select-none opacity-30">jjch</div>

      <div className="absolute top-50 right-6.5 flex flex-col gap-2">
        <div className="relative">
          <button onClick={() => setShowBasemapOptions(!showBasemapOptions)} className="bg-white rounded-md shadow-md p-3.5 hover:bg-gray-50 transition-colors border border-gray-300" title="Cambiar mapa base">
            <svg className="w-7 h-7 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </button>
          {showBasemapOptions && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[140px] z-10">
              <button onClick={() => handleBasemapChange('osm')} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${currentBasemap === 'osm' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700'}`}>
                <span>🗺️</span><span>Calles</span>
              </button>
              <button onClick={() => handleBasemapChange('topo')} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${currentBasemap === 'topo' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700'}`}>
                <span>🗻</span><span>Topográfico</span>
              </button>
              <button onClick={() => handleBasemapChange('satellite')} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${currentBasemap === 'satellite' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700'}`}>
                <span>🛰️</span><span>Satélite</span>
              </button>
            </div>
          )}
        </div>

        <button onClick={handleHomeClick} className="bg-white rounded-md shadow-md p-3.5 hover:bg-gray-50 transition-colors border border-gray-300" title="Volver al inicio">
          <svg className="w-7 h-7 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 flex z-10">
        <div className="flex-1 bg-blue-900"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-cyan-500"></div>
        <div className="flex-1 bg-amber-400"></div>
        <div className="flex-1 bg-cyan-500"></div>
      </div>
    </div>
  );
}
