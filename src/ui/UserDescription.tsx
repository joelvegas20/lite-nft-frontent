import { userSession } from "@/lib/Wallet";
import { AuthResponsePayload } from "@stacks/connect";
import Image from "next/image";

export const UserDescription = ({
  userData, logOut
}: {
  userData: AuthResponsePayload | null,
  logOut: () => void
}) => {
  if (!userData) {
    window.alert("No user data found");
    return null;
  }
  return (
    <div className="absolute flex items-center flex-col right-10 top-20 bg-gray-500 p-3 border-box rounded">
      <Image src="/test.jpg" alt="Profile" width={80} height={80} className="rounded-full" />
      <p className="text-white my-2">{userData.profile.stxAddress.testnet.slice(0, 5) + "..." + userData?.profile.stxAddress.testnet.slice(-5)}</p>
      <button type='button' onClick={logOut} className='bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform transition-transform duration-200'>
        Disconnect Wallet
      </button>
    </div>
  );
}

