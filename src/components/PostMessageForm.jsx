import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0xddbf51c2717ef7b5ded6b8a7a1238480ccff83b9';
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "postMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessages",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "messages",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const PostMessageForm = ({ provider }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if provider is available from props
        if (!provider) {
            console.error("Please connect your wallet to interact with the contract.");
            return;
        }

        if (!message) return; // Check if message is empty

        try {
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const tx = await contract.postMessage(message);
            await tx.wait(); // Wait for transaction confirmation

            console.log("Message posted successfully!");
            setMessage(''); // Clear the message input
        } catch (error) {
            console.error("Error posting message:", error);
        }
    };

    return (
        <div>
            {provider ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Message:
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <button type="submit" disabled={!message}>
                        Post Message
                    </button>
                </form>
            ) : (
                <div>
                    <p>Please connect your MetaMask wallet to post messages.</p>
                </div>
            )}
        </div>
    );
};

export default PostMessageForm;
