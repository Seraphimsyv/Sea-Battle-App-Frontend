import React, { useRef, useState, useEffect } from "react";

interface CellCanvasProps {
  cellSize: number;
}

export const Canvas: React.FC<CellCanvasProps> = ({ cellSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLDivElement | null>(null);
  /**
   * 
   * @param event 
   */
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    event.dataTransfer?.setData("text/plain", target.id);
    setIsDragging(true);
    setDraggedElement(target);
  };
  /**
   * 
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElement(null);
  }
  /**
   * 
   * @param event 
   */
  const handleDragEnter = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "lightblue";
  };
  /**
   * 
   * @param event 
   */
  const handleDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
  };
  /**
   * 
   * @param event 
   */
  const handleDragLeave = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.currentTarget.style.backgroundColor = "";
  };
  /**
   * 
   * @param event 
   * @returns 
   */
  const handleDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "";

    if (!isDragging) return;
    if (!draggedElement) return;

    const data = event.dataTransfer?.getData("text/plain");

    if (data) {
      const col = Math.floor(event.nativeEvent.offsetX / cellSize);
      const row = Math.floor(event.nativeEvent.offsetY / cellSize);    

      draggedElement.style.left = `${col * cellSize + (cellSize / 1.5) + 5}px`;
      draggedElement.style.top = `${row * cellSize + (cellSize / 1.5) + 5}px`;
    }
  };
  /**
   * 
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        context.strokeRect(x, y, cellSize, cellSize);
      }
    }
  }, [cellSize]);

  return (
    <>
      <canvas
        style={{ margin: '2em' }}
        ref={canvasRef}
        width={cellSize * 10}
        height={cellSize * 10}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
      <div
        id="draggable-element"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          position: "absolute",
          width: cellSize,
          height: cellSize,
          backgroundColor: "red",
          left: 0,
          top: 0,
        }}
      ></div>
    </>
  );
};