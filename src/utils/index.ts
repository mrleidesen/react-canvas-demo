export const saveCanvasToImage = (
  canvas?: HTMLCanvasElement | null,
  imageName = 'image'
): void => {
  if (!canvas) {
    return;
  }

  const url = canvas.toDataURL('image/jpeg', 1.0);
  const img = new Image();
  if (url) {
    img.src = url;
    img.onload = () => {
      const a = document.createElement('a');
      a.download = `${imageName}.jpg`;
      a.href = url;
      a.click();
    };
  }
};
