import { useRef, useEffect, useState } from 'react';
import getBrush from '../utilities/Brushes';

function Canvas(props) {
  const [cursorPos, setCursorPos] = useState({});
  const cursorPosRef = useRef(cursorPos);
  const newBrush = getBrush(props.brush);

  useEffect(() => {
    cursorPosRef.current = cursorPos;
  }, [cursorPos]);

  const canvasRef = useRef(null);
  let drawing = useRef(false);
  const timeOut = useRef(null);

  const pointerDown = (ctx) => {
    const brushParams = {
      x: cursorPosRef.current.x,
      y: cursorPosRef.current.y,
      radius: props.radius,
      lineWidth: props.lineWidth,
      coords: props.coords,
      colorStops: props.colorStops
    };

    newBrush(ctx, brushParams);
    ctx.stroke();

    timeOut.current = setTimeout(() => {
      pointerDown(ctx)
    }, 1);
  };

  const handleMouseDown = e => {
    if (event.button != 0) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.color = 'white';
    ctx.strokeStyle = `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`

    ctx.beginPath();
    pointerDown(ctx);
    drawing.current = true;
  };

  const handleMouseMove = e => {
    setCursorPos({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    });
  };

  const handleMouseUp = () => {
    clearTimeout(timeOut.current);
    drawing.current = false;
  };

  return (
    <canvas
      style={{
        backgroundColor: 'white',
        display: 'flex'
      }}
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={props.width}
      height={props.height}
      brush={props.brush}
      radius={props.radius}
      linewidth={props.lineWidth}
      color={props.color}
    />
  );
}

export default Canvas;