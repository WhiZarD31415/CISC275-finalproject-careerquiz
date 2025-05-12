import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailedCareer from './DetailedCareer';


describe('DetailedCareer Component', () => {
  test('renders Detailed Career Assessment title', () => {
    render(<DetailedCareer />);
    expect(screen.getByText(/Detailed Career Assessment/i)).toBeInTheDocument();
  });


  test('renders first question and textarea', () => {
    render(<DetailedCareer />);
    expect(screen.getByText(/Describe a task or activity/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });


  test('next button disabled if answer is empty', () => {
    render(<DetailedCareer />);
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();
  });


  test('allows answering and going to next question', () => {
    render(<DetailedCareer />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Sample Answer' } });
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  });


  test('progress bar is present', () => {
    render(<DetailedCareer />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
  });
});
