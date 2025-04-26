import React, { useState, createElement } from 'react';
import './App.css';
import { Button, Form, Row, Col, Card, ListGroup, Tab, TabContainer, ListGroupItem } from 'react-bootstrap';
import DetailedCareer from './DetailedCareer';
import { BasicCareer } from './BasicCareer';
import moon from './assets/moon.png';
//import sphinxIcon from './assets/sphinxIcon.png';
import { resultList } from './resultLists';

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

export var results:string[][] = [['Career 1', 'Here be some text regarding Career 1'], ['Career 2','Here be some text regarding Career 2']]

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
              //position: 'fixed',
              overflowX: 'clip',
              //overflowY:'scroll',
              //width: '100vw',
              height:'100%',
              maxWidth:'100vw',
              //minHeight: '100vh', 
               
                        
            }}
          >
           
            <img
              src={moon}
              alt="moon"
              style={{
                top: 'fixed',
                bottom: 0,
                left: 0,
                width:'100vw',
               
              }}
            />
            <br></br>
            <br></br>
            <br></br>
          <Row style={{marginBottom:'10%'}}>
              

              <Col>
              <div style={{ color: 'white', display:'block'}}></div>
              
              <h1
                style={{
                  fontWeight: 'bold',
                  fontSize: '3.5vw',
                  color: 'white',
                  fontFamily: 'Garamond, serif',
                  textShadow: '2px 2px 2px black',
                  marginTop: '10%',
                  
                }}
              >
                SPHINX CAREER QUIZ
              </h1>
              <hr style={{color:'white', marginTop:10, marginLeft:30, marginRight:30}}></hr>
              <h2
                style={{
                  fontStyle: 'italic',
                  color: 'white',
                  fontFamily: 'Franklin Gothic, Arial, sans-serif',
                  fontSize: '1.4vw'
                }}
              >
                The best place to discover your dream job, today
              </h2>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize:'1vw'
                }}
              >
                Developed by Connor Vitz, Pari Shah, Grace Setzler, and Andre Babik.
              </p>

              </Col>
              <Col>
              <Row>
              <Col style={{color:'white', marginLeft:'10%'}}>
              <Card id='QuizCard'>
                The Basic Career assesment asks you to rate yourself on various skills and interests, gives a broad estimation of fitting career paths.
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              <Button onClick={() => setCurrentPage('basic-career')} id="PageButton">
                Take Basic Quiz
              </Button>
              </Card>
              </Col>
                <Col style={{color:'white'}}>
                <Card id='QuizCard'>
                The Detailed Career assesment asks you to write answers to several questions about your personality and aspirations, gives a specific set of fitting career paths and why they will work for you!
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              <Button onClick={() => setCurrentPage('detailed-career')} id="PageButton"> 
                Take Detailed Quiz
              </Button>
              </Card>
              </Col>
                
              </Row>
              </Col>
              
            </Row>
            
           <Row style={{marginBottom:'10%', marginLeft:'10%', marginRight:'10%'}}>
            {resultList()}
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
        margin: '0%',
        padding: "0%",
        backgroundColor: '#062C43',
        minHeight: '100vh',
        position: 'relative',
        
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
          alignItems: 'center',
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