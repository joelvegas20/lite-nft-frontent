"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Topbar.module.css';
import { UserDescription } from './UserDescription';
import { AuthResponsePayload, showConnect, disconnect } from '@stacks/connect';
import { userSession } from '@/lib/Wallet';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Topbar = () => {
	const [connected, setConnected] = React.useState(false);
	const [userData, setUserData] = useState<AuthResponsePayload | null>(null);
	const [showProfile, setShowProfile] = useState(false);
	const myAppName = 'MyApp';
	const logIn = () => {
		showConnect({
			appDetails: {
				name: myAppName,
				icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061823.png',
			},
			userSession,
			redirectTo: '/',
			onFinish: (payload) => {
				console.log(payload);
				setConnected(true);
				setUserData(payload.authResponsePayload);
			},
			onCancel: () => {
				window.alert('Authentication was cancelled');
			}
		});
	};
	const logOut = () => {
		disconnect();
		setShowProfile(false);
		setConnected(false);
	}
	const toggleProfile = () => {
		setShowProfile(!showProfile);
	};
	return (
		<header className={`flex justify-between items-center bg-gray-400 px-5 py-2 ${styles.Topbar}`}>
			<p>
				<span className={styles.logo}>MyApp</span>
			</p>
			<div>
				{
					connected ? (
						<div className='flex'>
							{
								showProfile && (
									<UserDescription userData={userData} logOut={logOut} />
								)
							}
							<Image src="/test.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
							<button onClick={toggleProfile}>
								<ChevronDownIcon className={`h-6 w-6 text-gray-800 transition-transform duration-300 ${showProfile ? 'rotate-180' : 'rotate-0'}`} />
							</button>
						</div>
					) : (
						<button
							type='button'
							onClick={logIn}
							className='bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform hover:scale-110 transition-transform duration-200'
						>
							Connect Wallet
						</button>
					)
				}
			</div>
		</header >
	);
};

export default Topbar;