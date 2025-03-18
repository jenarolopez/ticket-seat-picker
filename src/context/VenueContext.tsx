"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Section {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  price: number;
  position: {
    x: number;
    y: number;
  };
  color?: string;
}

interface VenueState {
  sections: Section[];
  selectedSection: Section | null;
}

type VenueAction =
  | { type: 'ADD_SECTION'; payload: Section }
  | { type: 'UPDATE_SECTION'; payload: Section }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'SELECT_SECTION'; payload: Section | null };

interface VenueContextType {
  state: VenueState;
  addSection: (section: Section) => void;
  updateSection: (section: Section) => void;
  deleteSection: (sectionId: string) => void;
  selectSection: (section: Section | null) => void;
}

// Initial state
const initialState: VenueState = {
  sections: [],
  selectedSection: null,
};

// Create context
const VenueContext = createContext<VenueContextType | undefined>(undefined);

// Reducer
function venueReducer(state: VenueState, action: VenueAction): VenueState {
  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload.id ? action.payload : section
        ),
      };
    case 'DELETE_SECTION':
      return {
        ...state,
        sections: state.sections.filter((section) => section.id !== action.payload),
      };
    case 'SELECT_SECTION':
      return {
        ...state,
        selectedSection: action.payload,
      };
    default:
      return state;
  }
}

// Provider component
export function VenueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(venueReducer, initialState);

  const addSection = (section: Section) => {
    dispatch({ type: 'ADD_SECTION', payload: section });
  };

  const updateSection = (section: Section) => {
    dispatch({ type: 'UPDATE_SECTION', payload: section });
  };

  const deleteSection = (sectionId: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: sectionId });
  };

  const selectSection = (section: Section | null) => {
    dispatch({ type: 'SELECT_SECTION', payload: section });
  };

  return (
    <VenueContext.Provider
      value={{
        state,
        addSection,
        updateSection,
        deleteSection,
        selectSection,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
}

// Custom hook to use the venue context
export function useVenue() {
  const context = useContext(VenueContext);
  if (context === undefined) {
    throw new Error('useVenue must be used within a VenueProvider');
  }
  return context;
} 