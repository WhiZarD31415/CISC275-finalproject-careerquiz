/*  src/App.tsx  */

import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import DetailedCareer, { detailProgress } from './DetailedCareer';
import { basicProgress, BasicCareer } from './BasicCareer';
import { ResultLists } from './resultLists';
import { LoginPanel} from './login'
import Fireflies from './Fireflies';

import sky from './assets/1_sky.png';
import hills from './assets/2_hills.png';
import groundBack from './assets/3_ground.png';
import sphinxImg from './assets/4_sphinx.png';
import groundFront from './assets/5_ground.png';

const LAYERS = [
  { src: sky, speed: 0, z: 1, zoom: 1.0 },
  { src: hills, speed: 0.3, z: 2, zoom: 1.1 },
  { src: groundBack, speed: 0.55, z: 3, zoom: 1.1 },
  { src: sphinxImg, speed: 0.75, z: 4, zoom: 1.1 },
  { src: groundFront, speed: 2, z: 5, zoom: 1.27 }
];

const BOTTOM_COLOR = '#010122';
export type Result = {title: string, text: string, number: number};
type Page = 'home' | 'about' | 'contact' | 'detailed-career' | 'basic-career';

/* ─── hooks ────────────────────────────────────────────────── */
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
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setOffset((e.clientX - window.innerWidth / 2) / window.innerWidth);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return offset;
}

/* ─── parallax backdrop ────────────────────────────────────── */
/* ─── parallax backdrop ────────────────────────────────────── */
function ParallaxBackdrop({
  scrollY,
  mouseX
}: {
  scrollY: number;
  mouseX: number;
}) {
  return (
    <div className="parallax-wrapper" style={{ backgroundColor: BOTTOM_COLOR }}>
      {LAYERS.map(({ src, speed, z, zoom }) => {
        // push the 5‑ground layer down by 15 vh
        const extraTop = src === groundFront ? '15vh' : '0';
        return (
          <img
            key={src}
            src={src}
            className="parallax-layer"
            style={{
              top: extraTop,
              transform: `
                translateX(${-(mouseX * speed) * 30}vw)
                translateY(-${scrollY * speed}px)
                scale(${zoom})`,
              zIndex: z,
              width: `${zoom * 100}vw`,
              left: `-${(zoom - 1) * 50}vw`
            }}
            alt=""
          />
        );
      })}
    </div>
  );
}

/* ─── title block ──────────────────────────────────────────── */
function BlueSphinxTitle({
  scrollY,
  mouseX
}: {
  scrollY: number;
  mouseX: number;
}) {
  const depth = 0.75;
  const y = -scrollY * depth;
  const xVW = -(mouseX * depth) * 30;

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
          fontFamily: 'Viner Hand ITC, sans-serif',
          fontSize: '1.3vw',
          marginTop: '0.3em',
          lineHeight: 1.25
        }}
      >
        Unearth the career buried in your future.
      </h2>

      <div
        className="scroll-cue"
        aria-hidden="true"
        style={{
          color: 'white',
          fontSize: '1vw',
          fontFamily: 'Franklin Gothic, sans-serif'
        }}
      >
        Scroll Down ▼
      </div>
    </div>
  );
}

/* ─── assessment section ──────────────────────────────────── */
function AssessmentSection({
  scrollY,
  goto,
  apiKeyUI,
  user, 
  setUser,
  setResults
}: {
  scrollY: number;
  goto: (p: Page) => void;
  apiKeyUI: React.ReactNode;
  user: string|null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
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
            <br />
            <Button onClick={() => goto('basic-career')} id="PageButton">
              Take Basic Quiz
            </Button>
          </Card>
        </Col>

        <Col style={{ color: 'white' }}>
          <Card id="QuizCard">
            The Detailed Career assessment asks free‑form questions about your
            personality and aspirations, returning tailored career paths – plus
            the reasoning behind each pick!
            <br />
            <br />
            <Button onClick={() => goto('detailed-career')} id="PageButton">
              Take Detailed Quiz
            </Button>
          </Card>
        </Col>
      </Row>

      <br />
      <br />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}
      >
        {apiKeyUI}
        <LoginPanel user={user} setUser={setUser} setResults={setResults}></LoginPanel>
      </div>
    </div>
  );
}

