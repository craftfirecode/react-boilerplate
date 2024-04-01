import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabase = createClient('https://jfgrqcvupvyzyquawwpg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3JxY3Z1cHZ5enlxdWF3d3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyODIwMjEsImV4cCI6MjAyNDg1ODAyMX0.D-O2nSRD3N4WWQOLc-aU3lOWof5tqTx3XriGTEpihDQ')

export function useSession() {
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true

    useEffect(() => {
        setIsLoading(true); // Set loading to true when the component mounts and we start fetching the session

        // Fetch the initial session state
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
            setIsLoading(false); // Set loading to false after fetching the session
        });

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setIsLoading(false); // Also set loading to false when the auth state changes
        });

        return () => {
            subscription.unsubscribe();
            setIsLoading(false); // Ensure to set loading to false when the component unmounts
        };
    }, []);

    return { session, isLoading }; // Return both session and isLoading state
}
