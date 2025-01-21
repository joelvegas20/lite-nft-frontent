"use client";

import { useAuth } from "@/context/AuthContext";


/*
 * Third Party Dependencies
 */
import {
  ClarityValue,
  cvToValue,
  fetchCallReadOnlyFunction,
} from "@stacks/transactions";
import { ToastContainer } from "react-toastify";
import { useState } from "react";


const TestPage = () => {
  const [response, setResponse] = useState<ClarityValue | null>(null);
  const { userData } = useAuth();
  const tryToRetrieveData = async () => {
    let data: ClarityValue;
    try {
      console.log("Start data retrieval");
      data = await fetchCallReadOnlyFunction({
        contractName: 'collection-v4',
        contractAddress: 'ST3GBYD0VN28MAPDGNGTFNXQV5QJXQ3VCV3WZT75T',
        functionName: 'get-all-nfts',
        functionArgs: [],
        senderAddress: userData?.profile.stxAddress.testnet,
        network: "testnet",
      });

      console.log('Data:', data);
      (cvToValue(data) as Array<ClarityValue>).forEach((value: any, index) => {
        console.log(`the element at index ${index} is `, value.value.name.value);
      });

      setResponse(data);
      // const res = await RetrieveUserCollection();
      // console.log('Collections:', res);
    } catch (error) {
      console.error("what ", error);
    } 
    finally {
      console.log("End");
    }
  }
  return (
    <div className="flex flex-col w-full justify-center items-center text-white">
      <h1 className="text-center">This is the test page</h1>
      <button
        onClick={tryToRetrieveData}
        className="bg-gray-800 p-2 rounded hover:bg-gray-700 text-white transform transition-transform duration-200"
      >
        Test to retrieve data
      </button>
      {response && <p>{response.type}</p>}
      <ToastContainer />
    </div>
  );
};

export default TestPage;
