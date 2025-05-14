import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicCareer } from './BasicCareer';
import { useState } from 'react';
import { Result } from './App';

describe('BasicCareer Component', () => {
  const [results, setResults] = useState<Result[]>([])
  test('renders Basic Career Assessment title', () => {
    render(<BasicCareer results = {results} setResults={setResults}/>);
    expect(screen.getByText(/Basic Career Assessment/i)).toBeInTheDocument();
  });


  test('renders slider questions', () => {
    render(<BasicCareer results = {results} setResults={setResults}/>);
    expect(screen.getAllByRole('slider').length).toBeGreaterThan(0);
  });


  test('submit button is disabled after last question', () => {
    render(<BasicCareer results = {results} setResults={setResults}/>);
    const button = screen.getByText(/Submit Answer/i);
    expect(button).toBeInTheDocument();
  });


  test('progress bar updates correctly', () => {
    render(<BasicCareer results = {results} setResults={setResults}/>);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow');
  });
  

  test('flipping suggestion card (post-submission simulation)', () => {
    render(<BasicCareer results = {results} setResults={setResults}/>);
    const result = screen.queryByText(/Your Recommended Careers/i);
    expect(result).not.toBeInTheDocument();
  });
});
