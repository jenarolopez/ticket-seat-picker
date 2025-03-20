"use client";


import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function StadiumCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    
    // Example: Add a rectangle (simulate a seat)
    const seat = new fabric.Rect({
      left: 50,
      top: 50,
      fill: "blue",
      width: 40,
      height: 40,
    });

    seat.on("selected", () => alert("Seat selected!"));
    canvas.add(seat);

    return () => {
      canvas.dispose(); // Cleanup on unmount
    };
  }, []);

  return <canvas ref={canvasRef} width={600} height={400} className="border" />;
}
