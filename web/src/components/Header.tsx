'use client';

import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header
      style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.05)' }}
      className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-300 shadow-2xl z-[1100] flex items-center justify-between pl-8 md:pl-14 pr-16 md:pr-24"
    >
      {/* Logo y título */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <img 
          src="/Imagenes/logo_puentealto.png" 
          alt="Logo Municipalidad de Puente Alto" 
          className="h-14 w-auto object-contain hidden sm:block ml-3"
          style={{ marginLeft: 40 }}
        />
        <div className="flex items-center gap-2 ml-2 md:ml-4">
          <svg 
            className="w-7 h-7 text-emerald-600 flex-shrink-0" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm md:text-base font-medium text-gray-700 truncate hidden md:block">
            Visor Departamento de Medio Ambiente — Municipalidad de Puente Alto
          </span>
        </div>
      </div>

      {/* Buscador de calles */}
      <div className="flex items-center gap-2" style={{ marginRight: 22 }}>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Buscar calle o ubicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-[26rem] md:w-[28rem] px-4 py-3 pr-3 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          aria-label="Buscar"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      </div>
    </header>
  );
}
