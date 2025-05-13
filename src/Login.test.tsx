import React, {useState} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoginPanel } from './login';


describe('LoginPanel Component', () => {
  const [user, setUser] = useState<string | null>(null)

  beforeEach(() => {
    localStorage.clear();
  });


  test('opens the login popup when button is clicked', () => {
    render(<LoginPanel user={user} setUser={setUser}/>);
    fireEvent.click(screen.getByText(/Login Panel/i));
    expect(screen.getByText(/Enter a username and password/i)).toBeInTheDocument();
  });


  test('renders input fields for username and password', () => {
    render(<LoginPanel user={user} setUser={setUser}/>);
    fireEvent.click(screen.getByText(/Login Panel/i));
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });


  test('creates user and saves in localStorage', () => {
    render(<LoginPanel user={user} setUser={setUser}/>);
    fireEvent.click(screen.getByText(/Login Panel/i));


    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByText(/Create User/i));


    const data = localStorage.getItem('LOGINS');
    expect(data).toContain('testuser');
  });


  test('attempts login with valid credentials (mocked)', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  const fakeLoginData = '{"username":"testuser","password":"1234"}{"username":"abc","password":"xyz"}';
  localStorage.setItem('LOGINS', fakeLoginData);


  render(<LoginPanel user={user} setUser={setUser}/>);
  fireEvent.click(screen.getByText(/Login Panel/i));


  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: '1234' }
  });


  fireEvent.click(
    screen.getAllByText(/Login/i).find(btn => btn.tagName === 'BUTTON')!
  );

  expect(alertMock).not.toHaveBeenCalled();


  alertMock.mockRestore();
});


  test('clears all login data from localStorage', () => {
    localStorage.setItem('LOGINS', 'dummy');
    localStorage.setItem('USER', 'dummy');


    render(<LoginPanel user={user} setUser={setUser}/>);
    fireEvent.click(screen.getByText(/Login Panel/i));


    fireEvent.click(
      screen.getAllByText(/Clear Users/i).find((btn) => btn.tagName === 'BUTTON')!
    );


    expect(localStorage.getItem('LOGINS')).toBeNull();
    expect(localStorage.getItem('USER')).toBeNull();
  });
});


