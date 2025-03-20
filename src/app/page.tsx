'use client';

import VenueSectionForm from './components/VenueSectionForm';
import VenueCanvas from './components/VenueCanvas';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Venue Section Creator
          </h1>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Left side - Form */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Add/Edit Section
                </h2>
                <VenueSectionForm />
              </div>
            </div>

            {/* Right side - Canvas */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Venue Preview
                </h2>
                <VenueCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
