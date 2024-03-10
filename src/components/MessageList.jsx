import React, { useState, useEffect } from 'react';
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
const MessageList = ({ provider }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!provider) {
                console.error("Provider not available to fetch messages.");
                return;
            }

            try {
                const contract = new ethers.Contract(contractAddress, abi, provider);
                const messageData = await contract.getMessages();
                setMessages(messageData);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000);
        return () => clearInterval(intervalId);
    }, [provider]);

    return (
        provider && (
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default MessageList;
