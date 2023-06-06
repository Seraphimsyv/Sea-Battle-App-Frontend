import { Location } from "../types/game.types";

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const renderingShipsLocation = (context: CanvasRenderingContext2D, location: Location, cellSize: number) => {
  context.fillStyle = 'black';
  context.fillRect(location.x * cellSize, location.y * cellSize, cellSize, cellSize);
}

const renderingBackground = (context: CanvasRenderingContext2D, width: number, height: number, cellSize: number) : void => {
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#000066'); // Верхний цвет
  gradient.addColorStop(1, '#0000CC'); // Нижний цвет
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  
  // Отрисовка звезд
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3;
    
    context.fillStyle = '#FFFFFF';
    context.fillRect(x, y, size, size);
  }
}

const renderingNavigatePositions = (context: CanvasRenderingContext2D , cellSize: number) : void => {
  for (let row = 1; row < 11; row++) {
    const y = row * cellSize;
    context.font = `${cellSize / 2}px Arial`;
    context.fillStyle = 'black';
    context.fillText(
      String(row),
      cellSize / 4, y + (cellSize / 1.5)
    )
  }
  for (let col = 0; col < 11; col++) {
    const x = col * cellSize;
    context.font = `${cellSize / 2}px Arial`;
    context.fillStyle = 'black';
    context.fillText(
      col === 0 ? '#' : alphabet[col-1],
      x + (cellSize / 4), cellSize / 1.5
    )
  }
}

const renderingCanvasPlaground = (canvas: HTMLCanvasElement, cellSize: number) : void => {
  const context = canvas.getContext('2d');

  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // renderingBackground(context, canvas.width, canvas.height, cellSize);
  renderingNavigatePositions(context, cellSize);

  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 11; col++) {
      const x = col * cellSize;
      const y = row * cellSize;

      context.strokeStyle = 'black';
      context.strokeRect(x, y, cellSize, cellSize)
    }
  }
}

export {
  renderingShipsLocation,
  renderingNavigatePositions,
  renderingCanvasPlaground,
  renderingBackground
}