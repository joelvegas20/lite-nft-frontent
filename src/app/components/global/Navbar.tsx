"use client";
import { useGlobal } from "@/context/GlobalContext";
import { userSession } from "@/lib/Wallet";
import { usePathname } from "next/navigation";
import { BiSearchAlt } from "react-icons/bi";
import { BsLightningChargeFill } from "react-icons/bs";

export default function Navbar() {
  const { currentProfileSection, setCurrentProfileSection } = useGlobal();

  return (
    <div className="flex shadow-md drop-shadow-2xl max-h-16 text-white px-10 py-3 w-full">
      <div className="flex items-center w-full justify-between">
        {(usePathname() === "/profile") && (
          <div className="flex bg-[#4D3B3B] font-bold rounded-full p-1">
            <button
              className={`px-4 py-2 text-xs font-bold rounded-full ${
                currentProfileSection === "NFTs"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setCurrentProfileSection("NFTs")} // Actualiza el contexto
            >
              NFTs
            </button>
            <button
              className={`px-4 py-2 text-xs font-bold rounded-full ${
                currentProfileSection === "Collections"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setCurrentProfileSection("Collections")} // Actualiza el contexto
            >
              Collections
            </button>
          </div>
        )}

        <div className="flex items-center bg-[#4D3B3B] text-[#6C5252] rounded-full px-4 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-white transition ease-in-out duration-500">
          <BiSearchAlt className="text-xl mr-2" />
          <input
            type="text"
            placeholder="Search NFTs, Collections"
            className="bg-transparent focus:outline-none text-white font-bold text-sm placeholder-[#6C5252] mr-4 w-full"
          />
        </div>
        <a
          href="/create-nft"
          className="group flex items-center transition ease-in-out duration-300 font-bold text-sm gap-2 bg-white text-[#363636] px-5 py-2 rounded-full hover:bg-gray-900 hover:text-white"
        >
          <BsLightningChargeFill className="group-hover:animate-pulse" />
          <span>Create</span>
        </a>
      </div>
    </div>
  );
}
