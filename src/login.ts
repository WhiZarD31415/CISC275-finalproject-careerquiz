type User = {username: string, password: string} | undefined;

export function create_login(username: string, password: string) {
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

export function clear_logins() {
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