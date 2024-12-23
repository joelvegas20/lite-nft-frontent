'use client';

import { ClarityValue, cvToJSON, cvToString, cvToValue, fetchCallReadOnlyFunction, principalCV, stringAsciiCV } from "@stacks/transactions";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const TestPage = () => {
  const [response, setResponse] = useState<ClarityValue | null>(null);
  const { userData } = useAuth();
  const tryToRetrieveData = async () => {
    let data: ClarityValue;
    try {
      data = await fetchCallReadOnlyFunction({
        contractName: 'auth-v2',
        contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
        functionName: 'get-user-data',
        functionArgs: [principalCV(userData?.profile.stxAddress.testnet)],
        senderAddress: userData?.profile.stxAddress.testnet,
        network: 'testnet',
      });
      console.log('Data:', data);
      console.log('what is this: ',cvToValue(data));
      setResponse(data);
    } catch (error) {
      console.log("Error ", error);
    } 
    finally {
      console.log("End");
    }
  }
  return (
    <div className="flex flex-col w-full justify-center items-center text-white">
      <h1 className="text-center">This is the test page</h1>
      <button onClick={tryToRetrieveData} className="bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform transition-transform duration-200">
        Test to retrieve data 
      </button>
      {response && <p>{response.type}</p>} 
      <ToastContainer /> 
    </div>
  );
};

export default TestPage;