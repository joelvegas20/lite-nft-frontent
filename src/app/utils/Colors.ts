export function getAverageColor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): [number, number, number] {
  const imageData = ctx.getImageData(x, y, w, h).data;
  let r = 0,
    g = 0,
    b = 0;
  const count = imageData.length / 4;
  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
  }
  return [Math.floor(r / count), Math.floor(g / count), Math.floor(b / count)];
}

export async function extractColorFromImage(imgUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        return reject("Imagen sin dimensiones válidas");
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject("No contexto");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const samples = [
          getAverageColor(ctx, 0, 0, 10, 10),
          getAverageColor(ctx, img.width - 10, 0, 10, 10),
          getAverageColor(ctx, 0, img.height - 10, 10, 10),
          getAverageColor(ctx, img.width - 10, img.height - 10, 10, 10),
        ];

        let r = 0,
          g = 0,
          b = 0;
        for (const [rr, gg, bb] of samples) {
          r += rr;
          g += gg;
          b += bb;
        }

        r = Math.floor(r / samples.length);
        g = Math.floor(g / samples.length);
        b = Math.floor(b / samples.length);

        resolve(`rgb(${r}, ${g}, ${b})`);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject("Error al cargar imagen");
  });
}

export function parseRGBColor(colorString: string) {
  const match = colorString.match(
    /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
  );
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

export function isColorLight(r: number, g: number, b: number): boolean {
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128;
}
