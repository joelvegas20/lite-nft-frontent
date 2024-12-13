"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthResponsePayload, showConnect, disconnect } from '@stacks/connect';
import { userSession } from '@/lib/Wallet';

const myAppName = 'MyApp';

interface AuthContextProps {
	connected: boolean;
	userData: AuthResponsePayload | null;
	logIn: () => void;
	logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [connected, setConnected] = useState(false);
	const [userData, setUserData] = useState<AuthResponsePayload | null>(null);

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
		setConnected(false);
		// setUserData(null);
		window.location.reload();
	};

	return (
		<AuthContext.Provider value={{ connected, userData, logIn, logOut }}>
			<div  className="flex flex-col w-full">
				{children}
			</div>
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};