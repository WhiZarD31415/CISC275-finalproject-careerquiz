import React, { useState } from 'react';
import './App.css';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import DetailedCareer from './DetailedCareer';
import { BasicCareer } from './BasicCareer';
import moon from './assets/moon.png';
//import sphinxIcon from './assets/sphinxIcon.png';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}
//Color Pallet:
// #062C43
// #054569
// #5591A9
// #9CCDDC
// #CED7E0


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
              src={moon}
              alt="moon"
              style={{
                top: 'absolute',
                bottom: 0,
                left: 0,
                width:'218vh'
              }}
            />
          <Row>
            <div
              style={{
                //textAlign: 'right',
                marginRight: '5%',
                marginTop: '5%'
              }}
            ></div>
              <Col>
              <div style={{ color: 'white' }}></div>
              
              <h1
                style={{
                  fontWeight: 'bold',
                  fontSize: '3em',
                  color: 'white',
                  fontFamily: 'Garamond, serif',
                  textShadow: '2px 2px 2px black',
                  marginTop: '20px',
                  
                }}
              >
                SPHINX CAREER QUIZ
              </h1>
              <hr style={{color:'white', margin:30}}></hr>
              <h2
                style={{
                  fontStyle: 'italic',
                  color: 'white',
                  fontFamily: 'Franklin Gothic, Arial, sans-serif',
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
              {/* <img
              src={sphinxIcon}
              alt="sphinx"
              style={{
                height:'40vh',
                width:'39vh',
                

              }}></img> */}
              </Col>
              <Col>
              <Row>
              <Col style={{color:'white'}}>
              <Card id='QuizCard'>
                Text of the description of the Basic Career assesment and stuff words words lorem ipsum dolor sit amet consecutor adipiscing elit. Morbi feugiat convallis commodo. Quisque eget nisl sed sapien rutrum bibendum sit amet sit amet
                <br></br>
                <br></br>
                <p style={{fontWeight:'bolder'}}>Take the Basic Quiz now!:</p>
              <Button onClick={() => setCurrentPage('basic-career')} id="PageButton">
                Basic Career Assessment
              </Button>
              </Card>
              </Col>
                <Col style={{color:'white'}}>
                <Card id='QuizCard'>
                Text of the description of the Detailed Career assesment and stuff words words lorem ipsum dolor sit amet consecutor adipiscing elit. Morbi feugiat convallis commodo. Quisque eget nisl sed sapien rutrum bibendum sit amet sit amet
                <br></br>
                <br></br>
                <p style={{fontWeight:'bolder'}}>Take the Detailed Quiz now!:</p>

              <Button onClick={() => setCurrentPage('detailed-career')} id="PageButton">
                Detailed Career Assessment
              </Button>
              </Card>
              </Col>
                
              </Row>
              </Col>
            
            
            </Row>
            
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
        backgroundColor: '#062C43',
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
          <Button className="Submit-Button" onClick={handleSubmit} id='APIKeyButton'>
            Submit
          </Button>
        </Form>
      </header>

      <div>{renderPage()}</div>
    </div>
  );
}

export default App;