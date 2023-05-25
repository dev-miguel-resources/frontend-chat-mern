import { useRef, useEffect } from 'react';

const useEffectOnce = (callback) => {
  // Vamos a definir una referencia de estado llamada calledOnce como false
  const calledOnce = useRef(false);

  // Vamos a ejecutar esta función de efecto "useEffect" de React cuyo propósito es llamar al callback una sola vez.
  useEffect(() => {
    // Comprobamos el calledOnce si está establecido su current como false
    if (!calledOnce.current) {
      // Si lo anterior es verdadero, llamamos al callback recibido como argumento
      callback();
      // Establecemos la referencia del estado calledOnce como true
      calledOnce.current = true;
    }
    // Finalmente, el último parámetro del useEffect es una matriz con el callback para que cada vez que el mismo cambie, se ejecute la función.
  }, [callback]);
};

export default useEffectOnce;
