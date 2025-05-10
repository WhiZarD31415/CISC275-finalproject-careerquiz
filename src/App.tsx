/*  src/App.tsx  */

import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import DetailedCareer from './DetailedCareer';
import { detailProgress } from './DetailedCareer';
import { basicProgress, BasicCareer } from './BasicCareer';
import { resultLists } from './resultLists';

import sky         from './assets/1_sky.png';
import hills       from './assets/2_hills.png';
import groundBack  from './assets/3_ground.png';
import sphinxImg   from './assets/4_sphinx.png';
import groundFront from './assets/5_ground.png';

const LAYERS = [
  { src: sky,         speed: 0, z: 1, zoom: 1.0 },
  { src: hills,       speed: 0.30, z: 2, zoom: 1.1 },
  { src: groundBack,  speed: 0.55, z: 3, zoom: 1.1 },
  { src: sphinxImg,   speed: 0.75, z: 4, zoom: 1.1 },
  { src: groundFront, speed: 2.0, z: 5, zoom: 1.1 }
];

//Ground Front: #010122

const BOTTOM_COLOR = '#010122';
export const results: string[][] = [];
type Page = 'home' | 'about' | 'contact' | 'detailed-career' | 'basic-career';

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}



function useMouseOffset() {
  const [offset, setOffset] = useState(0); // −0.5 … +0.5 of viewport
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setOffset((e.clientX - window.innerWidth / 2) / window.innerWidth);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return offset;
}

function ParallaxBackdrop({ scrollY, mouseX }: { scrollY: number; mouseX: number }) {
  return (
    <div className="parallax-wrapper" style={{ backgroundColor: BOTTOM_COLOR }}>
      {LAYERS.map(({ src, speed, z, zoom }, i) => (
        <img
          key={src}
          src={src}
          className={`parallax-layer ${i === 0 ? 'sky' : ''}`}
          style={{
            transform: `
              translateX(${-(mouseX * speed) * 30}vw)
              translateY(-${scrollY * speed}px)
              scale(${zoom})
            `,
            zIndex: z,
            width: `${zoom * 100}vw`,
            left: `-${(zoom - 1) * 50}vw`   /* keep centered while zoomed */
          }}
          alt=""
        />
      ))}
    </div>
  );
}

function BlueSphinxTitle({
  scrollY,
  mouseX
}: {
  scrollY: number;
  mouseX: number;               // −0.5 … +0.5 (useMouseOffset hook)
}) {
  const depth = 0.75;           // same as sphinx layer
  const y = -scrollY * depth;
  const xVW = -(mouseX * depth) * 60;   // 60 vw max shift, opposite cursor

  return (
    <div
      className="bluesphinx-title-wrapper"
      style={{
        position: 'absolute',
        top: '5vh',
        right: '5%',
        transform: `translate(${xVW}vw, ${y}px)`,
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: 30
      }}
    >
      <h1
        style={{
          fontWeight: 'bold',
          fontSize: '3.5vw',
          color: 'white',
          fontFamily: 'Garamond, serif',
          textShadow: '2px 2px 2px black',
          margin: 0
        }}
      >
        the CAREER&nbsp;SPHINX
      </h1>

      <h2
        style={{
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '1.3vw',
          marginTop: '0.3em',
          lineHeight: 1.25
        }}
      >
        Unearth the career buried in your future<br /><br />
        Scroll down<br />
      </h2>
      <div className="scroll-cue" aria-hidden="true">▼</div>
    </div>
  );
}


function AssessmentSection({
  scrollY,
  goto,
  apiKeyUI
}: {
  scrollY: number;
  goto: (p: Page) => void;
  apiKeyUI: React.ReactNode;
}) {
  const offset = -scrollY * 0.75;
  return (
    <div
      style={{
        position: 'absolute',
        top: '120vh',
        left: '50%',
        transform: `translate(-50%, ${offset}px)`,
        width: '80vw',
        zIndex: 25
      }}
    >
      <Row>
        <Col style={{ color: 'white', marginLeft: '10%' }}>
          <Card id="QuizCard">
            The Basic Career assessment asks you to rate yourself on various
            skills and interests, giving a broad estimate of fitting careers.
            <br />
            <br/>
            <Button onClick={() => goto('basic-career')} id="PageButton">
              Take Basic Quiz
            </Button>
          </Card>
        </Col>

        <Col style={{ color: 'white' }}>
          <Card id="QuizCard">
            The Detailed Career assessment asks free-form questions about your
            personality and aspirations, returning tailored career paths – plus
            the reasoning behind each pick!
            <br/>
            <br/>
            <Button onClick={() => goto('detailed-career')} id="PageButton">
              Take Detailed Quiz
            </Button>
          </Card>
        </Col>
      </Row>

      {/* API Key form now sits under the cards */}
      <div style={{ marginTop: '2rem' }}>{apiKeyUI}</div>
    <br/>

    
    </div>

    
  );
}


