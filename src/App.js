import React, { useState, useEffect } from 'react';
import PostMessageForm from './components/PostMessageForm';
import MessageList from './components/MessageList';
//import { ethers } from 'ethers';
const ethers = require("ethers");


const App = () => {
  // State to manage the provider (initially set to null)
  const [provider, setProvider] = useState(null);

  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected Accounts:", accounts);
        //const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
      } else {
        console.error("No Ethereum provider found. Please install a browser extension like MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  return (
    <div className="App">
      <h1>Message Board</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      {/* Conditionally render PostMessageForm based on provider */}
      {provider && (
        <PostMessageForm provider={provider} />
      )}

      <MessageList provider={provider} />
    </div>
  );
};

export default App;
