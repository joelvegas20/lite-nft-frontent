"use client"
import React, { useEffect, useRef, useState } from 'react';
import { PhotoIcon, XMarkIcon, TableCellsIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { createNFT, parseCSV } from '@/lib/createNFT';
import { RetrieveUserCollection } from '@/lib/RetrieveUserCollections';
import { useRouter } from 'next/navigation';
import SpinnerLoader from '@/ui/SpinnerLoader';

const CreateNFT = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);
  const [NFTName, setNFTName] = useState('');
  const [collectionId, setcollectionId] = useState<number>(0);
  const [collectionName, setCollectionName] = useState<string>('');
  const [NFTLogo, setNFTLogo] = useState<File | null>(null);
  const [NFTAttributes, setNFTAttributes] = useState<File | null>(null);
  const [ImagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [AttributeShow, setAttributeShow] = useState<boolean>(false);
  const [collectionsByOwner, setCollectionsByOwner] = useState<{ id: string, name: string }[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attrInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingContract(true);
    createNFT({ NFTName, NFTAttributes, NFTLogo, collectionId, collectionName });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNFTLogo(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNFTAttributes(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const csvContent = reader.result as string;
        parseCSV(csvContent);
        setAttributeShow(true);
      };
      reader.readAsText(file);
    }
  };
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collections = await RetrieveUserCollection();
        if (collections.length === 0) {
          router.push('/create-collection?notify=true');
        } else {
          setCollectionsByOwner(collections);
          setCollectionName(collections[0].name);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [router]);
  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center"><SpinnerLoader /></div>;
  }
  return (
    <div className="relative flex justify-center mt-2">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex flex-col text-black p-8 bg-white rounded "
      >
        <h1 className="text-center text-2xl">Create a new NFT</h1>
        {/* container of two columns */}
        <div className="flex flex-row w-full gap-10">
          {/* first column */}
          <div className="flex flex-col columna-1 w-1/2">
            <div className="flex flex-col">
              <label htmlFor="collection-name" className="mt-2">NFT name</label>
              <input
                type="text"
                id="collection-name"
                className="p-2 rounded bg-gray-200 text-black"
                value={NFTName}
                onChange={(e) => setNFTName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-id" className="mt-2">Collection</label>
              <select
                id="collection-id"
                className="p-2 rounded bg-gray-200 text-black"
                value={collectionId}
                onChange={(e) => { setcollectionId(parseInt(e.target.value)); setCollectionName(e.target.options[e.target.selectedIndex].text) }}
                required
              >
                <option value="" disabled>Select a collection</option>
                {
                  collectionsByOwner.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-Attributes" className='mt-2'>NFT Attributes</label>
              <div className='flex flex-col items-center justify-center bg-gray-200 p-2 text-black rounded h-full'>
                <label htmlFor="collection-Attributes" className="mt-2 cursor-pointer flex flex-col items-center">
                  {!AttributeShow &&
                    (
                      <>
                        <TableCellsIcon width={80} />
                        <span className='mt-2 text-gray-400'>Click to upload the attribute csv</span>
                      </>
                    )
                  }
                </label>
                <input
                  type="file"
                  id="collection-Attributes"
                  className="hidden"
                  accept='text/csv'
                  onChange={handleAttributeChange}
                  ref={attrInputRef}
                  required
                />
                {AttributeShow &&
                  (
                    <div className='relative bg-gray-100 p-2 rounded text-black w-full'>
                      <p className='flex flex-row items-center justify-center'>
                        <ClipboardDocumentListIcon width={18} />
                        <span>{NFTAttributes?.name}</span>
                      </p>
                      <button
                        className="absolute bg-gray-100 hover:bg-gray-800 hover:text-white transition-all ease-in-out top-0 right-0 rounded-full text-black"
                        onClick={() => {
                          setNFTAttributes(null);
                          setAttributeShow(false);
                          if (attrInputRef.current) {
                            attrInputRef.current.value = '';
                          }
                        }}
                      >
                        <XMarkIcon width={24} />
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="collection-image" className="mt-2 text-center">NFT image</label>
            <div className="flex flex-col items-center justify-center bg-gray-200 p-2 text-black rounded h-full">
              <label htmlFor="collection-image" className="cursor-pointer flex flex-col items-center">
                {!ImagePreviewURL &&
                  (
                    <>
                      <PhotoIcon width={80} />
                      <span className="mt-2 text-gray-400">Click to upload an image</span>
                    </>
                  )
                }
              </label>
              <input
                type="file"
                id="collection-image"
                className="hidden"
                accept='image/*'
                onChange={handleImageChange}
                ref={imageInputRef}
                required
              />
              {
                ImagePreviewURL && (
                  <figure className='relative'>
                    <img
                      src={ImagePreviewURL}
                      alt="Image Preview"
                    />
                    <button
                      className="absolute bg-gray-100 hover:bg-gray-800 hover:text-white transition-all ease-in-out top-0 right-0 rounded-full text-black"
                      onClick={() => {
                        setImagePreviewURL(null);
                        setNFTLogo(null);
                        if (imageInputRef.current) {
                          imageInputRef.current.value = '';
                        }
                      }}
                    >
                      <XMarkIcon width={24} />
                    </button>
                  </figure>
                )
              }
            </div>
          </div>
        </div>
        <button
          className="bg-gray-200 p-2 rounded hover:bg-gray-300 text-black transform transition-transform duration-200 mt-2"
          type="submit"
        >
          Create NFT
        </button>
      </form>
      {
        isLoadingContract &&
        <div className='absolute w-3/4 h-full bg-gray-700 opacity-75 flex justify-center items-center'>
          <SpinnerLoader />
        </div>
      }
    </div>
  );
}

export default CreateNFT;