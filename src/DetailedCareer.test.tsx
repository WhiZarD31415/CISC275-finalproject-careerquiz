import React  from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailedCareer from './DetailedCareer';
import { useState } from 'react';
import { Result } from './App';


describe('DetailedCareer Component', () => {
  const [result, setResults] = useState<Result[]>([])
  test('renders Detailed Career Assessment title', () => {
    render(<DetailedCareer results = {result} setResults={setResults}/>);
    expect(screen.getByText(/Detailed Career Assessment/i)).toBeInTheDocument();
  });


  test('renders first question and textarea', () => {
    render(<DetailedCareer results = {result} setResults={setResults}/>);
    expect(screen.getByText(/Describe a task or activity/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });


  test('next button disabled if answer is empty', () => {
    render(<DetailedCareer results = {result} setResults={setResults}/>);
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();
  });


  test('allows answering and going to next question', () => {
    render(<DetailedCareer results = {result} setResults={setResults}/>);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Sample Answer' } });
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  });


  test('progress bar is present', () => {
    render(<DetailedCareer results = {result} setResults={setResults}/>);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
  });
});