function App() {
  const scrollY = useScrollY();
  const mouseX  = useMouseOffset();

  /* API-key & route state */
  const [key, setKey] = useState<string>(() => {
    const raw = localStorage.getItem('MYKEY');
    return raw ? JSON.parse(raw) : '';
  });
  const [currentPage, setCurrentPage] = useState<Page>('home');

  function rerender(pg:Page){
    setCurrentPage('about');
    setTimeout(() => {
      setCurrentPage(pg);
    }, 100);
  }

  const handleSubmit = () => {
    localStorage.setItem('MYKEY', JSON.stringify(key));
    window.location.reload();
  };

  /* re-usable key form node */
  const apiKeyForm = (
    <Form style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Form.Label style={{ color: 'white', margin: 0 }}>API Key:</Form.Label>
      <Form.Control
        type="password"
        placeholder="Insert API Key"
        onChange={e => setKey(e.target.value)}
        style={{ maxWidth: 200 }}
      />
      <Button onClick={handleSubmit} id="APIKeyButton">
        Submit
      </Button>
    </Form>
  );


  const renderPage = () => {
    if (currentPage !== 'home') {
      if (currentPage === 'detailed-career') return <DetailedCareer />;
      if (currentPage === 'basic-career')    return <BasicCareer />;
      if (currentPage === 'about')           return <div>About Page</div>;
      if (currentPage === 'contact')         return <div>Contact Page</div>;
    }
  
    return (
      <>
      <ParallaxBackdrop scrollY={scrollY} mouseX={mouseX} />
<BlueSphinxTitle  scrollY={scrollY} mouseX={mouseX} />  {/* ← add mouseX */}


        <AssessmentSection
          scrollY={scrollY}
          goto={setCurrentPage}
          apiKeyUI={apiKeyForm}
        />

        {/* past results (static) */}
        <Row style={{ marginTop: '230vh', marginLeft: '10%', marginRight: '10%' , position:'relative', backgroundColor:'#010122'}}>
          <h2
            style={{
              fontFamily: 'Garamond, serif',
              color: 'white',
              textShadow: '2px 2px 2px black'
            }}
          >
            Past Results:
          </h2>
          <p
            hidden={results.length > 0}
            style={{ fontFamily: 'Franklin Gothic, sans-serif', color: 'white' }}
          >
            You can review your results here once you've taken at least one quiz.
          </p>
          {resultLists()}
        </Row>
        
        <br/>
      </>
    );
  };

  return (
    <div
      className="App"
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      
      {/* Tiny in-page nav only when not on home */}
      {currentPage !== 'home' && (
        <button
          style={{ position: 'absolute', top: 10, left: 10, zIndex: 40 }}
          onClick={() => setCurrentPage('home')}
        > 
          🏠
        </button>
         
      )} 

      {renderPage()}
      {currentPage === 'basic-career' && (
        <div hidden={basicProgress<8}>
         <Button id="PageButton" style={{margin:'7px'}} onClick={() => setCurrentPage('home')}>Return to Homepage</Button>
        <Button id="PageButton" style={{margin:'7px'}} onClick={() => rerender('basic-career')}>Take Quiz Again?</Button>
        </div> 
      )}
  
      {currentPage === 'detailed-career' && (
        <div hidden={detailProgress<8}>
          <Button id="PageButton" style={{margin:'7px'}} onClick={() => setCurrentPage('home')}>Return to Homepage</Button>
          <Button id="PageButton" style={{margin:'7px'}} onClick={() => rerender('detailed-career')}>Take Quiz Again?</Button>
        </div> 
      )}
      <br/>
    </div>
  );
}

export default App;
