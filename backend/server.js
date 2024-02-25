import mysql from "mysql";
import express from "express";
import session from "express-session";
import cors from "cors";

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'coin'
});

const app = express();
app.use(cors());

app.use(session({
    secret: 'secret',
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
    // Capture the input fields
    console.log(request.body)
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                console.log('Login')
                request.session.loggedin = true;
                request.session.username = username;
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// http://localhost:3000/home
app.get('/checkSession', function(request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
        // Output username
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        // Not logged in
        response.send('Not Login');
    }
    response.end();
});

app.listen(3000);