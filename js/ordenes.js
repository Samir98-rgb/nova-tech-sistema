if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];

function guardar(){
 localStorage.setItem("ordenes", JSON.stringify(ordenes));
}

function numeroOrden(){
 let n = localStorage.getItem("numOrden") || 1;
 localStorage.setItem("numOrden", Number(n)+1);
 return "ORD-"+String(n).padStart(4,"0");
}

function cargarEquipos(){
 let select = document.getElementById("equipoOrden");
 select.innerHTML="<option value=''>Seleccionar equipo</option>";

 equipos.forEach(e=>{
  let cliente = clientes.find(c=>c.id===e.clienteId);
  select.innerHTML+=`
   <option value="${e.id}">
   ${e.tipo} ${e.marca} — ${cliente?.nombre || "Sin cliente"}
   </option>
  `;
 });
}

function crearOrden(){

 let equipoId = document.getElementById("equipoOrden").value;
 let problema = val("problemaOrden");
 let diagnostico = val("diagnosticoOrden");
 let costo = val("costoOrden");

 if(!equipoId || !problema){
  alert("Equipo y problema obligatorios");
  return;
 }

 let equipo = equipos.find(e=>e.id==equipoId);
 let cliente = clientes.find(c=>c.id===equipo.clienteId);

 ordenes.push({
  id:Date.now(),
  numero:numeroOrden(),
  cliente:cliente?.nombre || "Sin cliente",
  equipo:`${equipo.tipo} ${equipo.marca}`,
  problema,
  diagnostico,
  costo:costo || 0,
  estado:"Pendiente",
  fecha:new Date().toLocaleDateString()
 });

 guardar();
 limpiar();
 mostrar();
}

function mostrar(){

 let cont=document.getElementById("listaOrdenes");
 let vacio=document.getElementById("vacioOrden");

 cont.innerHTML="";

 if(ordenes.length===0){
  vacio.style.display="block";
  return;
 }else{
  vacio.style.display="none";
 }

 ordenes.forEach(o=>{

 let clase="pendiente";
 if(o.estado==="En proceso") clase="proceso";
 if(o.estado==="Terminado") clase="terminado";

 cont.innerHTML+=`
 <div class="card">
  <h3>${o.numero}</h3>
  <p><b>Cliente:</b> ${o.cliente}</p>
  <p><b>Equipo:</b> ${o.equipo}</p>
  <p><b>Problema:</b> ${o.problema}</p>
  <p><b>Diagnóstico:</b> ${o.diagnostico||"-"}</p>
  <p><b>Costo:</b> $${o.costo}</p>
  <p><span class="estado ${clase}">${o.estado}</span></p>
  <p><b>Fecha:</b> ${o.fecha}</p>

  <button onclick="cambiarEstado(${o.id})">Cambiar Estado</button>
  <button class="danger" onclick="eliminar(${o.id})">Eliminar</button>
 </div>
 `;
 });
}

function cambiarEstado(id){

 let estado = prompt("Nuevo estado:\nPendiente\nEn proceso\nTerminado");

 if(!estado) return;

 ordenes = ordenes.map(o=>{
  if(o.id===id) o.estado=estado;
  return o;
 });

 guardar();
 mostrar();
}

function eliminar(id){
 if(!confirm("Eliminar orden?")) return;
 ordenes = ordenes.filter(o=>o.id!==id);
 guardar();
 mostrar();
}

function val(id){
 return document.getElementById(id).value.trim();
}

function limpiar(){
 document.querySelectorAll("input").forEach(i=>i.value="");
}

cargarEquipos();
mostrar();
