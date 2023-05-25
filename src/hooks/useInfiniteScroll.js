import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (bodyRef, bottomLineRef, callback) => {
  const handleScroll = useCallback(() => {
    const containerHeight = bodyRef?.current?.getBoundingClientHeight().height;
    const { top: bottomLineTop } = bottomLineRef?.current?.getBoundingClientHeight();
    if (bottomLineTop <= containerHeight) {
      callback();
    }
  }, [bodyRef, bottomLineRef, callback]);

  useEffect(() => {
    const bodyRefCurrent = bodyRef?.current;
    bodyRefCurrent?.addEventListener('scroll', handleScroll, true);

    // retorno de salida de proceso
    return () => bodyRefCurrent.removeEventListener('scroll', handleScroll, true);
  }, [bodyRef, handleScroll]);
};

export default useInfiniteScroll;

// Este hook se utiliza para detectar cuando el usuario ha llegado a la parte más baja de una página web para poder cargar más contenido
// Para lograr esto ocuparemos un "bodyRef" que hace referencia al contenedor general que contiene todos los elementos de la página
// También tendremos un "bottomLineRef": que es un elemento visible en la parte más baja de la página web
// Para terminar tendremos un "callback": que será el procedimiento a resolver
// Resumen final: Esta función recibe una 'ref' de React como parámetro (bodyRef) para obtener la altura del contenedor general de la página web
// y además recibe como parámetro otra 'ref' de React para obtener la ubicación de la linea inferior de la página que es (bottomLineRef)
