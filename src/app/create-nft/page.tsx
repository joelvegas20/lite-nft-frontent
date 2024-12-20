"use client"
import React, { useRef, useState } from 'react';
import { PhotoIcon, XMarkIcon, TableCellsIcon } from '@heroicons/react/24/solid';
import { createNFT } from '@/lib/createNFT';


const CreateNFT = () => {
  const [NFTName, setNFTName] = useState('');
  const [collectionId, setcollectionId] = useState<number>(0); // this might be an array
  const [NFTLogo, setNFTLogo] = useState<File | null>(null);
  const [collectionAttributes, setCollectionAttributes] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attrInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const NFTAttributesURI = "s"; // this should be the URI of the attributes
    // here I should preprocess the data and not only send it to the contract but to save the image into any decentralized file system and keep the id of that thing so that the uri points to that thing
    createNFT({ NFTName, NFTAttributes: NFTAttributesURI, NFTLogo: "imageURL/CID/Identifier", collectionId });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("this is the targe of the image ", e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNFTLogo(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCollectionAttributes(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result as string);
        console.log("file successfully uploaded");
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex flex-col text-white p-8 bg-gray-900 rounded"
      >
        <h1 className="text-center text-3xl">Create a new NFT</h1>
        {/* container of two columns */}
        <div className="flex flex-row w-full gap-10">
          {/* first column */}
          <div className="flex flex-col columna-1 w-1/2">
            <div className="flex flex-col">
              <label htmlFor="collection-name" className="mt-4">NFT name</label>
              <input
                type="text"
                id="collection-name"
                className="p-2 rounded bg-gray-800 text-white"
                value={NFTName}
                onChange={(e) => setNFTName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-id" className="mt-4">Collection id</label>
              {/* generate a list of options of collections using collection-owner-validation */}
              <input
                id="collection-id"
                type='number'
                className="p-2 rounded bg-gray-800 text-white"
                placeholder='Collection ID'
                value={collectionId}
                onChange={(e) => setcollectionId(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-Attributes" className='mt-4'>NFT Attributes</label>
              <div className='flex flex-col items-center justify-center bg-gray-800 p-2 text-white rounded h-full'>
                <label htmlFor="collection-Attributes" className="mt-4 cursor-pointer flex flex-col items-center">
                  <TableCellsIcon width={80} />
                  <span className='mt-2 text-gray-400'>Click to upload the attribute csv</span>
                </label>
                <input
                  type="file"
                  id="collection-Attributes"
                  className="hidden"
                  onChange={handleAttributeChange}
                  ref={attrInputRef}
                />
              </div>
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="collection-image" className="mt-4 text-center">NFT image</label>
            <div className="flex flex-col items-center justify-center bg-gray-800 p-2 text-white rounded h-full">
              <label htmlFor="collection-image" className="cursor-pointer flex flex-col items-center">
                <PhotoIcon width={80} />
                <span className="mt-2 text-gray-400">Click to upload an image</span>
              </label>
              <input
                type="file"
                id="collection-image"
                className="hidden"
                accept='image/*'
                onChange={handleImageChange}
                ref={imageInputRef}
              />
              {
                previewURL && (
                  <figure className='relative'>
                    <img
                      src={previewURL}
                      alt="Image Preview"
                    />
                    <button
                      className="absolute bg-gray-100 hover:bg-gray-800 hover:text-white transition-all ease-in-out top-0 right-0 rounded-full text-black"
                      onClick={() => {
                        setPreviewURL(null);
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
          className="bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform transition-transform duration-200 mt-4"
          type="submit"
        >
          Create NFT
        </button>
      </form>
    </div>
  );
}

export default CreateNFT;