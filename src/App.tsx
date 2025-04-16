import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import DetailedCareer from './DetailedCareer';
import { BasicCareer } from './BasicCareer';
import sphinxImage from './assets/sphinx.jpg';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '100vh',
              margin: 0,
              padding: 0
            }}
          >
            <img
              src={sphinxImage}
              alt="Sphinx"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '90vh'
              }}
            />
            <div
              style={{
                textAlign: 'right',
                marginRight: '5%',
                marginTop: '5%'
              }}
            >
              <div style={{ color: 'white' }}>Home Page</div>
              <h1
                style={{
                  fontWeight: 'bold',
                  fontSize: '3em',
                  color: 'white',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  marginTop: '20px'
                }}
              >
                SPHINX CAREER QUIZ
              </h1>
              <h2
                style={{
                  fontStyle: 'italic',
                  color: 'white',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize: '1.4em'
                }}
              >
                The best place to discover your dream job, today
              </h2>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Helvetica, Arial, sans-serif'
                }}
              >
                Developed by Connor Vitz, Pari Shah, Grace Setzler, and Andre Babik.
              </p>
              <button onClick={() => setCurrentPage('detailed-career')}>
                Detailed Career Assessment
              </button>
              <button onClick={() => setCurrentPage('basic-career')}>
                Basic Career Assessment
              </button>
            </div>
          </div>
        );
      case 'about':
        return <div>About Page</div>;
      case 'contact':
        return <div>Contact Page</div>;
      case 'detailed-career':
        return <DetailedCareer />;
      case 'basic-career':
        return <BasicCareer />;
      default:
        return <div>404 Page Not Found</div>;
    }
  };

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div
      className="App"
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#0b1a2e',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <header
        style={{
          display: 'flex',
          gap: '10px',
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10,
          alignItems: 'center'
        }}
      >
        {currentPage !== 'home' && (
          <button onClick={() => setCurrentPage('home')}>🏠</button>
        )}
        <Form style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <Form.Label style={{ color: 'white', marginRight: '5px' }}>API Key:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            onChange={changeKey}
            style={{ maxWidth: '200px', marginRight: '5px' }}
          />
          <Button className="Submit-Button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </header>

      <div>{renderPage()}</div>
    </div>
  );
}

export default App;