import {
  makeContractCall,
  broadcastTransaction,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  bufferCVFromString,
} from "@stacks/transactions";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

const network = new StacksTestnet();

export async function GET(request: Request) {

    const txOptions = {
        contractAddress: 'SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X',
        contractName: 'contract_name',
        functionName: 'contract_function',
        functionArgs: [bufferCVFromString('foo')],
        senderKey: 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01',
        validateWithAbi: true,
        network,
      };
      
      const transaction = await makeContractCall(txOptions);
      
      const broadcastResponse = await broadcastTransaction({transaction, network});
      const txId = broadcastResponse.txid;


  return Response.json({ status: "connected", txId });
}
