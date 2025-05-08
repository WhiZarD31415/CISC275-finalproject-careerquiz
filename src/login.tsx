import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';

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

    let userJson: string = ""
    try {
        userJson = JSON.stringify(user_login);
    } catch (error) {
        console.log(error);
        alert("User signup was invalid");
    }
    
    localStorage.setItem("LOGINS",userJson)
    /* fs.writeFile('login.json', userJson, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    }); */
}

function clear_logins() {
    localStorage.removeItem("LOGINS");
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
        console.log(data_array)
        login_data = data_array.map(string => JSON.parse(string + "}"));
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
                <div className="popup-content">
                    {children}
                    <Button className="popup-close" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
  }
  
export function LoginPanel(): React.JSX.Element {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  
    return (
        <Form>
            <Button onClick={() => setIsPopupOpen(true)} style={{
                backgroundColor: '#5591A9', 
                border: '#61dafb 0.5vh outset'
            }}>
                Open Popup    
            </Button>
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
            <div style={{ display: 'flex'}}>
                <Button onClick={() => create_login("connor", "1234")}>Signup</Button>
                <Button onClick={() => null}>Login</Button>
            </div>
            <Button onClick={() => clear_logins()}>Clear Users</Button>
            </Popup>
        </Form>
    );
}