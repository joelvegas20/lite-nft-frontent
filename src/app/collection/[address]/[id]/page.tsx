"use client";
export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import { userSession } from '@/lib/Wallet';
import Image from 'next/image';
import SpinnerLoader from '@/ui/SpinnerLoader';
import { useRouter } from 'next/navigation';

type Collection = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  logo: string;
};

const getCollectionDetail = async (address, id) => {
  const res = await fetch(`/api/collection/${address}/${id}`)
    .then((res) => res.json())
    .then((res) => res.res);
  return res
};


const CollectionDetail = ({ params }) => {
  const router = useRouter();
  const props: any = use(params);
  const address = props.address;
  const id = props.id;

  const [collectionDetailData, setCollectionDetailData] = useState<Collection | null>(null);

  useEffect(() => {
    if (!userSession.isUserSignedIn()) {
      router.replace('/?notify-login=true');
    }
    const fetchData = async () => {
      try {
        const res = await getCollectionDetail(address, id)
        setCollectionDetailData(res);
      } catch (error) {
        router.replace('/');
      }
    }
    fetchData();
  }, []);

  if (!collectionDetailData) {
    return <div className="w-full h-full flex justify-center items-center"><SpinnerLoader /></div>;
  }

  return (
    <div className='flex w-full h-full pt-4 justify-evenly items-center'>
      <div className='flex flex-col items-center gap-4 w-2/5 h-5/6 gap-4 text-gray-700'>
        <p className='flex flex-col gap-2 w-3/4 rounded-xl p-2 bg-[#dbcccc] shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-[#e6e6e6] hover:scale-105 transition-colors transition-transform'>
          <span className='text-md font-bold'>Nombre de la Colección</span>
          <span className='text-sm'>{collectionDetailData.name}</span>
        </p>
        <p className='flex flex-col gap-2 w-3/4 rounded-xl p-2 bg-[#dbcccc] shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-[#e6e6e6] hover:scale-105 transition-colors transition-transform'>
          <span className='text-md font-bold'>Descripción</span>
          <span className='text-sm'>{collectionDetailData.description}</span>
        </p>
        <p className='flex flex-col gap-2 w-3/4 rounded-xl p-2 bg-[#dbcccc] shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-[#e6e6e6] hover:scale-105 transition-colors transition-transform'>
          <span className='text-md font-bold'>Cantidad de la colección</span>
          <span className='text-sm'>{collectionDetailData.quantity}</span>
        </p>
      </div>
      <div className='relative flex items-start w-2/5 h-5/6 rounded-xl overflow-hidden ring-[#dbcccc] ring-2 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-[#e6e6e6] hover:scale-105 transition-colors transition-transform'>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={collectionDetailData.logo}
          alt='Photo of the collection'
        />
      </div>
    </div>
  );
};

export default CollectionDetail;