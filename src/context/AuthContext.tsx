"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthResponsePayload, showConnect, disconnect, UserData } from '@stacks/connect';
import { ClarityValue, StacksTransactionWire } from '@stacks/transactions';
import { userSession } from '@/lib/Wallet';
import { registerUser } from '@/lib/registerUser';

const myAppName = 'MyApp';

interface AuthContextProps {
	connected: boolean;
	userData: AuthResponsePayload | UserData | null;
	logIn: () => void;
	logOut: () => void;
	registerResult: ClarityValue | StacksTransactionWire | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [connected, setConnected] = useState(false);
	const [userData, setUserData] = useState<AuthResponsePayload | UserData | null>(null);
	const [registerResult, setRegisterResult] = useState<ClarityValue | StacksTransactionWire | null>(null);
	const doRegisterUser = async () => {
		try {
			console.log("Attempting to register user....");
			const registerResponse = await registerUser();
			console.log('Register response:', registerResponse);
			if (registerResponse)	
				setRegisterResult(registerResponse);
		} catch (error) {
			console.error('Error registering user:', error);
		} finally {
			console.log('End of registration');
		}
	};
	
	const logIn = async () => {
		await showConnect({
			appDetails: {
				name: myAppName,
				icon: 'https://cdn-icons-png.flaticon.com/512/10061/10061823.png',
			},
			userSession,
			redirectTo: '/',
			onFinish: (payload) => {
				setConnected(true);
				setUserData(payload.authResponsePayload);
				doRegisterUser();
				window.location.reload();
			},
			onCancel: () => {
				window.alert('Authentication was cancelled');
			}
		});
	};
	const logOut = () => {
		disconnect();
		setConnected(false);
		userSession.signUserOut();
		window.location.reload();
	};

	useEffect(() => {
		if (userSession.isUserSignedIn()) {
			const data = userSession.loadUserData();
			setConnected(true);
			setUserData(data);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ connected, userData, logIn, logOut, registerResult }}>
			<div className="flex flex-col w-full">
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