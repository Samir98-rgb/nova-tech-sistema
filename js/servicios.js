if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

function renderServicios(filtro="Todos"){
  const lista = document.getElementById("listaServicios");
  lista.innerHTML = "";

  let filtrados = servicios;

  if(!localStorage.getItem("usuarios")){
 localStorage.setItem("usuarios", JSON.stringify([
  {user:"admin", pass:"1234", rol:"admin"},
  {user:"tecnico", pass:"1234", rol:"tecnico"}
 ]));
}


  if(filtro !== "Todos"){
    filtrados = servicios.filter(s => s.tipo === filtro);
  }

  filtrados.forEach((s,i)=>{
    lista.innerHTML += `
      <tr>
        <td>${s.nombre}</td>
        <td>${s.tipo}</td>
        <td>$${s.precio}</td>
        <td>
          <button class="btn editar" onclick="editar(${i})">Editar</button>
          <button class="btn eliminar" onclick="eliminar(${i})">X</button>
        </td>
      </tr>
    `;
  });
}

function filtrarServicios(){
  const tipo = document.getElementById("filtroEquipo").value;
  renderServicios(tipo);
}


function guardarServicio(nombre,tipo,precio){
  servicios.push({nombre,tipo,precio});
  localStorage.setItem("servicios",JSON.stringify(servicios));
  renderServicios();
}

function eliminar(i){
  servicios.splice(i,1);
  localStorage.setItem("servicios",JSON.stringify(servicios));
  renderServicios();
}

renderServicios();


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
renderServicios();