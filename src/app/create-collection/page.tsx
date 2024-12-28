"use client"
import React, { useRef, useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { createCollection } from '@/lib/createCollection';

const CreateCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [collectionQuantity, setCollectionQuantity] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [collectionImage, setCollectionImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // verify if the collection quantity is a number
    if (isNaN(Number(collectionQuantity))) {
      alert('Collection quantity must be a number');
      return;
    }
    await createCollection({ collectionName, collectionDescription, collectionImage });
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
        className="w-3/4 flex flex-col text-black p-8 bg-white rounded shadow-lg"
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
                className="p-2 rounded bg-gray-200 text-black"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-quantity" className="mt-4">Collection quantity</label>
              <input
                type="text"
                id="collection-quantity"
                className="p-2 rounded bg-gray-200 text-black"
                value={collectionQuantity}
                onChange={(e) => setCollectionQuantity(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="collection-description" className="mt-4">Collection description</label>
              <textarea
                id="collection-description"
                className="p-2 rounded bg-gray-200 text-black"
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
                required
              />
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col w-1/2">
            <label htmlFor="collection-image" className="mt-4 text-center">Collection image</label>
            <div className="flex flex-col items-center justify-center bg-gray-200 p-2 text-black rounded h-full">
              <label htmlFor="collection-image" className="cursor-pointer flex flex-col items-center">
                {
                  !previewURL && (
                    <>
                      <PhotoIcon width={80} />
                      <span className="mt-2 text-gray-500">Click to upload an image</span>
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
                ref={fileInputRef}
                required
              />
              {
                previewURL && (
                  <figure className='relative'>
                    <img
                      src={previewURL}
                      alt="Image Preview"
                    />
                    <button
                      className="absolute bg-gray-300 hover:bg-gray-400 hover:text-black transition-all ease-in-out top-0 right-0 rounded-full text-black"
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
          className="bg-gray-200 p-2 rounded hover:bg-gray-300 text-black transform transition-transform duration-200 mt-4"
          type="submit"
        >
          Create collection
        </button>
      </form>
    </div>
  );
}

export default CreateCollection;