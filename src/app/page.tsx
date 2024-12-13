
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUserSession, authenticate, signOut } from '@/app/auth/userSession';
import { Storage } from '@stacks/storage';

const Home = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bns: '',
    stxAddress: '',
    btcAddress: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const userSession = getUserSession();
  const storage = new Storage({ userSession });

  useEffect(() => {
    const fetchProfile = async () => {
      if (userSession.isUserSignedIn()) {
        try {
          const profileData = await storage.getFile('profile.json', { decrypt: false });
          const userData = userSession.loadUserData();

          console.log(userData.profile.btcAddress.p2tr.mainnet)

          const authAddresses = {
            stxAddress: userData.profile?.stxAddress?.mainnet || 'No disponible',
            btcAddress: 'No disponible',
          };

          if (profileData) {
            const profileString = typeof profileData === 'string'
              ? profileData
              : new TextDecoder().decode(profileData);
            setProfile({ ...authAddresses, ...JSON.parse(profileString) });

            
          } else {
            setProfile({
              ...authAddresses,
              name: '',
              email: '',
              bns: '',
              profilePicture: ''
            });
          }
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userSession]);

  console.log(profile)
  const handleSignIn = () => {
    authenticate();
  };

  const handleSignOut = () => {
    signOut();
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center gap-8 p-10">
        {userSession.isUserSignedIn() ? (
          <div className="text-center">
            {profile.profilePicture && (
              <Image
                src={profile.profilePicture}
                alt="Imagen de Perfil"
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
            )}
            <p>¡Hola, {profile.name || 'Usuario'}!</p>
            <p>Email: {profile.email || 'No especificado'}</p>
            <p>BNS: {profile.bns || 'No disponible'}</p>
            <p>Dirección STX: {typeof profile.stxAddress === 'string' ? profile.stxAddress : 'No disponible'}</p>
            <p>Dirección BTC: {typeof profile.btcAddress === 'string' ? profile.btcAddress : 'No disponible'}</p>
            <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">
            Iniciar Sesión
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;