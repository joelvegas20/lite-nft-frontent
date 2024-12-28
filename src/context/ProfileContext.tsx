"use client";

import { userSession } from "@/lib/Wallet";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Storage } from '@stacks/storage';
import { generateAvatar } from "@/app/utils/Avatar";
import { storage } from "@/lib/Storage";

interface ProfileContextData {
  email: string;
  name: string;
  profilePicture: string;
  stxAddress: string;
  bns: string;
}

const ProfileContext = createContext<ProfileContextData | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<ProfileContextData | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const sessionData = userSession.loadUserData();

      if (userSession.isUserSignedIn()) {
        try {
          const storage = new Storage({ userSession });
          const profileData = await storage.getFile("profile.json", {
            decrypt: false,
          });

          if (profileData) {
            const profileString =
              typeof profileData === "string"
                ? profileData
                : new TextDecoder().decode(profileData as ArrayBuffer);
            const parsedProfile: ProfileContextData = JSON.parse(profileString);
            setProfile(parsedProfile);

          }
        } catch (error) {
          if ((error as any).code === "does_not_exist") {
            const storage = new Storage({ userSession });
            
            console.log("generando imagen de usuario");
            const profileDefaultImage = await generateAvatar(sessionData.profile.stxAddress.mainnet);
            console.log(profileDefaultImage);
            const defaultProfile: ProfileContextData = {
              name: "",
              email: "not email",
              bns: "not bns",
              profilePicture: profileDefaultImage || "",
              stxAddress: sessionData.profile.stxAddress.testnet,// Replace with current network
            };

            await storage.putFile(
              "profile.json",
              JSON.stringify(defaultProfile),
              { encrypt: false }
            );
            setProfile(defaultProfile);
          }
        } finally {
          // setLoading(false);
        }
      } else {
        // setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
};