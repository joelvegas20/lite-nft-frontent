import { useEffect, useRef, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { LuImages } from "react-icons/lu";
import { userSession } from "@/lib/Wallet";
import Image from "next/image";
import Link from "next/link";
import styles from '@/ui/Card.module.css';
import { extractColorFromImage, parseRGBColor, isColorLight } from "@/app/utils/Colors";

interface CardProps {
  variant?: "profile" | "section";
  id: string;
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
                               variant = "profile",
                               id,
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
  let userData;

  try {
    userData = userSession.loadUserData();
  } catch (error) {
    userData = null;
  }

  useEffect(() => {
    if (image && prevImageUrl.current !== image) {
      prevImageUrl.current = image;
      (async () => {
        try {
          const color = await extractColorFromImage(image);
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

  if (parsedColor) {
    const { r, g, b } = parsedColor;
    const isLightBg = isColorLight(r, g, b);
    textColorClass = isLightBg ? "text-black" : "text-white";
  }

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

  let href = "/?notify-login=true";
  if (userData && id.includes("Collections-")) {
    href = `/collection/${userData?.profile.stxAddress.testnet}/${id.split("-")[1]}`;
  }

  return (
      <Link href={href}>
        <div
            className={`relative w-full h-full rounded-2xl overflow-hidden ${containerPadding} cursor-pointer hover:scale-105 transition-transform`}
        >
          {pinned && !image ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#2e1e1e]">
            <span className="text-white text-2xl font-bold transform -rotate-12 opacity-70">
              No NFT pinned
            </span>
              </div>
          ) : (
              <>
                {image && (
                    <img
                        src={image}
                        alt="Fondo"
                        className="object-cover absolute top-0 left-0 w-full h-full z-0"
                    />
                )}

                <div
                    className={`relative z-10 w-full h-full flex flex-col items-center justify-between rounded-2xl ${textColorClass} ${variant === "profile" ? "pt-4" : "pt-2"}`}
                >
                  {variant === "profile" && (
                      <div className={`absolute ${styles.cardMod}`} />
                  )}

                  <div className="flex w-full gap-4 items-center mb-4">
                    <div className={`relative ${imageSize}`}>
                      {ownerPicture && (
                          <Image
                              src={ownerPicture}
                              alt="Profile Owner Picture"
                              fill
                              className="rounded-full w-32 h-32 object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                          />
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
                      <div className={`col-span-2 flex items-center justify-center ${variant === 'profile' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'} rounded-full p-4 shadow shadow-xl`}>
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
                      <button className={`flex text-center items-center justify-center p-4 ${variant === 'profile' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'} rounded-full`}>
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                </div>
              </>
          )}
        </div>
      </Link>
  );
}