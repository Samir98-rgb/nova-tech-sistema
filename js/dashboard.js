// PROTECCIÓN: si no está logueado, vuelve al login

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

function guardarTodo(){
 localStorage.setItem("clientes", JSON.stringify(clientes));
 localStorage.setItem("equipos", JSON.stringify(equipos));
 localStorage.setItem("ordenes", JSON.stringify(ordenes));
}


if (localStorage.getItem("logueado") !== "true") {
  window.location.href = "index.html";
}

function irClientes() {
 window.location.href = "clientes.html";
}

function irEquipos() {
  window.location.href = "equipos.html";
}

function irOrdenes() {
window.location.href = "ordenes.html";
}

function irStock() {
window.location.href = "stock.html";
}

function irServicios() {
window.location.href = "servicios.html";
}

function cerrarSesion() {
  localStorage.removeItem("logueado");
  window.location.href = "index.html";
}
