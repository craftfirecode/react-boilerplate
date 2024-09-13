import {createClient} from "@supabase/supabase-js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPER_URL;
const supabaseKey = import.meta.env.VITE_SUPER_API;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to check session and extract user ID
app.use(async (req, res, next) => {
    //const jwt = req.headers.authorization; // Assuming JWT is sent in Authorization header
    const jwt = import.meta.env.VITE_SUPER_API; // Assuming JWT is sent in Authorization header

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
