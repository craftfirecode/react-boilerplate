import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useSession() {
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true); // Loading starts as true

    useEffect(() => {
        setIsLoading(true); // Set loading to true initially

        // Fetch the session when the component mounts
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching session:", error);
            } else {
                setSession(data.session); // Set the session state
            }
            setIsLoading(false); // Stop loading
        };

        fetchSession();

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session); // Set the session state on auth state change
            setIsLoading(false); // Stop loading on auth state change
        });

        // Cleanup the listener when the component unmounts
        return () => {
            if (authListener) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

    return { session, isLoading }; // Return both session and loading state
}
