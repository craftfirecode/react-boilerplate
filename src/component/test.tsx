// ButtonTry.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode; // Kinder-Prop hinzugefügt
}

const ButtonTry: React.FC<ButtonProps> = ({ onClick, children }) => {
  const defaultOnClick = () => {
    console.log('Default button clicked!');
  };

  const handleClick = () => {
    defaultOnClick(); // Standardfunktion aufrufen
    if (onClick) {
      onClick(); // Benutzerdefinierte Funktion aufrufen, falls übergeben
    }
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default ButtonTry;
