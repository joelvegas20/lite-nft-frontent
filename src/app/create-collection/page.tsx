"use client"
import React, { useRef, useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { createCollection } from '@/lib/createCollection';
import { uploadToGaiaHub } from '@stacks/storage';
import {storage} from '@/lib/Storage';

const CreateCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [collectionQuantity, setCollectionQuantity] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionImage, setCollectionImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // here I should preprocess the data and not only send it to the contract but to save the image into any decentralized file system and keep the id of that thing so that the uri points to that thing
    createCollection({collectionName, collectionDescription, collectionLogo:"imageURL/CID/Identifier"});
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("this is the targe of the image ", e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCollectionImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result as string);
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
        <h1 className="text-center text-3xl">Create a new collection</h1>
        {/* container of two columns */}
        <div className="flex flex-row w-full gap-10">
          {/* first column */}
          <div className="flex flex-col columna-1 w-1/2">
            <div className="flex flex-col">
              <label htmlFor="collection-name" className="mt-4">Collection name</label>
              <input
                type="text"
                id="collection-name"
                className="p-2 rounded bg-gray-800 text-white"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-quantity" className="mt-4">Collection quantity</label>
              <input
                type="text"
                id="collection-quantity"
                className="p-2 rounded bg-gray-800 text-white"
                value={collectionQuantity}
                onChange={(e) => setCollectionQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-description" className="mt-4">Collection description</label>
              <textarea
                id="collection-description"
                className="p-2 rounded bg-gray-800 text-white"
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
              />
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="collection-image" className="mt-4 text-center">Collection image</label>
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
                ref={fileInputRef}
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
                        setCollectionImage(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
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
          Create collection
        </button>
      </form>
    </div>
  );
}

export default CreateCollection;