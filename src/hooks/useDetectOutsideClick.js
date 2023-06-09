import { useState, useEffect } from 'react';

// Una función que se usa como hook para detectar clicks fuera de un elemento
// Defines una función que recibe una referencia del elemento que se quiere vigilar y el valor inicial del estado
const useDetectOutsideClick = (ref, initialState) => {
  // Establece el valor inicial para el estado de la función
  const [isActive, setIsActive] = useState(initialState);

  // manejo del ciclo de vida mediante useEffect
  useEffect(() => {
    const onClick = (event) => {
      // Comprobar que el elemento sobre el cual se hace click, no esté dentro del elemento que nosotros estamos vigilando, evitando así activar el evento
      if (ref.current !== null && !ref.current.contains(event.target)) {
        // Cambia el valor del state
        setIsActive(!isActive);
      }
    };
    // Asociamos la definición del evento a ocupar mediante la función de la lógica del onClick
    if (isActive) {
      window.addEventListener('mousedown', onClick);
    }

    // Función para limpiar el evento generado una vez que ya se resuelva
    return () => {
      window.removeEventListener('mousedown', onClick);
    };
  }, [isActive, ref]);

  // retornas las props del hook
  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
