window.addEventListener("DOMContentLoaded",()=>{

 if(localStorage.getItem("rol")!=="admin"){
  let btn=document.querySelector('[onclick="abrirAdmin()"]');
  if(btn){
   btn.style.display="none";
  }
 }

});


if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}


let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
let rol = localStorage.getItem("rol");

if(rol==="tecnico"){
 document.getElementById("btnUsuarios").style.display="none";
 document.getElementById("btnServicios").style.display="none";
}


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

function logout(){
 localStorage.clear();
 location.href="index.html";
}

function mostrarCrearUsuario(){
 document.getElementById("panelUsuario").style.display="flex";
}

function cerrarPanel(){
 document.getElementById("panelUsuario").style.display="none";
}

function crearUsuario(){

 let user = document.getElementById("nuevoUser").value.trim();
 let pass = document.getElementById("nuevoPass").value.trim();
 let rol = document.getElementById("nuevoRol").value;

 if(!user || !pass){
  alert("Completar datos");
  return;
 }

 let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

 if(usuarios.find(u=>u.user===user)){
  alert("Usuario ya existe");
  return;
 }

 usuarios.push({user,pass,rol});
 localStorage.setItem("usuarios", JSON.stringify(usuarios));

 alert("Usuario creado");
 cerrarPanel();
}

// seguridad admin
if(localStorage.getItem("rol") !== "admin"){
 let btn=document.querySelector('[onclick="abrirAdmin()"]');
 if(btn) btn.style.display="none";
}

function abrirAdmin(){
 document.getElementById("adminPanel").style.display="flex";
 cargarUsuarios();
}

function cerrarAdmin(){
 document.getElementById("adminPanel").style.display="none";
}

function crearUsuarioAdmin(){

 let user = document.getElementById("adminUser").value.trim();
 let pass = document.getElementById("adminPass").value.trim();
 let rol = document.getElementById("adminRol").value;

 if(!user || !pass){
  alert("Completar datos");
  return;
 }

 let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

 if(usuarios.find(u=>u.user===user)){
  alert("Usuario ya existe");
  return;
 }

 usuarios.push({user,pass,rol});
 localStorage.setItem("usuarios", JSON.stringify(usuarios));

 cargarUsuarios();
}

function cargarUsuarios(){

 let cont = document.getElementById("listaUsuarios");
 cont.innerHTML="";

 let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

 usuarios.forEach(u=>{
  cont.innerHTML += `
  <div class="usuario-card">
  <strong>${u.user}</strong><br>
  Rol: ${u.rol}<br><br>

  <button onclick="cambiarRol('${u.user}')">Rol</button>
  <button onclick="resetPass('${u.user}')">Reset Pass</button>
  <button onclick="eliminarUser('${u.user}')" class="danger">Eliminar</button>
  </div>
  `;
 });
}

function cambiarRol(user){

 let usuarios = JSON.parse(localStorage.getItem("usuarios"));
 let nuevo = prompt("Nuevo rol (admin/tecnico)");

 if(!nuevo) return;

 usuarios = usuarios.map(u=>{
  if(u.user===user) u.rol=nuevo;
  return u;
 });

 localStorage.setItem("usuarios", JSON.stringify(usuarios));
 cargarUsuarios();
}

function resetPass(user){

 let nueva = prompt("Nueva contraseña");
 if(!nueva) return;

 let usuarios = JSON.parse(localStorage.getItem("usuarios"));

 usuarios = usuarios.map(u=>{
  if(u.user===user) u.pass=nueva;
  return u;
 });

 localStorage.setItem("usuarios", JSON.stringify(usuarios));
 alert("Contraseña actualizada");
}

function eliminarUser(user){

 if(!confirm("Eliminar usuario?")) return;

 let usuarios = JSON.parse(localStorage.getItem("usuarios"));

 usuarios = usuarios.filter(u=>u.user!==user);

 localStorage.setItem("usuarios", JSON.stringify(usuarios));
 cargarUsuarios();
}

function abrirAdmin(){
 let panel=document.getElementById("adminPanel");
 if(panel){
  panel.style.display="flex";
  cargarUsuarios();
 }
}

function cerrarAdmin(){
 let panel=document.getElementById("adminPanel");
 if(panel){
  panel.style.display="none";
 }
}

function logout(){
 localStorage.clear();
 location.href="index.html";
}
