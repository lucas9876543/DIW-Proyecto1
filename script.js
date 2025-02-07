const seleccionMonedaUno = document.getElementById("moneda-uno");
const seleccionMonedaDos = document.getElementById("moneda-dos");
const cantidadMonedaUno = document.getElementById("cantidad-uno");
const cantidadMonedaDos = document.getElementById("cantidad-dos");
const boton = document.getElementById("boton");
const cambio = document.getElementById("cambio");

const apiKey = "6283050f872c55e2dbc48f74";

// Esta función obtiene las tasas de cambio de la API y las muestra
function calcular() {
  const monedaUno = seleccionMonedaUno.value;
  const monedaDos = seleccionMonedaDos.value;

  // Construimos la URL de la API para obtener las tasas de cambio
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaUno}`;

  // Realizamos la solicitud de la tasa de cambio
  fetch(apiUrl)
    .then((res) => res.json())  // Convertimos la respuesta a JSON
    .then((data) => {
      // Verificamos si la API tiene las tasas
      if (data.result === "success" && data.conversion_rates[monedaDos]) {
        const tasa = data.conversion_rates[monedaDos];
        cambio.innerText = `1 ${monedaUno} = ${tasa} ${monedaDos}`;
        cantidadMonedaDos.value = (cantidadMonedaUno.value * tasa).toFixed(2);
      } else {
        cambio.innerText = "Error: No se pudo obtener la tasa de cambio.";
      }
    })
    .catch((error) => {
      console.error("Error al obtener las tasas de cambio:", error);
      cambio.innerText = "Error al obtener las tasas de cambio.";
    });
}

// Esta función actualiza las banderas de acuerdo a la moneda seleccionada
function actualizarBanderas() {
  const banderaUno = seleccionMonedaUno.options[seleccionMonedaUno.selectedIndex].dataset.flag;
  seleccionMonedaUno.style.backgroundImage = `url(${banderaUno})`;

  const banderaDos = seleccionMonedaDos.options[seleccionMonedaDos.selectedIndex].dataset.flag;
  seleccionMonedaDos.style.backgroundImage = `url(${banderaDos})`;
}

// Llamar a calcular y actualizarBanderas cuando se carga la página
calcular();
actualizarBanderas();

// Evento cuando cambian las monedas seleccionadas
seleccionMonedaUno.addEventListener("change", () => {
  calcular();
  actualizarBanderas();
});

seleccionMonedaDos.addEventListener("change", () => {
  calcular();
  actualizarBanderas();
});

// Evento cuando se cambia la cantidad de la primera moneda
cantidadMonedaUno.addEventListener("input", calcular);

// Evento cuando se hace clic en el botón de intercambio
boton.addEventListener("click", () => {
  const temporal = seleccionMonedaUno.value;
  seleccionMonedaUno.value = seleccionMonedaDos.value;
  seleccionMonedaDos.value = temporal;

  // Llamar a las funciones de cálculo y actualización de banderas
  calcular();
  actualizarBanderas();
});

// Modo oscuro
document.getElementById("input").addEventListener("change", () => {
  if (document.body.className.indexOf("dark") === -1) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});