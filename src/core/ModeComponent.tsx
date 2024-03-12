import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';

const ModeComponent: React.FC = () => {
    const [db, setDb] = useState<any>(null);

    useEffect(() => {
        // IndexedDB initialisieren
        const initDB = async () => {
            try {
                const db = await openDB('PageBuilder', 1, {
                    upgrade(db) {
                        db.createObjectStore('settings');
                    },
                });
                setDb(db); // Speichern der DB-Verbindung
                const value = await db.get('settings', 'styleMode');
                if (value) {
                    document.documentElement.setAttribute('data-mode', value);
                }
            } catch (error) {
                console.error("Fehler beim Initialisieren der IndexedDB:", error);
            }
        };
        initDB();
    }, []);

    const handleChangeMode = async (style: string) => {
        if (!db) {
            console.error("Datenbankverbindung nicht initialisiert.");
            return;
        }
        try {
            // Wert in IndexedDB speichern
            await db.put('settings', style, 'styleMode');
            // Ändern der data-mode-Eigenschaft des <html>-Elements
            document.documentElement.setAttribute('data-mode', style);
        } catch (error) {
            console.error("Fehler beim Speichern des neuen Modus:", error);
        }
    };

    return (
        <div className='container my-3'>
            <div className="row gap-4">
                <button className='btn-primary w-full flex justify-center' onClick={() => handleChangeMode("white")}>
                    White
                </button>
                <button className='btn-primary w-full flex justify-center' onClick={() => handleChangeMode("indigo")}>
                    Light Indigo
                </button>
                <button className='btn-primary w-full flex justify-center' onClick={() => handleChangeMode("red")}>
                    Light Red
                </button>
                <button className='btn-primary w-full flex justify-center' onClick={() => handleChangeMode("dark")}>
                    Dark
                </button>
            </div>
        </div>
    );
};

export default ModeComponent;
