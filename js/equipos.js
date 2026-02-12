if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

function guardar(){
 localStorage.setItem("equipos", JSON.stringify(equipos));
}

function cargarClientes(){
 let select = document.getElementById("clienteEquipo");
 select.innerHTML="<option value=''>Seleccionar cliente</option>";

 clientes.forEach(c=>{
  select.innerHTML+=`<option value="${c.id}">${c.nombre}</option>`;
 });
}

function agregarEquipo(){

 let clienteId = document.getElementById("clienteEquipo").value;
 let tipo = val("tipoEquipo");
 let marca = val("marcaEquipo");
 let modelo = val("modeloEquipo");
 let serie = val("serieEquipo");
 let falla = val("fallaEquipo");

 if(!clienteId || !tipo){
  alert("Cliente y tipo obligatorios");
  return;
 }

 equipos.push({
  id:Date.now(),
  clienteId:Number(clienteId),
  tipo,marca,modelo,serie,falla
 });

 guardar();
 limpiar();
 mostrar();
}

function mostrar(){

 let cont = document.getElementById("listaEquipos");
 let vacio = document.getElementById("vacio");

 cont.innerHTML="";

 if(equipos.length===0){
  vacio.style.display="block";
  return;
 }else{
  vacio.style.display="none";
 }

 equipos.forEach(e=>{

  let cliente = clientes.find(c=>c.id===e.clienteId);

  cont.innerHTML+=`
   <div class="card">
    <h3>${e.tipo} ${e.marca}</h3>
    <p><b>Modelo:</b> ${e.modelo || "-"}</p>
    <p><b>Serie:</b> ${e.serie || "-"}</p>
    <p><b>Cliente:</b> ${cliente?.nombre || "Eliminado"}</p>
    <p><b>Falla:</b> ${e.falla || "-"}</p>

    <button onclick="eliminar(${e.id})">Eliminar</button>
   </div>
  `;
 });
}

function eliminar(id){
 if(!confirm("Eliminar equipo?")) return;
 equipos = equipos.filter(e=>e.id!==id);
 guardar();
 mostrar();
}

function val(id){
 return document.getElementById(id).value.trim();
}

function limpiar(){
 document.querySelectorAll("input").forEach(i=>i.value="");
}

cargarClientes();
mostrar();

