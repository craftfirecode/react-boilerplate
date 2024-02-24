import React, {useState, useEffect} from 'react';
import {openDB} from 'idb';

const ModeComponent: React.FC = () => {
    const [mode, setMode] = useState<string>('indigo');

    useEffect(() => {
        // IndexedDB initialisieren
        const initDB = async () => {
            const db = await openDB('PageBuilder', 1, {
                upgrade(db) {
                    db.createObjectStore('settings');
                },
            });
            const value = await db.get('settings', 'styleMode');
            if (value) {
                setMode(value);
                document.documentElement.setAttribute('data-mode', value);
            }
        };
        initDB().then();
    }, []);

    const handleChangeMode = async () => {
        const newMode = mode === 'indigo' ? 'red' : 'indigo';
        setMode(newMode);
        // Wert in IndexedDB speichern
        const db = await openDB('PageBuilder', 1);
        await db.put('settings', newMode, 'styleMode');
        // Ändern der data-mode-Eigenschaft des <html>-Elements
        document.documentElement.setAttribute('data-mode', newMode);
    };

    return (
        <div className='container my-3'>
            <button className='btn-primary' onClick={handleChangeMode}>
                Change Mode to {mode === 'indigo' ? 'redMode' : 'indigoMode'}
            </button>
        </div>
    );
};

export default ModeComponent;
