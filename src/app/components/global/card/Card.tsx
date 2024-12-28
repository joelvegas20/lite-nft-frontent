// components/Card.tsx

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  extractColorFromImage,
  parseRGBColor,
  isColorLight,
} from "@/app/utils/Colors";
import { FaBookmark } from "react-icons/fa";
import { LuImages } from "react-icons/lu";
import styles from '@/ui/Card.module.css';

interface CardProps {
  variant?: "profile" | "section"; // Propiedad para determinar la variante
  ownerTitle: string;
  ownerSubtitle: string;
  ownerPicture: string;
  title: string;
  subtitle: string;
  currentPrice: string;
  pinned: boolean;
  quantity: number;
  image: string;
}

export default function Card({
  variant = "profile", // Valor por defecto
  ownerTitle,
  ownerSubtitle,
  ownerPicture,
  title,
  subtitle,
  currentPrice,
  pinned,
  quantity,
  image,
}: CardProps) {
  const [dominantColor, setDominantColor] = useState("rgba(0,0,0,1)");
  const prevImageUrl = useRef<string | null>(null);

  useEffect(() => {
    const urlToUse = image;

    // Solo recalcular si la URL cambió
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
  }, [image]);

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

  // Definir clases condicionales basadas en la variante usando ternarios
  const containerPadding = variant === "profile" ? "p-4" : "p-2";
  const imageSize =
    variant === "profile"
      ? "w-12 h-12 sm:w-16 sm:h-16"
      : "w-10 h-10 sm:w-14 sm:h-14";
  const titleClass =
    variant === "profile"
      ? "text-fluid-md sm:text-fluid-lg"
      : "text-fluid-sm sm:text-fluid-md";
  const subtitleClass =
    variant === "profile"
      ? "text-fluid-sm sm:text-fluid-md"
      : "text-xs sm:text-sm";
  const buttonClass =
    variant === "profile" ? "px-3 py-2 text-sm" : "px-2 py-1 text-xs";
  // const cardSizeSection = "w-72 h-96";
  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden ${containerPadding}`}
    >
      <Image
        src={image}
        alt="Fondo"
        fill
        className="object-cover absolute top-0 left-0 w-full h-full z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-between rounded-2xl ${textColorClass}`}
      // style={{ backgroundColor: backgroundColorOverlay }}
      >
        {variant === "profile" &&
          (
            <div className={`absolute ${styles.cardMod}`}>
            </div>
          )
        }

        <div className="flex w-full gap-4 items-center mb-4">
          <div className={`relative ${imageSize}`}>
            {ownerPicture ? (
              <Image
                src={ownerPicture}
                alt="Profile Owner Picture"
                fill
                className="rounded-full w-32 h-32 object-cover" // Ajusta el tamaño según sea necesario
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${titleClass}`}>{ownerTitle}</h3>
            <span className={subtitleClass}>{ownerSubtitle}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div>
            <h2 className={`font-bold ${titleClass}`}>{title}</h2>
            <p className={`font-bold line-clamp-2 ${subtitleClass}`}>
              {subtitle}
            </p>
          </div>
          <div className="flex gap-4 text-sm justify-center w-full h-10 rounded-full">
            <div className="col-span-2 flex items-center justify-center bg-[#4D3B3B] rounded-full p-4 shadow sshadow-xl ">
              {currentPrice ? (
                <span>
                  {currentPrice} <span className="font-bold">STX</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LuImages />
                  <span>{quantity}</span>
                </span>
              )}
            </div>
            <button className=" flex text-center items-center justify-center p-4 bg-[#4D3B3B] rounded-full">
              <FaBookmark />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
