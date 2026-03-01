const inputCantidad = document.querySelector('#cantidad');
const selectMoneda = document.querySelector('#moneda');
const botonConvertir = document.querySelector('#convertir');
const textoResultado = document.querySelector('#resultado');

async function convertirMoneda() {
  const cantidad = inputCantidad.value; // Obtenemos el número que puso el usuario
  const monedaDestino = selectMoneda.value; // Obtenemos si eligió EUR, MXN, etc.

  // Validación simple
  if (cantidad === "" || cantidad <= 0) {
    textoResultado.textContent = "Error: Ingresa un monto válido";
    textoResultado.style.color = "red";
    return; // Detenemos la función aquí
  }

  try {
    // 1. Pedimos los datos (Fetch)
    const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
    const datos = await respuesta.json();

    // 2. Buscamos la tasa de cambio
    const tasa = datos.rates[monedaDestino];
    const total = (cantidad * tasa).toFixed(2);

    // 3. Mostramos el resultado en el DOM
    textoResultado.textContent = `Resultado: ${total} ${monedaDestino}`;
    textoResultado.style.color = "black";

  } catch (error) {
    textoResultado.textContent = "Error al conectar con la API";
  }
}

botonConvertir.addEventListener("click", convertirMoneda);