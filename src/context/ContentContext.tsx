import {createContext, useContext, useEffect, useState} from 'react';
import contentData from './json/content.json';

const ContentContext = createContext('');

export const ContentProvider = ({ children }: any) => {
    const [content, setContent] = useState<any>({});

    // Lade die Inhalte aus der JSON-Datei
    useEffect(() => {
        setContent(contentData);
    }, []);

    return (
        <ContentContext.Provider value={content}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
