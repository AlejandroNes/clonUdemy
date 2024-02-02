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
    console.log("agregando");
  }
}
