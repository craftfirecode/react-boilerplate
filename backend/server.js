import {createClient} from "@supabase/supabase-js";

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = 'https://jfgrqcvupvyzyquawwpg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3JxY3Z1cHZ5enlxdWF3d3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyODIwMjEsImV4cCI6MjAyNDg1ODAyMX0.D-O2nSRD3N4WWQOLc-aU3lOWof5tqTx3XriGTEpihDQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to check session and extract user ID
app.use(async (req, res, next) => {
    //const jwt = req.headers.authorization; // Assuming JWT is sent in Authorization header
    const jwt = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkVTWUh6bE9XQk5sNWh4MFQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA5MzkyNDM2LCJpYXQiOjE3MDkzODg4MzYsImlzcyI6Imh0dHBzOi8vamZncnFjdnVwdnl6eXF1YXd3cGcuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImZkODg1NDM3LTEyNWItNGQyMy1hNGVlLWY4ZTE0YmFmZmYzOSIsImVtYWlsIjoia2FsbGUwMDQ1QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA5MzA0NDAwfV0sInNlc3Npb25faWQiOiJhM2EzN2Y5OS0xNDgxLTQ3NGItOTIyNi1kYmJjYjEzYzU2Y2EifQ.74bX7n91oBTBveTqVEVH2HWXB_0z1uvTOLI1tRARuQ0"; // Assuming JWT is sent in Authorization header

    try {
        // Get user data from Superbase using the JWT
        const { data: user, error } = await supabase.auth.getUser(jwt);

        if (error) {
            throw new Error(error.message);
        }

        if (user) {
            // Attach user data to the request object
            req.user = user;
        } else {
            req.user = null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        req.user = null;
    }

    next();
});

// Endpoint to access user data
app.get('/user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
