import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MapContainer from '../components/MapContainer'
import { useState } from 'react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({})

  const handleLayerChange = (layerId: string, checked: boolean) => {
    setActiveLayers(prev => ({ ...prev, [layerId]: checked }))
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <Header onSearch={() => {}} />
      <div className="flex w-full h-full pt-20">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onLayerChange={handleLayerChange} />
        <div className="flex-1 relative" style={{ marginLeft: 360 }}>
          <MapContainer activeLayers={activeLayers} />
        </div>
      </div>
    </div>
  )
}
