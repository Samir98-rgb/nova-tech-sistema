if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

function guardarDB(){
 localStorage.setItem("servicios", JSON.stringify(servicios));
}

function guardarServicio(){

 let nombre = val("nombreServicio");
 let precio = val("precioServicio");
 let tipo = val("tipoEquipo");

 if(!nombre || !precio || !tipo){
  alert("Completar todos los campos");
  return;
 }

 servicios.push({
  id:Date.now(),
  nombre,
  precio:Number(precio),
  tipo
 });

 guardarDB();
 limpiar();
 mostrarServicios();
}

function mostrarServicios(){

 let cont = document.getElementById("listaServicios");
 let vacio = document.getElementById("vacioServicios");
 let filtro = document.getElementById("buscarServicio").value.toLowerCase();

 cont.innerHTML="";

 let filtrados = servicios.filter(s=>
  s.nombre.toLowerCase().includes(filtro) ||
  s.tipo.toLowerCase().includes(filtro)
 );

 if(filtrados.length===0){
  vacio.style.display="block";
  return;
 } else{
  vacio.style.display="none";
 }

 cont.innerHTML=`
 <table class="tabla">
 <tr>
 <th>Servicio</th>
 <th>Tipo equipo</th>
 <th>Precio</th>
 <th>Acciones</th>
 </tr>
 `;

 filtrados.forEach(s=>{
  cont.innerHTML+=`
  <tr>
  <td>${s.nombre}</td>
  <td>${s.tipo}</td>
  <td>$${s.precio}</td>
  <td class="acciones">
   <button onclick="editar(${s.id})">Editar</button>
   <button class="danger" onclick="eliminar(${s.id})">X</button>
  </td>
  </tr>
  `;
 });

 cont.innerHTML+="</table>";
}

function editar(id){

 let serv = servicios.find(s=>s.id===id);

 let nombre = prompt("Nombre", serv.nombre);
 if(!nombre) return;

 let precio = prompt("Precio", serv.precio);

 serv.nombre=nombre;
 serv.precio=Number(precio);

 guardarDB();
 mostrarServicios();
}

function eliminar(id){
 if(!confirm("Eliminar servicio?")) return;

 servicios = servicios.filter(s=>s.id!==id);
 guardarDB();
 mostrarServicios();
}

function val(id){
 return document.getElementById(id).value.trim();
}

function limpiar(){
 document.querySelectorAll("input").forEach(i=>i.value="");
}

mostrarServicios();
