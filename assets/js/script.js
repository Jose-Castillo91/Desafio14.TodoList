const input = document.querySelector("#inputNuevaTarea");
const botonAgregarTarea = document.querySelector("#buttonAgregarTarea");
const contadorTareas = document.querySelector("#contadorTotalTareas");
const contadorTareasRealizadas = document.querySelector(
  "#contadorTareasRealizadas"
);
const idTareas = document.querySelector("#idTareas");
const listaTareas = document.querySelector("#listaTareas");
const checkboxes = document.querySelectorAll(".checkboxTarea");
const tareas = [{ id: 123, nombre: "Cocinar" },
  {id: 122, nombre: "Hacer ejercicio"},
  {id: 121, nombre: "Estudiar JS"},
];

function renderTareas(tareas) {
  let html = "";
  for (tarea of tareas) {
    html += `<tr>
    <td>${tarea.id}</td> 
    <td>
      ${tarea.nombre} 
      <input type="checkbox" class="checkboxTarea" data-id="${tarea.id}" onchange="actualizarContadorRealizadas()">
      <button onclick="borrarTarea(${tarea.id})" class="botonborrar">❌</button>
    </td>
  </tr>`;
  }
  idTareas.innerHTML = html;
  contadorTareas.innerHTML = tareas.length;
}

botonAgregarTarea.addEventListener("click", () => {
  const textoInput = input.value;
  const idCorto = Date.now() % 1000;
  tareas.push({ id: idCorto, nombre: textoInput });
  input.value = "";
  renderTareas(tareas);
});

function borrarTarea(id) {
  const index = tareas.findIndex((x) => x.id === id);
  const checkbox = document.querySelector(`input[data-id="${id}"]`);
  if (checkbox && checkbox.checked) {
    const realizadasActuales =
      parseInt(contadorTareasRealizadas.innerHTML) || 0;
    contadorTareasRealizadas.innerHTML = Math.max(realizadasActuales - 1, 0); 
  }

  tareas.splice(index, 1);
  renderTareas(tareas);
  actualizarContadorRealizadas();
}

function actualizarContadorRealizadas() {
  const checkboxes = document.querySelectorAll(".checkboxTarea");
  const tareasRealizadas = [...checkboxes].filter(
    (checkbox) => checkbox.checked
  ).length;
  contadorTareasRealizadas.innerHTML = tareasRealizadas;
}

renderTareas(tareas);
