'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface Seat {
  id: string;
  number: string;
  isHidden: boolean;
  isSelected: boolean;
}

interface Row {
  id: string;
  number: string;
  seats: Seat[];
}

export default function CreateSeatPlan() {
  const [rows, setRows] = useState<Row[]>([]);
  const [stagePosition, setStagePosition] = useState<'top' | 'bottom'>('top');
  const [newRowNumber, setNewRowNumber] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [startSeatNumber, setStartSeatNumber] = useState<number>(1);
  const [seatsCount, setSeatsCount] = useState<number>(10);

  // Add a new row
  const handleAddRow = () => {
    if (!newRowNumber.trim()) return;

    const newRow: Row = {
      id: crypto.randomUUID(),
      number: newRowNumber,
      seats: [],
    };

    setRows([...rows, newRow]);
    setNewRowNumber('');
    setSelectedRowId(newRow.id);
  };

  // Delete a row
  const handleDeleteRow = (rowId: string) => {
    setRows(rows.filter(row => row.id !== rowId));
    if (selectedRowId === rowId) {
      setSelectedRowId(null);
    }
  };

  // Add seats to a row
  const handleAddSeats = () => {
    if (!selectedRowId || seatsCount <= 0) return;

    const updatedRows = rows.map(row => {
      if (row.id === selectedRowId) {
        const newSeats = Array.from({ length: seatsCount }, (_, index) => ({
          id: crypto.randomUUID(),
          number: `${startSeatNumber + index}`,
          isHidden: false,
          isSelected: false,
        }));
        return {
          ...row,
          seats: [...row.seats, ...newSeats],
        };
      }
      return row;
    });

    setRows(updatedRows);
    setStartSeatNumber(startSeatNumber + seatsCount);
  };

  // Delete a single seat
  const handleDeleteSeat = (rowId: string, seatId: string) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          seats: row.seats.filter(seat => seat.id !== seatId)
        };
      }
      return row;
    });
    
    setRows(updatedRows);
  };

  // Edit a seat number
  const handleEditSeat = (rowId: string, seatId: string) => {
    const row = rows.find(r => r.id === rowId);
    const seat = row?.seats.find(s => s.id === seatId);
    
    if (seat) {
      const newNumber = prompt("Enter new seat number:", seat.number);
      if (newNumber !== null) {
        setRows(rows.map(row => {
          if (row.id === rowId) {
            return {
              ...row,
              seats: row.seats.map(s => {
                if (s.id === seatId) {
                  return { ...s, number: newNumber };
                }
                return s;
              }),
            };
          }
          return row;
        }));
      }
    }
  };

  // Toggle seat visibility
  const toggleSeatVisibility = (rowId: string, seatId: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          seats: row.seats.map(seat => {
            if (seat.id === seatId) {
              return {
                ...seat,
                isHidden: !seat.isHidden,
              };
            }
            return seat;
          }),
        };
      }
      return row;
    }));
  };

  // Toggle seat selection
  const toggleSeatSelection = (rowId: string, seatId: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          seats: row.seats.map(seat => {
            if (seat.id === seatId) {
              return {
                ...seat,
                isSelected: !seat.isSelected,
              };
            }
            return seat;
          }),
        };
      }
      return row;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Seat Plan</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Save Seat Plan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Stage Position</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStagePosition('top')}
                    className={`px-4 py-2 rounded-md ${
                      stagePosition === 'top'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    Top
                  </button>
                  <button
                    onClick={() => setStagePosition('bottom')}
                    className={`px-4 py-2 rounded-md ${
                      stagePosition === 'bottom'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    Bottom
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Add Row</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newRowNumber}
                    onChange={(e) => setNewRowNumber(e.target.value)}
                    placeholder="Row number/letter"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleAddRow}
                    className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Add Seats to Row</h2>
                <div className="space-y-4">
                  <select
                    value={selectedRowId || ''}
                    onChange={(e) => setSelectedRowId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select a row</option>
                    {rows.map((row) => (
                      <option key={row.id} value={row.id}>
                        Row {row.number}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Number</label>
                      <input
                        type="number"
                        min="1"
                        value={startSeatNumber}
                        onChange={(e) => setStartSeatNumber(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                      <input
                        type="number"
                        min="1"
                        value={seatsCount}
                        onChange={(e) => setSeatsCount(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddSeats}
                    disabled={!selectedRowId}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Seats
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Legend</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 border border-gray-300 bg-white mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-indigo-600 mr-2"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 mr-2"></div>
                    <span>Hidden</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              {/* Stage */}
              {stagePosition === 'top' && (
                <div className="w-full h-16 bg-gray-800 mb-8 flex items-center justify-center text-white text-lg font-bold rounded-md">
                  STAGE
                </div>
              )}

              {/* Seat Map Container */}
              <div className="overflow-x-auto">
                <div className="min-w-max space-y-6">
                  {rows.map((row) => (
                    <div key={row.id} className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium w-10 text-center">Row {row.number}</span>
                        <button
                          onClick={() => handleDeleteRow(row.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete row"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {row.seats.map((seat) => (
                          <div key={seat.id} className="relative">
                            <button
                              onClick={() => toggleSeatSelection(row.id, seat.id)}
                              className={`
                                w-10 h-10 flex items-center justify-center rounded-md text-sm border
                                ${seat.isHidden ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                                  seat.isSelected ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300'}
                              `}
                              disabled={seat.isHidden}
                            >
                              {seat.number}
                            </button>
                            <div className="absolute -top-2 -right-2 flex space-x-1">
                              {/* Toggle Visibility Button */}
                              <button
                                onClick={() => toggleSeatVisibility(row.id, seat.id)}
                                className="w-5 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center"
                                title={seat.isHidden ? "Show Seat" : "Hide Seat"}
                              >
                                {seat.isHidden ? (
                                  <EyeSlashIcon className="h-3 w-3" />
                                ) : (
                                  <EyeIcon className="h-3 w-3" />
                                )}
                              </button>
                              {/* Edit Seat Button */}
                              <button
                                onClick={() => handleEditSeat(row.id, seat.id)}
                                className="w-5 h-5 bg-white rounded-full border border-blue-500 flex items-center justify-center"
                                title="Edit Seat"
                              >
                                ✏️
                              </button>
                              {/* Delete Seat Button */}
                              <button
                                onClick={() => handleDeleteSeat(row.id, seat.id)}
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
                  ))}
                </div>
              </div>

              {/* Stage at bottom */}
              {stagePosition === 'bottom' && (
                <div className="w-full h-16 bg-gray-800 mt-8 flex items-center justify-center text-white text-lg font-bold rounded-md">
                  STAGE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 