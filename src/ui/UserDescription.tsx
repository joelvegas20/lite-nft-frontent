import { AuthResponsePayload, UserData } from "@stacks/connect";
import styles from "./UserDescription.module.css";
import Image from "next/image";

export const UserDescription = ({
  userData, logOut, profilePicture
}: {
  userData: AuthResponsePayload | UserData | null,
  logOut: () => void,
  profilePicture: string
}) => {
  
  if (!userData) {
    window.alert("No user data found");
    return null;
  }
  return (
    <div className={`flex items-center flex-row bg-gray-300 p-3 border-box rounded ${styles.UserDescriptionContainer}`}>
      <Image src={profilePicture} alt="Profile" width={80} height={80} className="rounded-full" />
      <div className="flex flex-col justify-content-center items-center">
        <p className={`my-2 ${styles.AdressText}`}>{userData?.profile.stxAddress.testnet.slice(0, 5) + "..." + userData?.profile.stxAddress.testnet.slice(-5)}</p>
        <button type='button' onClick={logOut} className='bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform transition-transform duration-200'>
          Log Out
        </button>
      </div>
    </div>
  );
}

