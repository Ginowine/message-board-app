import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractInfo from '../contractInfo.json';

const contractAddress = contractInfo.address;
const abi = contractInfo.abi;

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
