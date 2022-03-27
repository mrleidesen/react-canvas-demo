import { useEffect, useRef } from 'react';

import { saveCanvasToImage } from '@/utils';

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

    function onMouseDown(event: MouseEvent) {
      event.preventDefault();
      if (canvas && ctx) {
        ctx.beginPath();
        beginX = event.clientX - canvas.offsetLeft;
        beginY = event.clientY - canvas.offsetTop;
        ctx.moveTo(beginX, beginY);
      }
    }
    function onMouseMove(event: MouseEvent) {
      event.preventDefault();
      if (canvas && ctx) {
        stopX = event.clientX - canvas.offsetLeft;
        stopY = event.clientY - canvas.offsetTop;
        if (beginX && beginY) {
          ctx.lineTo(stopX, stopY);
          ctx.stroke();
        }
      }
    }
    function onMouseUp(event: MouseEvent) {
      event.preventDefault();
      beginX = null;
      beginY = null;
    }

    if (canvas && ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    canvas?.addEventListener('mousedown', onMouseDown);
    canvas?.addEventListener('mousemove', onMouseMove);
    canvas?.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas?.removeEventListener('mousedown', onMouseDown);
      canvas?.removeEventListener('mousemove', onMouseMove);
      canvas?.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  function onClearCanvas() {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  function onDownload() {
    saveCanvasToImage(canvasRef.current, 'sign');
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
