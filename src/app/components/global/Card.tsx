import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { extractColorFromImage, parseRGBColor, isColorLight } from "@/app/utils/Colors";

const STATIC_IMAGE_URL = "https://images.gamma.io/ipfs/QmcAqUQDJ1bcLZVtCqJduLReGYyWm9TjdcHzAqNDEV5r24/images/1109.webp";

export default function Card() {
  const [dominantColor, setDominantColor] = useState("rgba(0,0,0,1)");
  // const [prevImageUrl, ]

  useEffect(() => {
    const urlToUse = STATIC_IMAGE_URL;

    // Sólo recalcular si la url cambió
    if (prevImageUrl.current !== urlToUse) {
      prevImageUrl.current = urlToUse;
      (async () => {
        try {
          const color = await extractColorFromImage(urlToUse);
          setDominantColor(color);
        } catch (error) {
          console.error("Error extrayendo el color:", error);
          setDominantColor("rgb(0,0,0)");
        }
      })();
    }
  }, []);

  const parsedColor = parseRGBColor(dominantColor);
  let textColorClass = "text-white";
  let backgroundColorOverlay = dominantColor; // Fondo original, sólido

  if (parsedColor) {
    const { r, g, b } = parsedColor;
    const isLightBg = isColorLight(r, g, b);
    textColorClass = isLightBg ? "text-black" : "text-white";
    // Para ver la imagen detrás, agregamos transparencia al fondo.
    backgroundColorOverlay = `rgba(${r}, ${g}, ${b}, 0.5)`; // 50% transparencia
  }

return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src={STATIC_IMAGE_URL}
        alt="Fondo"
        fill
        className="object-cover absolute top-0 left-0 w-full h-full z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Contenido sobre la imagen */}
      <div
        className={`relative z-10 w-full h-full p-4 flex flex-col items-center justify-between rounded-2xl ${textColorClass}`}
      >
        <div className="flex w-full gap-4 items-center mb-6">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <Image
              src="https://images.unsplash.com/photo-1565884280295-98eb83e41c65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
              alt="Imagen de Perfil"
              fill
              className="rounded-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">SP2SJ...1BD63M</h3>
            <span className="text-sm sm:text-base">not bns</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-[8 0%] justify-center w-full h-10 sm:h-12 rounded-full ">
          <div className="bg-[#4D3B3B] flex items-center justify-center rounded-full">
            <span>11</span>
          </div>
          <div className="col-span-2 flex  items-center justify-center bg-[#4D3B3B] rounded-full">
            39.735 STX
          </div>
          <div className="bg-[#4D3B3B] flex items-center justify-center rounded-full">
            <button>save</button>
          </div>
        </div>
      </div>
    </div>
  );
}