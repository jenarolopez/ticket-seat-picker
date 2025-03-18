'use client';

import { useRef, useEffect, useState } from 'react';
import { useVenue, Section } from '@/context/VenueContext';

export default function VenueCanvas() {
  const { state, selectSection, updateSection } = useVenue();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedSection, setDraggedSection] = useState<Section | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sections
    state.sections.forEach((section) => {
      drawSection(ctx, section);
    });
  }, [state.sections]);

  const drawSection = (ctx: CanvasRenderingContext2D, section: Section) => {
    const width = section.seatsPerRow * 20; // 20px per seat
    const height = section.rows * 20; // 20px per row

    // Draw section rectangle
    ctx.fillStyle = section.color || '#e5e5e5';
    ctx.fillRect(section.position.x, section.position.y, width, height);
    
    // Draw border
    ctx.strokeStyle = state.selectedSection?.id === section.id ? '#4f46e5' : '#000000';
    ctx.lineWidth = state.selectedSection?.id === section.id ? 3 : 2;
    ctx.strokeRect(section.position.x, section.position.y, width, height);

    // Draw section name
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.fillText(
      section.name,
      section.position.x + width / 2 - ctx.measureText(section.name).width / 2,
      section.position.y + height / 2
    );
  };

  const getSectionAtPosition = (x: number, y: number): Section | null => {
    return state.sections.find((section) => {
      const width = section.seatsPerRow * 20;
      const height = section.rows * 20;
      return (
        x >= section.position.x &&
        x <= section.position.x + width &&
        y >= section.position.y &&
        y <= section.position.y + height
      );
    }) || null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedSection = getSectionAtPosition(x, y);
    if (clickedSection) {
      setIsDragging(true);
      setDraggedSection(clickedSection);
      setDragOffset({
        x: x - clickedSection.position.x,
        y: y - clickedSection.position.y,
      });
      selectSection(clickedSection);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !draggedSection) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update section position
    const newX = Math.max(0, Math.min(x - dragOffset.x, canvas.width - draggedSection.seatsPerRow * 20));
    const newY = Math.max(0, Math.min(y - dragOffset.y, canvas.height - draggedSection.rows * 20));

    updateSection({
      ...draggedSection,
      position: { x: newX, y: newY },
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedSection(null);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-gray-300 rounded-lg cursor-move"
      />
      <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow text-sm">
        Click to select or drag to move sections
      </div>
    </div>
  );
} 