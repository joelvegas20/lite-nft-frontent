"use client";
import React, { useState, useEffect } from "react";
import { Storage } from "@stacks/storage";
import { getUserSession } from "@/app/auth/userSession";
import Image from "next/image";
import Card from "../components/global/Card";

const Profile = () => {
  // const [profile, setProfile] = useState({
  //   name: "",
  //   email: "",
  //   bns: "",
  //   profilePicture: "",
  // });

  // const userSession = getUserSession();
  // const storage = new Storage({ userSession });
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (userSession.isUserSignedIn()) {
  //       try {
  //         const profileData = await storage.getFile("profile.json", {
  //           decrypt: false,
  //         });

  //         if (profileData) {
  //           const profileString =
  //             typeof profileData === "string"
  //               ? profileData
  //               : new TextDecoder().decode(profileData as ArrayBuffer);
  //           setProfile({ ...JSON.parse(profileString) });
  //         } else {
  //           setProfile({
  //             name: "",
  //             email: "",
  //             bns: "",
  //             profilePicture: "",
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error al obtener el perfil:", error);
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   fetchProfile();
  // }, [userSession, storage]);

  return (
    <div className="h-full w-full p-8">
      <div className="flex gap-4 h-full w-full">
        <div className="flex flex-col gap-4 w-2/3">
       
          <div className="flex flex-col h-1/2 w-full  ">
            <h2 className="text-4xl font-bold mb-6">Your Collections</h2>
            <div className="flex  w-full h-full">
              <div className="flex gap-4  h-full p-4 w-full overflow-x-scroll">
                <div className="w-48 h-full">
                  <Card />
                </div>
                <div className="w-48 h-full">
                  <Card />
                </div>
                <div className="w-48 h-full">
                  <Card />
                </div>
                <div className="w-48 h-full">
                  <Card />
                </div>
                <div className="w-48 h-full">
                  <Card />
                </div>
              </div>
            </div>
          </div>
          {/* History */}
          <div className="flex flex-col h-1/2">
          <h2 className="text-4xl font-bold mb-6">History</h2>
            <div className="bg-[#655454] h-full rounded-2xl">
              {/* History Data */}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Profile;

// <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block mb-1 font-medium">Nombre:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={profile.name}
//                     onChange={handleChange}
//                     className="border border-gray-600 bg-[#2C2C2C] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
//                 >
//                   Guardar
//                 </button>
//               </form>

// {
/* <div>
                  <label className="block mb-1 font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="border border-gray-600 bg-[#2C2C2C] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">BNS:</label>
                  <input
                    type="text"
                    name="bns"
                    value={profile.bns}
                    onChange={handleChange}
                    className="border border-gray-600 bg-[#2C2C2C] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Subir Imagen de Perfil:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-600 bg-[#2C2C2C] text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
                  />
                </div> */
// }

// {profile.profilePicture && (
//   <div>
//     <label className="block mb-1 font-medium">
//       Vista Previa de la Imagen:
//     </label>
//     <img
//       src={profile.profilePicture}
//       alt="Imagen de Perfil"
//       className="rounded-full w-32 h-32 object-cover border border-gray-600"
//     />
//   </div>
// )}
