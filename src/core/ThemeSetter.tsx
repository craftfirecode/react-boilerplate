import { useEffect } from 'react';
import { openDB } from 'idb';

const ThemeSetter = () => {
    useEffect(() => {
        const setTheme = async () => {
            try {
                const db = await openDB('PageBuilder', 1);
                const value = await db.get('settings', 'styleMode');
                if (value) {
                    document.documentElement.setAttribute('data-mode', value);
                }
            } catch (error) {
                console.error("Fehler beim Setzen des Themes:", error);
            }
        };

        setTheme().then();
    }, []);

    return null; // Diese Komponente rendert nichts.
};

export default ThemeSetter;