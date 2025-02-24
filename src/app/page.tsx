"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./components/global/card/Card";
import SpinnerLoader from "@/ui/SpinnerLoader";
import { ToastContainer, toast } from "react-toastify";

const getNFTs = async () => {
  return await fetch("/api/nft").then((res) => res.json()).then((res) => res.data);
}

const getCollections = async () => {
  return await fetch("/api/collection").then((res) => res.json()).then((res) => res.data);
}

const Home = () => {
  const router = useRouter();
  
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(pathname);
    const notify = params.get('notify-login');
    if (notify === 'true') {
      toast.info('You need to login or register first!', {
        position: 'top-left',
        autoClose: 3000,
      });
    }
    router.replace('/');  
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const nftData = await getNFTs();
        const collectionData = await getCollections();
        
        setNfts(nftData);
        setCollections(collectionData);

        setIsLoading(false);

      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="h-full w-full flex justify-center items-center p-8 text-white" >
      <div className="absolute">
        <ToastContainer position="top-left" />
      </div>
      <main className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h1 className="font-black text-2xl">Welcome to Lite NFT Gallery</h1>
          <p className="font-normal text-xl">
            Explore, design, and create collections and nfts.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-3/4">
          <div className="flex flex-col h-1/2 w-full">
            <span className=" font-black text-2xl">Top NFTs</span>
            {isLoading ? (
              <div className="flex justify-center items-center w-full">
                <SpinnerLoader />
              </div>
            ) : (
              <div className="cards-container flex h-full pt-2 w-full overflow-x-scroll">
                {nfts.map((item, index) => (
                  <div className="h-38" key={index}>
                    <Card
                      variant="section"
                      id={item.id}
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
          <div className="flex flex-col w-full">
            <span className="font-black text-2xl">Top Collections</span>
            {isLoading ? (
              <div className="flex justify-center items-center w-full">
                <SpinnerLoader />
              </div>
            ) : (
              <div className="cards-container flex gap-4 h-full pt-2 w-full overflow-x-scroll overflow-y-hidden ">
                {collections.map((item, index) => (
                  <div className=" h-38" key={index}>
                    <Card
                      variant="section"
                      id={`Collections-${item.id}`}
                      ownerTitle={item.ownerTitle}
                      ownerSubtitle={item.ownerSubtitle}
                      ownerPicture={item.ownerPicture}
                      title={item.name}
                      subtitle={item.subtitle}
                      image={item.image}
                      currentPrice={item.price}
                      pinned={true}
                      quantity={20}
                    // key={`collection-${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
