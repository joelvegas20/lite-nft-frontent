import Link from "next/link";
import { BsFillLightningChargeFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="flex border border-black h-20 justify-between items-center text-white px-5 py-5">
      <Link
        className="flex items-center bg-white text-black px-5 py-2 rounded-full "
        href="#"
      >
        <span>Collections</span>
      </Link>
      <div className="flex items-center gap-8">
        <span>search</span>
        <Link
          className="flex items-center font-bold text-normal gap-4 bg-white text-black px-5 py-2 rounded-full "
          href="#"
        >
          <BsFillLightningChargeFill />
          <span>Create</span>
        </Link>
      </div>
    </div>
  );
}
