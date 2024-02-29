import mysql from "mysql";
import express from "express";
import session from "express-session";
import cors from "cors";
import bcrypt from "bcrypt"; // Importieren Sie bcrypt für Hashing

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'coin'
});

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(session({
    secret: '3ihdoiwehdfiowehfih23f82', // Replace with a long, random string
    name: 'session', // Optional session name
    resave: false, // Don't resave unmodified sessions
    saveUninitialized: false, // Create sessions even if empty
    cookie: {
        sameSite: 'Lax',
        secure: false, // Set to true for HTTPS in production
        httpOnly: true, // Prevent client-side JavaScript access to cookies
        maxAge: 1000 * 60 * 60 * 240, // Session expiration (1 day)
    },
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// http://localhost:3000/auth
app.post('/auth', function (request, response) {
    console.log(request.body)
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                const user = results[0];
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result) {
                        request.session.loggedin = true;
                        request.session.username = username;
                        request.session.row = results;
                        response.send('Login successful!');
                    } else {
                        response.send('Incorrect Username and/or Password!');
                    }
                    response.end();
                });
            } else {
                response.send('User does not exist!');
                response.end();
            }
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

// http://localhost:3000/home
app.get('/checkSession', function (request, response) {
    // function hashPassword(password, callback) {
    //     const saltRounds = 10; // Anzahl der Salz-Runden für die Verschlüsselung
    //     bcrypt.hash(password, saltRounds, function(err, hash) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, hash);
    //         }
    //     });
    // }
    //
    // const plainPassword = "VFT5intro45!";
    // hashPassword(plainPassword, function(err, hashedPassword) {
    //     if (err) {
    //         console.error('Fehler beim Hashen des Passworts:', err);
    //     } else {
    //         console.log('Hashwert des Passworts:', hashedPassword);
    //     }
    // });
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.status(401).send('Unauthorized');
    }
    response.end();
});

app.listen(3000);