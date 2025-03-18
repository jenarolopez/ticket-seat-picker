'use client';

import { useState, useEffect } from 'react';
import { useVenue, Section } from '@/context/VenueContext';

export default function VenueSectionForm() {
  const { state, addSection, updateSection } = useVenue();
  const selectedSection = state.selectedSection;
  const [formData, setFormData] = useState<Omit<Section, 'id'>>({
    name: '',
    rows: 1,
    seatsPerRow: 1,
    price: 0,
    position: { x: 0, y: 0 },
    color: '#e5e5e5',
  });

  useEffect(() => {
    if (selectedSection) {
      setFormData({
        name: selectedSection.name,
        rows: selectedSection.rows,
        seatsPerRow: selectedSection.seatsPerRow,
        price: selectedSection.price,
        position: selectedSection.position,
        color: selectedSection.color || '#e5e5e5',
      });
    }
  }, [selectedSection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSection) {
      updateSection({
        ...formData,
        id: selectedSection.id,
      });
    } else {
      addSection({
        ...formData,
        id: crypto.randomUUID(),
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rows: 1,
      seatsPerRow: 1,
      price: 0,
      position: { x: 0, y: 0 },
      color: '#e5e5e5',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Section Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="rows" className="block text-sm font-medium text-gray-700">
            Number of Rows
          </label>
          <input
            type="number"
            id="rows"
            min="1"
            value={formData.rows}
            onChange={(e) => setFormData({ ...formData, rows: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="seatsPerRow" className="block text-sm font-medium text-gray-700">
            Seats per Row
          </label>
          <input
            type="number"
            id="seatsPerRow"
            min="1"
            value={formData.seatsPerRow}
            onChange={(e) => setFormData({ ...formData, seatsPerRow: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price per Seat
        </label>
        <input
          type="number"
          id="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Section Color
        </label>
        <input
          type="color"
          id="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {selectedSection ? 'Update Section' : 'Add Section'}
        </button>
      </div>
    </form>
  );
} 