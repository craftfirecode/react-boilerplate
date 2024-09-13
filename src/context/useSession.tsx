import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabase = createClient(import.meta.env.VITE_SUPER_URL, import.meta.env.VITE_SUPER_API)

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
