'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface Seat {
  id: string;
  number: string;
  isHidden: boolean;
}

interface Row {
  id: string;
  number: string;
  seats: Seat[];
}

interface Section {
  id: string;
  name: string;
  rows: Row[];
  price: number;
  color?: string;
}

export default function SectionManagement() {
  const [section, setSection] = useState<Section>({
    id: crypto.randomUUID(),
    name: 'New Section',
    rows: [],
    price: 0,
    color: '#e5e5e5',
  });
  const [newRowNumber, setNewRowNumber] = useState('');
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [newSeatNumber, setNewSeatNumber] = useState('');

  const handleAddRow = () => {
    if (!newRowNumber.trim()) return;

    const newRow: Row = {
      id: crypto.randomUUID(),
      number: newRowNumber,
      seats: [],
    };

    setSection((prevSection) => ({
      ...prevSection,
      rows: [...prevSection.rows, newRow],
    }));
    setNewRowNumber('');
  };

  const handleAddSeat = (row: Row) => {
    if (!newSeatNumber.trim()) return;

    const newSeat: Seat = {
      id: crypto.randomUUID(),
      number: newSeatNumber,
      isHidden: false,
    };

    setSection((prevSection) => ({
      ...prevSection,
      rows: prevSection.rows.map((r) =>
        r.id === row.id ? { ...r, seats: [...r.seats, newSeat] } : r
      ),
    }));
    setNewSeatNumber('');
  };

  const toggleSeatVisibility = (rowId: string, seatId: string) => {
    setSection((prevSection) => ({
      ...prevSection,
      rows: prevSection.rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              seats: row.seats.map((seat) =>
                seat.id === seatId
                  ? { ...seat, isHidden: !seat.isHidden }
                  : seat
              ),
            }
          : row
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Section Management</h1>

        {/* Section Details */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">Section Name</label>
          <input
            type="text"
            value={section.name}
            onChange={(e) => setSection({ ...section, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Add Row */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add Row</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newRowNumber}
              onChange={(e) => setNewRowNumber(e.target.value)}
              placeholder="Row number/letter"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddRow}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Row
            </button>
          </div>
        </div>

        {/* Rows and Seats Management */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Rows and Seats</h2>
          <div className="space-y-4">
            {section.rows.map((row) => (
              <div key={row.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Row {row.number}</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Seat number"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={selectedRow?.id === row.id ? newSeatNumber : ''}
                      onChange={(e) => {
                        setSelectedRow(row);
                        setNewSeatNumber(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => handleAddSeat(row)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Add Seat
                    </button>
                  </div>
                </div>

                {/* Seats Grid */}
                <div className="grid grid-cols-10 gap-2">
                  {row.seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeatVisibility(row.id, seat.id)}
                      className={`p-2 rounded-md text-sm flex items-center justify-center ${
                        seat.isHidden
                          ? 'bg-gray-200 text-gray-500'
                          : 'bg-green-100 text-green-800'
                      }`}
                      title={seat.isHidden ? 'Show Seat' : 'Hide Seat'}
                    >
                      {seat.isHidden ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                      <span className="ml-1">{seat.number}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 