"use client";
import { useGlobal } from "@/context/GlobalContext";
import { BiSearchAlt } from "react-icons/bi";
import { BsLightningChargeFill } from "react-icons/bs";

export default function Navbar() {
  const { currentProfileSection, setCurrentProfileSection } = useGlobal();

  return (
    <div className="flex shadow-md drop-shadow-2xl h-20 justify-between items-center text-white px-5 py-5">
      <div className="flex items-center">
        <div className="flex bg-[#4D3B3B] font-bold rounded-full p-1">
          <button
            className={`px-4 py-2 rounded-full ${
              currentProfileSection === "NFTs"
                ? "bg-white text-black"
                : "text-white"
            }`}
            onClick={() => setCurrentProfileSection("NFTs")} // Actualiza el contexto
          >
            NFTs
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              currentProfileSection === "Collections"
                ? "bg-white text-black"
                : "text-white"
            }`}
            onClick={() => setCurrentProfileSection("Collections")} // Actualiza el contexto
          >
            Collections
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 w-full justify-end">
        <div className="flex items-center bg-[#4D3B3B] text-[#6C5252] rounded-full px-4 py-2 w-full max-w-md">
          <BiSearchAlt className="text-2xl mr-2" />
          <input
            type="text"
            placeholder="Search NFTs, Collections"
            className="bg-transparent focus:outline-none text-white font-bold placeholder-[#6C5252] mr-4 w-full"
          />
        </div>
        <button className="flex items-center font-bold text-normal gap-2 bg-white text-[#363636] px-5 py-2 rounded-full">
          <BsLightningChargeFill />
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}
