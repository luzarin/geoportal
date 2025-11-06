'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface LayerItem {
  id: string;
  label: string;
  checked: boolean;
}

interface LayerCategory {
  id: string;
  title: string;
  iconHtml: string;
  open: boolean;
  layers: LayerItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLayerChange: (layerId: string, checked: boolean) => void;
}

// Sidebar component (ported from Next)
export default function Sidebar({ isOpen, onToggle, onLayerChange }: SidebarProps) {
  const [categories, setCategories] = useState<LayerCategory[]>([
    {
      id: 'estructura',
      title: '1. Estructura territorial',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#0ea5a4" stroke-width="2"><rect x="3" y="5" width="6" height="4" rx="1"/><rect x="3" y="11" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/></svg></div>',
      open: false,
      layers: [
        { id: 'chk-prc', label: 'Plan Regulador Comunal', checked: false },
        { id: 'chk-sectores', label: 'Sectores', checked: false },
        { id: 'chk-unidades', label: 'Unidades Vecinales', checked: false },
        { id: 'chk-villas', label: 'Villas', checked: false },
        { id: 'chk-sedes', label: 'Sedes Sociales', checked: false },
      ],
    },
    {
      id: 'peee',
      title: '2. Programa PEEE',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg></div>',
      open: true,
      layers: [
        { id: 'chk-peee-2024', label: '2024', checked: true },
        { id: 'chk-peee-2025', label: '2025', checked: true },
        { id: 'chk-peee-2024-2025', label: '2024 - 2025', checked: true },
      ],
    },
    {
      id: 'equipamiento',
      title: '3. Equipamiento Ambiental',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M12 2l6 4v5c0 5-3 9-6 11-3-2-6-6-6-11V6l6-4z"/></svg></div>',
      open: true,
      layers: [
        { id: 'chk-puntos-limpios', label: 'Puntos Limpios', checked: false },
        {
          id: 'chk-puntos-verdes-comunidad',
          label: 'Puntos Verdes de la Comunidad',
          checked: false,
        },
        { id: 'chk-puntos-verdes-internos', label: 'Puntos Verdes Internos', checked: false },
        { id: 'chk-intervenciones-comunales', label: 'Intervenciones Comunales', checked: false },
      ],
    },
    {
      id: 'educacion',
      title: '4. Educación Ambiental',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#6d28d9" stroke-width="2"><path d="M12 2L3 7l9 5 9-5-9-5z"/><path d="M3 17l9 5 9-5"/></svg></div>',
      open: false,
      layers: [
        { id: 'chk-edu-centros-extension', label: 'Centros de Extensión', checked: false },
        { id: 'chk-edu-jardines', label: 'Jardines Infantiles', checked: false },
        { id: 'chk-edu-colegios', label: 'Colegios', checked: false },
        { id: 'chk-edu-centros', label: 'Centros', checked: false },
        { id: 'chk-edu-cvt', label: 'CVT', checked: false },
        { id: 'chk-edu-adulto-mayor', label: 'Adulto Mayor', checked: false },
        { id: 'chk-edu-somos-huerto', label: 'Somos Huerto', checked: false },
      ],
    },
    {
      id: 'resimple',
      title: '5. ReSimple',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 7v-2h6v2"/></svg></div>',
      open: false,
      layers: [
        { id: 'chk-resimple-zona1', label: 'Zona 1', checked: false },
        { id: 'chk-resimple-zona2', label: 'Zona 2', checked: false },
        { id: 'chk-resimple-zona3', label: 'Zona 3', checked: false },
      ],
    },
    {
      id: 'censo',
      title: '6. Censo 2024 - Puente Alto',
      iconHtml:
        '<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:flex-start;margin-left:-6px"><svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg></div>',
      open: false,
      layers: [
        { id: 'chk-censo-poblacion', label: 'Población', checked: false },
        { id: 'chk-censo-vivienda', label: 'Vivienda', checked: false },
        { id: 'chk-censo-fecundidad', label: 'Fecundidad', checked: false },
        { id: 'chk-censo-servicios', label: 'Vivienda y servicios básicos', checked: false },
        { id: 'chk-censo-inmigracion', label: 'Inmigración', checked: false },
        { id: 'chk-censo-discapacidad', label: 'Discapacidad', checked: false },
        { id: 'chk-censo-educacion', label: 'Educación', checked: false },
      ],
    },
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, open: !cat.open } : cat)));
  };

  const handleLayerChange = (categoryId: string, layerId: string, checked: boolean) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, layers: cat.layers.map((layer) => (layer.id === layerId ? { ...layer, checked } : layer)) }
          : cat,
      ),
    );
    onLayerChange(layerId, checked);
  };

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <button
        onClick={onToggle}
        className="fixed top-24 left-4 z-[1001] md:hidden bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && <div onClick={onToggle} className="fixed inset-0 bg-black/50 z-[999] md:hidden" />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-20 left-0 bottom-0 w-[360px] bg-white border-r border-gray-200 shadow-lg z-[1000] no-scrollbar
          overflow-y-auto transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ boxShadow: '0 8px 24px rgba(2,6,23,0.06)', scrollbarGutter: 'stable' }}
      >
        <div className="pt-20 pb-12 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 w-full" style={{ marginTop: 24, marginBottom: 10, maxWidth: 300 }}>
            Capas Geográficas
          </h3>

          {/* Categorías: contenido centrado y más angosto que el sidebar */}
          <div style={{ width: '100%', maxWidth: 300, marginTop: 10 }}>
            {categories.map((category) => (
              <div key={category.id} className="w-full mx-auto" style={{ width: '100%', maxWidth: 300, margin: '0 0 15px 0' }}>
                {/* Header de categoría - SIN EXPANDIR */}
                {!category.open && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-4 py-4 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors shadow-sm"
                    style={{ minHeight: '45px', paddingLeft: '12px', paddingRight: '20px' }}
                  >
                    <div className="flex items-center gap-4">
                      <div dangerouslySetInnerHTML={{ __html: category.iconHtml }} />
                      <span className="text-base font-semibold text-gray-800">{category.title}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}

                {/* Header de categoría - EXPANDIDO */}
                {category.open && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-4 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                      style={{ minHeight: '45px', paddingLeft: '12px', paddingRight: '20px' }}
                    >
                      <div className="flex items-center gap-4">
                        <div dangerouslySetInnerHTML={{ __html: category.iconHtml }} />
                        <span className="text-base font-semibold text-gray-800">{category.title}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Contenido expandible */}
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <div className="space-y-3">
                        {category.layers.map((layer) => (
                          <label
                            key={layer.id}
                            className="flex items-center gap-4 pr-4 py-3 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                            style={{ minHeight: '44px', paddingLeft: '32px' }}
                          >
                            <input
                              type="checkbox"
                              checked={layer.checked}
                              onChange={(e) => handleLayerChange(category.id, layer.id, e.target.checked)}
                              className="w-4 h-4 accent-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 cursor-pointer flex-shrink-0"
                            />
                            <span className="text-[15px] text-gray-800">{layer.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Acerca del Proyecto */}
          <div
            className="mt-6 mb-10 w-full p-8 bg-white rounded-lg border-2 border-teal-400"
            style={{ width: '100%', maxWidth: 300, paddingLeft: 20, paddingRight: 20, paddingTop: 22, paddingBottom: 20 }}
          >
            <div className="flex items-center justify-center" style={{ marginTop: 8, marginBottom: 12 }}>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide text-center w-full" style={{ margin: 0 }}>
                ACERCA DEL PROYECTO
              </h4>
            </div>

            {/* Barra de colores */}
            <div className="flex gap-0 rounded overflow-hidden h-1.5" style={{ marginTop: 10, marginBottom: 10 }}>
              <div className="flex-1 bg-blue-900"></div>
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-cyan-500"></div>
              <div className="flex-1 bg-amber-400"></div>
              <div className="flex-1 bg-cyan-500"></div>
            </div>

            <div style={{ paddingLeft: 12, paddingRight: 12, marginTop: 10, marginBottom: 10 }}>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 text-justify" style={{ margin: 0, paddingTop: 6 }}>
                El presente proyecto, desarrollado por el Departamento de Medio Ambiente, expone información territorial de la comuna de Puente Alto, abarcando su estructura espacial, los programas implementados y el equipamiento asociado.
              </p>
            </div>

            {/* Separador explícito para asegurar espacio visible */}
            <div className="h-4" aria-hidden="true" />

            {/* Créditos dentro de la caja */}
            <div style={{ paddingLeft: 12, paddingRight: 12 }}>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg shadow" style={{ padding: '6px 5px', width: '230px', height: '55px' }}>
                <span className="text-[13.4px] text-gray-700 text-center block">Desarrollado por Javier Jaramillo y Lucas Blachet</span>
              </div>
            </div>
          </div>

          {/* Spacer final para garantizar espacio bajo el sidebar */}
          <div className="h-8" />
        </div>
      </aside>
    </>
  );
}
