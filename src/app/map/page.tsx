'use client'

import React from 'react'
import SvgMap from './SvgMap'
import Navigation from '../components/Navigation'

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Venue Map</h1>
        <div className="border border-gray-300 rounded-lg shadow-lg overflow-auto max-w-full">
          <SvgMap className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

export default MapPage 