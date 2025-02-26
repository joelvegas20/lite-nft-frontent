"use client";
import React, { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { useGlobal } from "@/context/GlobalContext";
import Card from "../components/global/card/Card";
import SpinnerLoader from "@/ui/SpinnerLoader";
import { shortenAddress } from "../utils/Address";
import { userSession } from "@/lib/Wallet";
import { useRouter } from "next/navigation";

const STATIC_IMAGE_URL =
    "https://images.gamma.io/ipfs/QmcAqUQDJ1bcLZVtCqJduLReGYyWm9TjdcHzAqNDEV5r24/images/1109.webp";

async function getCollections(address) {
  return await fetch(`/api/collection/${address}`)
      .then((res) => res.json())
      .then((res) => res.data);
}

async function getNFTs(address) {
  return await fetch(`/api/nft/${address}`)
      .then((res) => res.json())
      .then((res) => res.data);
}

const Profile = () => {
  const profile = useProfile();
  const router = useRouter();
  const { currentProfileSection } = useGlobal(); // Toggle: NFTs o Collections
  const [profileCardData, setProfileCardData] = useState({
    title: "",
    subtitle: "not bns",
    profilePicture: "",
  });

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]); // Simulando datos de historial

  useEffect(() => {
    if (!userSession.isUserSignedIn()) {
      router.replace("/?notify-login=true");
    }

    if (profile) {
      if (profile.name === "not name" || profile.name === "") {
        setProfileCardData({
          title: shortenAddress(profile.stxAddress) || "",
          subtitle: profile.bns || "not bns",
          profilePicture: profile.profilePicture,
        });
      } else {
        setProfileCardData({
          title: profile.name || "",
          subtitle: profile.stxAddress || "not stx address",
          profilePicture: profile.profilePicture,
        });
      }
    }
  }, [profile]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (profile) {
          const data =
              currentProfileSection === "NFTs"
                  ? await getNFTs(profile.stxAddress)
                  : await getCollections(profile.stxAddress);

          setTimeout(() => {
            setItems(data);
            setIsLoading(false);
          }, 250);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentProfileSection, profile]);

  return (
      <div className="py-8 px-8 text-white h-full">
        <div className="flex justify-between gap-4 h-full w-full">
          <div className="flex flex-col gap-4 w-3/5">
            {/* Sección NFTs */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">
                Your {currentProfileSection}
              </h2>
              <div className="relative flex w-full h-64 bg-[#2e1e1e] rounded-2xl">
                {isLoading ? (
                    <div className="flex justify-center items-center w-full">
                      <SpinnerLoader />
                    </div>
                ) : items.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold  opacity-70">
                    No NFTs available
                  </span>
                    </div>
                ) : (
                    <div
                        className="cards-container flex gap-4 h-full px-4 py-2 max-w-xl w-full overflow-x-scroll overflow-y-hidden"
                        style={{ scrollbarWidth: "none" }}
                    >
                      {items.map((item, index) => (
                          <div className="h-38" key={index}>
                            <Card
                                variant="section"
                                id={`${currentProfileSection}-${item.id}`}
                                ownerTitle={item.ownerTitle}
                                ownerSubtitle={item.ownerSubtitle}
                                ownerPicture={item.ownerPicture}
                                title={item.name}
                                subtitle={item.subtitle}
                                image={item.image}
                                currentPrice={item.price}
                                pinned={true}
                                quantity={20}
                            />
                          </div>
                      ))}
                    </div>
                )}
              </div>
            </div>

            {/* Sección Historial */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">History</h2>
              <div className="relative flex w-full h-40 bg-[#2e1e1e] rounded-2xl">
                {history.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold opacity-70">
                    No history available
                  </span>
                    </div>
                ) : (
                    <div className="p-4 text-white">
                      {history.map((entry, index) => (
                          <p key={index}>{entry}</p>
                      ))}
                    </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-2/5 max-w-sm h-full">
            <Card
                variant="profile"
                id="x"
                ownerTitle={profileCardData.title}
                ownerSubtitle={profileCardData.subtitle}
                ownerPicture={profileCardData.profilePicture}
                title={profileCardData.title}
                subtitle={profileCardData.subtitle}
                currentPrice="1324"
                image={null}
                pinned={true}
                quantity={200}
            />
          </div>
        </div>
      </div>
  );
};

export default Profile;