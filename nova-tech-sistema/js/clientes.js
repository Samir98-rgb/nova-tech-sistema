let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function guardar(){
 localStorage.setItem("clientes", JSON.stringify(clientes));
}

function agregarCliente(){

 let nombre = val("nombre");
 let telefono = val("telefono");
 let email = val("email");
 let direccion = val("direccion");

 if(!nombre) return alert("Nombre obligatorio");

 clientes.push({
  id:Date.now(),
  nombre,telefono,email,direccion
 });

 guardar();
 limpiar();
 mostrar();
}

function mostrar(){

 let lista = document.getElementById("listaClientes");
 let vacio = document.getElementById("vacio");

 lista.innerHTML="";

 if(clientes.length===0){
  vacio.style.display="block";
  return;
 }else{
  vacio.style.display="none";
 }

 clientes.forEach(c=>{
  lista.innerHTML+=`
  <tr>
   <td>${c.nombre}</td>
   <td>${c.telefono}</td>
   <td>${c.email}</td>
   <td>${c.direccion}</td>
   <td>
     <button class="delete" onclick="eliminar(${c.id})">Eliminar</button>
   </td>
  </tr>`;
 });
}

function eliminar(id){
 if(!confirm("Eliminar cliente?")) return;
 clientes = clientes.filter(c=>c.id!==id);
 guardar();
 mostrar();
}

function buscarCliente(){
 let texto = document.getElementById("buscar").value.toLowerCase();

 let filtrados = clientes.filter(c=>
  c.nombre.toLowerCase().includes(texto) ||
  c.telefono.includes(texto) ||
  c.email.toLowerCase().includes(texto)
 );

 let lista = document.getElementById("listaClientes");
 lista.innerHTML="";

 filtrados.forEach(c=>{
  lista.innerHTML+=`
  <tr>
   <td>${c.nombre}</td>
   <td>${c.telefono}</td>
   <td>${c.email}</td>
   <td>${c.direccion}</td>
   <td>
     <button class="delete" onclick="eliminar(${c.id})">Eliminar</button>
   </td>
  </tr>`;
 });
}

function val(id){
 return document.getElementById(id).value.trim();
}

function limpiar(){
 document.querySelectorAll(".form-box input").forEach(i=>i.value="");
}

mostrar();
