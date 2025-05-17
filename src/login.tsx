import React, { useState } from 'react';
import './login.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Result } from './App';

// General purpose object to store user information
// Is converted to JSON and back between local storage
type User = {username: string, password: string, results: string};

// takes in a Result and saves that to logged in USER (and LOGINS/RESULTS) local storage
export function save_result(result: Result) {
    let login_data: User[] = read_login_data();
    let current_user: string = localStorage.getItem("USER") ?? ""
    let current_name: string = JSON.parse(current_user).username
    let index: number = login_data.findIndex((user: User) => user.username === current_name)

    // convert result to JSON
    let resultJson: string = "";
    try {
        resultJson = JSON.stringify(result);
    } catch (error) {
        console.log(error);
        alert("Result was invalid JSON");
        return;
    }

    const current_results: string = login_data[index].results;
    if (current_results.includes(resultJson)) {
        alert("Already saved");
        return;
    }
    // update results for user
    if (current_results === "[]") {
        login_data[index].results = "[" + resultJson + "]";
    } else {
        login_data[index].results = current_results.slice(0,-1) + "," + resultJson + "]";
    }
    // convert login data (User[]) back to JSON
    let loginsJson: string = "";
    try {
        loginsJson = (login_data.map((user: User) => JSON.stringify(user))).join();
    } catch (error) {
        console.log(error);
        alert("Logins were invalid JSON");
        return;
    }

    // convert user data to JSON
    let userJson: string = "";
    try {
        userJson = JSON.stringify(login_data[index]);
    } catch (error) {
        console.log(error);
        alert("User was invalid JSON");
        return;
    }

    // update relevant items in local storage
    localStorage.setItem("USER", userJson);
    localStorage.setItem("LOGINS", loginsJson);
    localStorage.setItem("RESULTS", login_data[index].results);
}

// takes in a username and password and adds the User to LOGINS local storage
function create_login(username: string, password: string) {
    let login_data: User[] = read_login_data();

    if (find_username(login_data,username)) {
        alert("Username is taken");
        return;
    }

    let user_login: User = {
        username: username,
        password: password,
        results: "[]"
    };

    // convert User to JSON
    let userJson: string = "";
    try {
        userJson = JSON.stringify(user_login);
    } catch (error) {
        console.log(error);
        alert("User signup was invalid");
        return;
    }
    
    // read in LOGINS
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

    // update LOGINS local storage
    localStorage.setItem("LOGINS",loginsJson+userJson)
}

// Takes in a username and password and signs that User in
// This updates the results state of App.tsx and USER/RESULTS local storage
function sign_in(username: string, password: string, setResults: React.Dispatch<React.SetStateAction<Result[]>>) {
    let login_data: User[] = read_login_data();
    let user: User | undefined = find_username(login_data,username);

    if (!user) {
        alert("Username not found");
        return;
    }

    if (user.password !== password) {
        alert("Incorrect password");
        return;
    }

    // convert User to JSON
    let userJson: string = "";
    try {
        userJson = JSON.stringify(user);
    } catch (error) {
        console.log(error);
        alert("User was invalid JSON");
        return;
    }

    // set USER/RESULTS local storage and results state of App.tsx
    localStorage.setItem("USER",userJson)
    localStorage.setItem("RESULTS",user.results)
    setResults(JSON.parse(user.results));
}

// Clears all login, user, and result data from local storage
function clear_logins() {
    localStorage.removeItem("LOGINS");
    localStorage.removeItem("USER");
    localStorage.removeItem("RESULTS");
}

// Reads LOGINS from local storage and returns that formatted to User[]
function read_login_data(): User[] {
    let data: string | null = null;
    let login_data: User[] = [];
    // read LOGINS
    try {
        data = localStorage.getItem("LOGINS")
    } catch (error) {
        console.error('Error reading logins:', error);
    }
    // convert to User[]
    if (data) {
        let data_array: string[] = data.split(']"}');
        login_data = data_array.slice(0,-1).map(string => (string === data_array[0]) ? JSON.parse(string + ']"}') : JSON.parse(string.slice(1) + ']"}'));
    }
    return login_data;
}

// Finds and returns a User with the given username from given login data
function find_username(login_data: User[], username: string): User | undefined {
    let user: User | undefined = undefined;
    user = login_data.find(login => (login) ? login.username === username : false);
    return user;
}

interface MyComponentProps {
    isOpen: boolean; 
    onClose: () => void;
    children: React.ReactNode;
}

// Child component to Login Panel that handles the Popup visual
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
                        <Button id="PageButton" onClick={() => clear_logins()} disabled={!localStorage.getItem("LOGINS")}>
                            Clear Users
                        </Button>
                        <Button id="PageButton" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
// A major component that allows the user to create user, sign-in, and clear users from local storage
export function LoginPanel({
        user, 
        setUser,
        setResults
    } : {
        user: string|null;
        setUser: React.Dispatch<React.SetStateAction<string | null>>;
        setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    }): React.JSX.Element {
    // controls if popup is shown
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    // keeps track of the username and password that is typed in the inputs
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Creates a user in local storage
    function CreateUser() {
        create_login(username, password);
        SignIn()
        setIsPopupOpen(false);
    }

    // Signs in a user to local storage, and updates result state from App.tsx
    function SignIn() {
        sign_in(username, password, setResults);
        setUser(localStorage.getItem("USER"));
        setIsPopupOpen(false);
    }

    // Signs user out. Involves resetting user and result states from App.tsx
    function SignOut() {
        localStorage.removeItem("USER");
        localStorage.removeItem("RESULTS");
        setUser(null);
        setResults([]);
    }

    return (
        <Form>
            {(!user) ? (<Button onClick={() => setIsPopupOpen(true)} id="loginPopupButton">
                Login 
            </Button>) : (<Button onClick={() => SignOut()} id="loginPopupButton">
                Logout 
            </Button>)}
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <h2>Login Panel</h2>
            <p>Enter a username and password to locally create a user or login.<br></br>Hit "Clear Users" to empty local storage.</p>
            <div style={{ paddingBottom: '15px'}}>

                {/* username input */}
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

                {/* password input */}
                <Form.Group as={Row}>
                    <Form.Label column xs="3">Password:</Form.Label>
                    <Col xs="9">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ maxWidth: '90%', resize: 'none'}}
                        />
                    </Col>
                </Form.Group>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5px'}}>
                <Button id="PageButton" onClick={() => CreateUser()}>Create User</Button>
                <div>&nbsp;</div>
                <Button id="PageButton" onClick={() => SignIn()}>Login</Button>
            </div>
            </Popup>
        </Form>
    );
}