"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Card from "../components/global/card/Card";
import { useProfile } from "@/context/ProfileContext";
import { generateAvatar } from "../utils/Avatar";

const STATIC_IMAGE_URL =
  "https://images.gamma.io/ipfs/QmcAqUQDJ1bcLZVtCqJduLReGYyWm9TjdcHzAqNDEV5r24/images/1109.webp";


function shortenAddress(address: string, visibleStart = 5, visibleEnd = 3) {
  if (address.length <= visibleStart + visibleEnd) {
    return address; // Si el address es más corto, no se recorta.
  }
  const start = address.slice(0, visibleStart);
  const end = address.slice(-visibleEnd);
  return `${start}...${end}`;
}

async function getCollections() {
  return await fetch("/api/collection").then((res) => res.json());
}

const Profile = () => {
  const { userData } = useAuth();
  const profile = useProfile();

  const [profileCardData, setProfileCardData] = useState({
    title: "",
    subtitle: "not bns",
    profilePicture: "",
  });

  const [nftCollections, setNftCollections] = useState<any>([]);


  useEffect(() => {
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
    getCollections()
      .then((collections) => {
        console.log("Collections:", collections);
        setNftCollections(collections);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

  return (
    <div className="h-full w-full p-8 text-white">
      <div className="flex gap-4 h-full w-full">
        <div className="flex flex-col gap-4 w-2/3">
          <div className="flex flex-col h-1/2 w-full">
            <h2 className="text-4xl font-bold mb-6">Your Collections</h2>
            <div className="flex w-full h-full ">
              <div className="flex gap-4 h-full p-4 w-full bg-blue-800 overflow-x-scroll">
                {nftCollections.map((collection, index) => {
                  return (
                    <Card
                    variant="section"
                      ownerTitle={collection.ownerTitle}
                      ownerSubtitle={collection.ownerSubtitle}
                      ownerPicture={collection.ownerPicture}
                      title={collection.name}
                      subtitle={collection.subtitle}
                      image={collection.image}
                      currentPrice={collection.price}
                      pinned={true}
                      quantity={collection.quantity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* History */}
          <div className="flex flex-col h-1/2">
            <h2 className="text-4xl font-bold mb-6">History</h2>
            <div className="bg-[#655454] h-full rounded-2xl">
              {/* Datos de Historial */}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <Card
          variant="profile"
            ownerTitle={profileCardData.title}
            ownerSubtitle={profileCardData.subtitle}
            ownerPicture={profileCardData.profilePicture}
            title={profileCardData.title}
            subtitle={profileCardData.subtitle}
            currentPrice="1324"
            image={STATIC_IMAGE_URL}
            pinned={true}
            quantity={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
