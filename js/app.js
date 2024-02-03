//variables & constantes
const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const pagoTotal = document.querySelector("#pago-total");
let arrayCursos = [];

//eventos
(() => {
  listaCursos.addEventListener("click", agregarCurso);
  //eliminar curso
  listaCarrito.addEventListener("click", eliminarCurso);
  vaciarCarrito.addEventListener("click", () => {
    arrayCursos = [];
    mostrarCarrito();
  });
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

  //comprobar si hay cursos duplicados
  const verificarCurso = arrayCursos.some(
    (item) => item.idCurso === objCurso.idCurso
  );

  if (verificarCurso) {
    //aumentar cantidad de un curso
    const arrayActualizado = arrayCursos.map((item) => {
      if (item.idCurso === objCurso.idCurso) {
        item.cantidad++;
        item.precio += objCurso.precio;
        return item;
      } else {
        return item;
      }
    });
    arrayCursos = [...arrayActualizado];
    mostrarCarrito();
  } else {
    //agregar nuevo curso al carrito
    arrayCursos = [...arrayCursos, objCurso];
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  limpiarCarrito();
  totalAPagar();
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

//pago total
function totalAPagar() {
  const totalPago = arrayCursos.reduce((acumulador, item) => {
    return acumulador + item.precio;
  }, 0);
  pagoTotal.textContent = totalPago;
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const idCursoEliminado = e.target.getAttribute("data-id");

    //verificar si tiene mas items de compra un curso
    const curso = arrayCursos.find((item) => item.idCurso === idCursoEliminado);
    const precioCurso = curso.precio / curso.cantidad;

    if (curso.cantidad > 1) {
      const arrayActualizado = arrayCursos.map((item) => {
        if (item.idCurso === idCursoEliminado) {
          item.cantidad--;
          item.precio -= precioCurso;
          return item;
        } else {
          return item;
        }
      });
      arrayCursos = [...arrayActualizado];
      mostrarCarrito();
    } else {
      const arrayActualizado = arrayCursos.filter(
        (item) => item.idCurso !== idCursoEliminado
      );
      arrayCursos = [...arrayActualizado];
      mostrarCarrito();
    }
  }
}
