'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';

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

export default function SeatPlan() {
  const [section, setSection] = useState<Section>({
    id: crypto.randomUUID(),
    name: 'Main Section',
    rows: Array.from({ length: 5 }, (_, rowIndex) => ({
      id: crypto.randomUUID(),
      number: `Row ${rowIndex + 1}`,
      seats: Array.from({ length: 10 }, (_, seatIndex) => ({
        id: crypto.randomUUID(),
        number: `S${seatIndex + 1}`,
        isHidden: false,
      })),
    })),
    price: 0,
    color: '#e5e5e5',
  });

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

  const handleDeleteSeat = (rowId: string, seatId: string) => {
    console.log('Deleting seat:', { rowId, seatId });
    
    const updatedRows = section.rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          seats: row.seats.filter(seat => seat.id !== seatId)
        };
      }
      return row;
    });
    
    setSection({ ...section, rows: updatedRows });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seat Plan</h1>

        {/* Seat Plan Grid */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Seats</h2>
          <div className="space-y-4">
            {section.rows.map((row) => (
              <div key={row.id} className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">{row.number}</h3>
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
                  <button
                    onClick={() => handleDeleteSeat(row.id, row.seats[0].id)}
                    className="w-5 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center"
                    title="Delete Seat"
                  >
                    <TrashIcon className="h-3 w-3 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 