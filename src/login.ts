import fs from 'fs';

type User = {username: string, password: string}

export function create_login(username: string, password: string) {
    let user_login: User = {
        username: username,
        password: password
    };

    let userJson: string = ""
    try {
        userJson = JSON.stringify(user_login);
    } catch (error) {
        console.log(error);
        alert("User signup was invalid")
    }
    

    fs.writeFile('login.json', userJson, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
}