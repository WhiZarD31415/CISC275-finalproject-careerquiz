import React, { useState } from 'react';
import './login.css';
import { Button, Col, Form, Row } from 'react-bootstrap';

type User = {username: string, password: string} | undefined;

function create_login(username: string, password: string) {
    let login_data: User[] = read_login_data();

    if (find_username(login_data,username)) {
        alert("Username is taken");
        return;
    }

    let user_login: User = {
        username: username,
        password: password
    };

    let userJson: string = "";
    try {
        userJson = JSON.stringify(user_login);
    } catch (error) {
        console.log(error);
        alert("User signup was invalid");
        return;
    }
    
    let loginsJson: string | null = "";
    try {
        loginsJson = localStorage.getItem("LOGINS")
    } catch (error) {
        console.log(error);
        alert('Error reading logins');
        return;
    }

    if (loginsJson === null) {
        loginsJson = "";
    }
    localStorage.setItem("LOGINS",loginsJson+userJson)
}

function sign_in(username: string, password: string) {
    let login_data: User[] = read_login_data();
    let user: User = find_username(login_data,username);

    if (!user) {
        alert("Username not found");
        return;
    }

    if (user.password !== password) {
        alert("Incorrect password");
        return;
    }

    let userJson: string = "";
    try {
        userJson = JSON.stringify(user);
    } catch (error) {
        console.log(error);
        alert("User was invalid JSON");
        return;
    }

    localStorage.setItem("USER",userJson)
}

function clear_logins() {
    localStorage.removeItem("LOGINS");
    localStorage.removeItem("USER");
}

function read_login_data(): User[] {
    let data: string | null = null;
    let login_data: User[] = [];
    try {
        data = localStorage.getItem("LOGINS")
    } catch (error) {
        console.error('Error reading logins:', error);
    }
    if (data) {
        let data_array: string[] = data.split("}");
        login_data = data_array.slice(0, -1).map(string => JSON.parse(string + "}"));
    }
    return login_data;
}

function find_username(login_data: User[], username: string): User {
    let user: User = undefined;
    user = login_data.find(login => (login) ? login.username === username : false);
    return user
}

interface MyComponentProps {
    isOpen: boolean; 
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<MyComponentProps> = ({ isOpen, onClose, children}) => {
    if (!isOpen) return <div></div>;
  
    return (
        <div style={{
            position:'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '6px',
                minWidth: '300px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
                <div>
                    {children}
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '5px'}}>
                        <Button id="button" onClick={() => clear_logins()}>Clear Users</Button>
                        <Button id="button" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export function LoginPanel(): React.JSX.Element {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function CreateUser() {
        create_login(username, password);
        setIsPopupOpen(false);
    }

    function SignIn() {
        sign_in(username, password);
        setIsPopupOpen(false);
    }

    return (
        <Form>
            <Button onClick={() => setIsPopupOpen(true)} style={{
                backgroundColor: '#5591A9', 
                border: '#61dafb 0.5vh outset'
            }}>
                Login Panel 
            </Button>
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <h2>Login Panel</h2>
            <p>Enter a username and password to locally create a user or login.<br></br>Hit "Clear Users" to empty local storage.</p>
            <div style={{ paddingBottom: '15px'}}>
                <Form.Group as={Row}>
                    <Form.Label column xs="3">Username:</Form.Label>
                    <Col xs="9">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ maxWidth: '90%', resize: 'none'}}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column xs="3">Password:</Form.Label>
                    <Col xs="9">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ maxWidth: '90%', resize: 'none'}}
                        />
                    </Col>
                </Form.Group>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5px'}}>
                <Button id="button" onClick={() => CreateUser()}>Create User</Button>
                <div>&nbsp;</div>
                <Button id="button" onClick={() => SignIn()}>Login</Button>
            </div>
            </Popup>
        </Form>
    );
}