import React, { useState, useEffect } from 'react';
import PostMessageForm from './components/PostMessageForm';
import MessageList from './components/MessageList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './App.css';
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

    <Container fluid>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Message Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      {!provider &&
      <Row className="justify-content-center" lg={8}>
        <Col>
        <div className="App">
          <Button className="connect-button" onClick={connectWallet} variant="primary" size="lg">Click to Post Message</Button>
        </div>
        </Col>
      </Row>
      }

      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
            {/* Conditionally render PostMessageForm based on provider */}
            {provider && (
              <PostMessageForm provider={provider} />
            )}

          <MessageList provider={provider} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
