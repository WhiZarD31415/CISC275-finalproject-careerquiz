import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Basic and Detailed Career quiz buttons', () => {
    render(<App />);
    expect(screen.getByText(/Take Basic Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Take Detailed Quiz/i)).toBeInTheDocument();
  });


  test('clicking Basic Quiz shows home button', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Take Basic Quiz/i));
    expect(screen.getByRole('button', { name: /🏠/i })).toBeInTheDocument();
  });


  test('clicking Detailed Quiz shows home button', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Take Detailed Quiz/i));
    expect(screen.getByRole('button', { name: /🏠/i })).toBeInTheDocument();
  });


  test('displays API key input and handles submit', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Insert API Key/i);
    const button = screen.getByText(/Submit/i);


    fireEvent.change(input, { target: { value: 'fake-key' } });
    expect(input).toHaveValue('fake-key');
    expect(button).toBeInTheDocument();
  });
});
