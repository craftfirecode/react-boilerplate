// useSession.js
import {useEffect, useState} from "react";
import {createClient} from '@supabase/supabase-js'

const supabase = createClient('https://jfgrqcvupvyzyquawwpg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3JxY3Z1cHZ5enlxdWF3d3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyODIwMjEsImV4cCI6MjAyNDg1ODAyMX0.D-O2nSRD3N4WWQOLc-aU3lOWof5tqTx3XriGTEpihDQ')

export function useSession() {
    const [session, setSession] = useState<any>(null)
    console.log(session);
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe();
    }, [])

    return session
}
