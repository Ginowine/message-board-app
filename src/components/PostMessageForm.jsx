import React, { useState } from 'react';
import { ethers } from 'ethers';
import '../processing-animation.css';
import contractInfo from '../contractInfo.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PostMessageForm = ({ provider }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const contractAddress = contractInfo.address;
    const abi = contractInfo.abi;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if provider is available from props
        if (!provider) {
            console.error("Please connect your wallet to interact with the contract.");
            return;
        }

        if (!message) return; // Check if message is empty
        setIsLoading(true)

        try {
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const tx = await contract.postMessage(message);
            await tx.wait(); // Wait for transaction confirmation

            console.log("Message posted successfully!");
            setMessage(''); // Clear the message input
        } catch (error) {
            console.error("Error posting message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {provider ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)}/>
                    {isLoading && <p className="processing-text">Processing transaction...</p>}
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Posting...' : 'Post Message'}
                  </Button>
                </Form>

                
            ) : (
                <div>
                    <p>Please connect your MetaMask wallet to post messages.</p>
                </div>
            )}
        </div>
    );
};

export default PostMessageForm;
