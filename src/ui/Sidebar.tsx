"use client";

import { useState } from 'react';
import styles from './Sidebar.module.css';
import { UserDescription } from './UserDescription';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
	const { connected, userData, logIn, logOut } = useAuth();
	const [showProfile, setShowProfile] = useState(false);
	const toggleProfile = () => {
		setShowProfile(!showProfile);
	};
	return (
		<header className={`fixed w-1/15 top-0 left-0 flex flex-col h-full justify-between items-center bg-gray-400 px-5 py-5 ${styles.headerContainer}`}>
			<p className='text-white'>
				<span>LiteNFT</span>
			</p>
			<div>
				{
					connected ? (
						<div className='flex'>
							<div className={`absolute transform transition-transform transition-opacity duration-300 ease-out ${styles.UserDescriptionContainer} ${showProfile ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
								{showProfile && (<UserDescription userData={userData} logOut={logOut} />)}
							</div>
							<Image src="/test.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
							<button onClick={toggleProfile}>
								<ArrowRightIcon className={`text-white h-6 w-6 text-gray-800 transition-transform duration-300 ${showProfile ? 'rotate-180' : 'rotate-0'}`} />
							</button>
						</div>
					) : (
						<button
							type='button'
							onClick={logIn}
							className='bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white transform hover:scale-110 transition-transform duration-200'
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" id="Plug--Streamline-Lucide" height={40} width={40} ><desc>{"Plug Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.5 13.75v-3.125" strokeWidth={1} /><path d="M5.625 5V1.25" strokeWidth={1} /><path d="M9.375 5V1.25" strokeWidth={1} /><path d="M11.25 5v3.125a2.5 2.5 0 0 1 -2.5 2.5h-2.5a2.5 2.5 0 0 1 -2.5 -2.5V5Z" strokeWidth={1} /></svg>
						</button>
					)
				}
			</div>
		</header >
	);
};

export default Sidebar;