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
      if (!userSession.isUserSignedIn()) {
        setProfile(null); 
        return;
      }

      const sessionData = userSession.loadUserData();

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
          const currentProfilePicture = parsedProfile.profilePicture;
          // in case that the profile picture is not a string for any reason, create it and upload it
          if (typeof currentProfilePicture === "object") {
            const profileDefaultImage = await generateAvatar(sessionData.profile.stxAddress.mainnet);
            const defaultProfile: ProfileContextData = {
              name: "",
              email: "not email",
              bns: "not bns",
              profilePicture: profileDefaultImage || "",
              stxAddress: sessionData.profile.stxAddress.testnet,
            };
            await storage.putFile("profile.json", JSON.stringify(defaultProfile), {
              encrypt: false,
            });
          }
          setProfile(parsedProfile);
        }
      } catch (error) {
        const sessionData = userSession.loadUserData();
        if ((error as { code: string }).code === "does_not_exist") {
          const profileDefaultImage = await generateAvatar(sessionData.profile.stxAddress.mainnet);
          const defaultProfile: ProfileContextData = {
            name: "",
            email: "not email",
            bns: "not bns",
            profilePicture: profileDefaultImage || "",
            stxAddress: sessionData.profile.stxAddress.testnet,
          };

          await storage.putFile("profile.json", JSON.stringify(defaultProfile), {
            encrypt: false,
          });
          setProfile(defaultProfile);
        }
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
  if (context?.profilePicture === "") {

  }
  if (context === undefined) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
};