const formatoFecha = (fechaStr) => {
  const fechaObjeto = new Date(fechaStr);

  const opcionesDeFormato = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };

  const formatoPersonalizado = new Intl.DateTimeFormat(
    "es-ES",
    opcionesDeFormato
  ).format(fechaObjeto);
  const resultadoAjustado = formatoPersonalizado.replace(
    /(\b\p{L}+\b)/gu,
    (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
  );

  return resultadoAjustado;
};

export default formatoFecha;
