import { useEffect, useRef } from 'react';

export const Write: React.VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 384;
  const canvasHeight = 224;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let beginX: number | null = null,
      beginY: number | null = null;
    let stopX, stopY;

    if (canvas && ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      canvas.addEventListener('mousedown', (event) => {
        event.preventDefault();
        ctx.beginPath();
        beginX = event.clientX - canvas.offsetLeft;
        beginY = event.clientY - canvas.offsetTop;
        ctx.moveTo(beginX, beginY);
      });
      canvas.addEventListener('mousemove', (event) => {
        event.preventDefault();
        stopX = event.clientX - canvas.offsetLeft;
        stopY = event.clientY - canvas.offsetTop;
        if (beginX && beginY) {
          ctx.lineTo(stopX, stopY);
          ctx.stroke();
        }
      });
      canvas.addEventListener('mouseup', (event) => {
        event.preventDefault();
        beginX = null;
        beginY = null;
      });
    }
  }, []);

  function onClearCanvas() {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  function onDownload() {
    const url = canvasRef.current?.toDataURL('image/jpeg', 1.0);
    const img = new Image();
    if (url) {
      img.src = url;
      img.onload = () => {
        const a = document.createElement('a');
        a.download = 'sign.jpg';
        a.href = url;
        a.click();
      };
    }
  }

  return (
    <div className="w-96">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className=" border border-gray-200"
      />
      <div className="mt-4">
        <button
          className="rounded px-2 py-1 bg-blue-500 text-white"
          onClick={onClearCanvas}
        >
          清空
        </button>
        <button
          className="rounded px-2 py-1 bg-teal-500 text-white"
          onClick={onDownload}
        >
          下载
        </button>
      </div>
    </div>
  );
};
