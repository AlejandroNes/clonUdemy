//variables & constantes
const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let arrayCursos = [];

//eventos
(() => {
  listaCursos.addEventListener("click", agregarCurso);
})();

//funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    addCurso(curso);
  }
}

/* Mostrar en el HTML */
function addCurso(curso) {
  const objCurso = {
    idCurso: curso.querySelector("a").getAttribute("data-id"),
    nombre: curso.querySelector(".info-card h4").textContent,
    imagen: curso.querySelector(".imagen-curso").src,
    precio: Number(
      curso.querySelector(".precio span").textContent.substring(1, 5)
    ),
    cantidad: 1,
  };

  arrayCursos = [...arrayCursos, objCurso];
  mostrarCarrito();
}

function mostrarCarrito() {
  limpiarCarrito();
  arrayCursos.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td><img src="${item.imagen}" width='80px'></td>
          <td>${item.nombre}</td>
          <td>${item.precio}</td>
          <td>${item.cantidad}</td>
          <td><a class="borrar-curso" src="#" data-id="${item.idCurso}" >x</a></td>
    `;
    listaCarrito.appendChild(row);
  });
}
/* Limpiar carrito */
function limpiarCarrito() {
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}
