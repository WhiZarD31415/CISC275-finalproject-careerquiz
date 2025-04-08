import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import DetailedCareer from './DetailedCareer';
import { BasicCareer } from './BasicCareer';

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
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Use an <img> pointing to the external URL */}
            <img
              src="https://th.bing.com/th/id/OIG4.2ylqExNv2m_KA.uzB7MY?w=1024&h=1024&rs=1&pid=ImgDetMain"
              alt="Sphinx"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '66vh'
              }}
            />

            <div
              style={{
                textAlign: 'right',
                marginRight: '5%',
                marginTop: '5%'
              }}
            >
              {/* Existing "Home Page" text retained */}
              <div style={{ color: 'white' }}>Home Page</div>

              {/* Main title changed to ALL CAPS & bold Helvetica */}
              <h1
                style={{
                  fontWeight: 'bold',
                  fontSize: '3em',
                  color: 'white',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  marginTop: '20px'
                }}
              >
                THE SPHINX CAREER QUIZ
              </h1>

              {/* Subtitle still included; adjust or remove as needed */}
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
                Developed by Pari, Connor, Grace, and Andre.
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
  }; //switch to control which page renders
  //sets the local storage item to the api key the user inputed
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
        backgroundColor: '#021C31',
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
          zIndex: 10
        }}
      >
        {currentPage !== 'home' && (
          <button onClick={() => setCurrentPage('home')}>🏠</button>
        )}
      </header>

      <div style={{ paddingTop: '50px' }}>{renderPage()}</div>

      <Form>
        <Form.Label style={{ color: 'white' }}>API Key:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
        />
        <br />
        <Button className="Submit-Button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>

      <footer>
        <p style={{ color: 'white' }}>Pari K. Shah</p>
        <p style={{ color: 'white' }}>Grace Setzler</p>
        <p style={{ color: 'white' }}>Connor Vitz</p>
        <p style={{ color: 'white' }}>Andre Babik</p>
      </footer>
    </div>
  );
}

export default App;