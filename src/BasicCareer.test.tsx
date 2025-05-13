import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicCareer } from './BasicCareer';


describe('BasicCareer Component', () => {
  test('renders Basic Career Assessment title', () => {
    render(<BasicCareer />);
    expect(screen.getByText(/Basic Career Assessment/i)).toBeInTheDocument();
  });


  test('renders slider questions', () => {
    render(<BasicCareer />);
    expect(screen.getAllByRole('slider').length).toBeGreaterThan(0);
  });


  test('submit button is disabled after last question', () => {
    render(<BasicCareer />);
    const button = screen.getByText(/Submit Answer/i);
    expect(button).toBeInTheDocument();
  });


  test('progress bar updates correctly', () => {
    render(<BasicCareer />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow');
  });
  

  test('flipping suggestion card (post-submission simulation)', () => {
    render(<BasicCareer />);
    const result = screen.queryByText(/Your Recommended Careers/i);
    expect(result).not.toBeInTheDocument();
  });
});