/* ─── main app ─────────────────────────────────────────────── */
function App() {
  const scrollY = useScrollY();
  const mouseX  = useMouseOffset();
  const [user, setUser] = useState<string | null>(localStorage.getItem("USER"));
  const [results, setResults] = useState<Result[]>(JSON.parse(localStorage.getItem("RESULTS") ?? "[]"));

  // hide fireflies when groundFront has climbed ~75 % of viewport
  const showFireflies = scrollY < window.innerHeight * 0.75;

  /* API-key & route state */
  const [key, setKey] = useState<string>(() => {
    const raw = localStorage.getItem('MYKEY');
    return raw ? JSON.parse(raw) : '';
  });
  const [currentPage, setCurrentPage] = useState<Page>('home');

  function rerender(pg: Page) {
    setCurrentPage('about');
    setTimeout(() => {
      setCurrentPage(pg);
    }, 10);
  }

  const handleSubmit = () => {
    localStorage.setItem('MYKEY', JSON.stringify(key));
    window.location.reload();
  };

  const apiKeyForm = (
    <Form style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Form.Label style={{ color: 'white', margin: 0 }}>API Key:</Form.Label>
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

  const renderPage = ({results, setResults} : {results: Result[]; setResults: React.Dispatch<React.SetStateAction<Result[]>>}) => {
    if (currentPage !== 'home') {
      if (currentPage === 'detailed-career') return <DetailedCareer results={results} setResults={setResults}/>;
      if (currentPage === 'basic-career')    return <BasicCareer results={results} setResults={setResults}/>;
      if (currentPage === 'about')           return <div>About Page</div>;
      if (currentPage === 'contact')         return <div>Contact Page</div>;
    }

    return (
      <>
        <ParallaxBackdrop scrollY={scrollY} mouseX={mouseX} />
        {showFireflies && <Fireflies />}
        <BlueSphinxTitle scrollY={scrollY} mouseX={mouseX} />

        <AssessmentSection
          scrollY={scrollY}
          goto={setCurrentPage}
          apiKeyUI={apiKeyForm}
          user={user}
          setUser={setUser}
          setResults={setResults}
        />

        <Row
          style={{
            marginTop: '150vh',
            marginLeft: '10%',
            marginRight: '10%',
            position: 'relative',
            backgroundColor: '#010122'
          }}
        >
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
            style={{
              fontFamily: 'Franklin Gothic, sans-serif',
              color: 'white'
            }}
          >
            You can review your results here once you've taken at least one
            quiz.
          </p>
          {ResultLists({results})}
        </Row>
        <br />
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
      {currentPage !== 'home' && (
        <button
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 40,
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#fff'
          }}
          onClick={() => setCurrentPage('home')}
        >
          🏠
        </button>
      )}

      {renderPage({results, setResults})}
        
      {/* quiz return buttons */}
      {currentPage === 'basic-career' && (
        <div hidden={basicProgress < 8}>
          <Button
            id="PageButton"
            style={{ margin: '7px' }}
            onClick={() => setCurrentPage('home')}
          >
            Return to Homepage
          </Button>
          <Button
            id="PageButton"
            style={{ margin: '7px' }}
            onClick={() => rerender('basic-career')}
          >
            Take Quiz Again?
          </Button>
        </div>
      )}

      {currentPage === 'detailed-career' && (
        <div hidden={detailProgress < 100}>
          <Button
            id="PageButton"
            style={{ margin: '7px' }}
            onClick={() => setCurrentPage('home')}
          >
            Return to Homepage
          </Button>
          <Button
            id="PageButton"
            style={{ margin: '7px' }}
            onClick={() => rerender('detailed-career')}
          >
            Take Quiz Again?
          </Button>
        </div>
      )}
      <br />
    </div>
  );
}

export default App;
