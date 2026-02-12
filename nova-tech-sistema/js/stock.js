if(localStorage.getItem("logueado")!=="true"){
 location.href="index.html";
}

let stock = JSON.parse(localStorage.getItem("stock")) || [];

function guardarDB(){
 localStorage.setItem("stock", JSON.stringify(stock));
}

function guardarProducto(){

 let nombre = val("nombre");
 let codigo = val("codigo");
 let cantidad = val("cantidad");
 let precio = val("precio");

 if(!nombre || !cantidad){
  alert("Nombre y cantidad obligatorios");
  return;
 }

 stock.push({
  id:Date.now(),
  nombre,
  codigo,
  cantidad:Number(cantidad),
  precio:Number(precio)
 });

 guardarDB();
 limpiar();
 mostrarStock();
}

function mostrarStock(){

 let cont = document.getElementById("listaStock");
 let vacio = document.getElementById("vacioStock");
 let filtro = document.getElementById("buscador").value.toLowerCase();

 cont.innerHTML="";

 let filtrados = stock.filter(p=>p.nombre.toLowerCase().includes(filtro));

 if(filtrados.length===0){
  vacio.style.display="block";
  return;
 }else{
  vacio.style.display="none";
 }

 cont.innerHTML=`
 <table class="tabla">
 <tr>
 <th>Producto</th>
 <th>Código</th>
 <th>Cantidad</th>
 <th>Precio</th>
 <th>Acciones</th>
 </tr>
 `;

 filtrados.forEach(p=>{

 let alerta = p.cantidad<5 ? "bajo" : "";

 cont.innerHTML+=`
 <tr class="${alerta}">
 <td>${p.nombre}</td>
 <td>${p.codigo||"-"}</td>
 <td>${p.cantidad}</td>
 <td>$${p.precio}</td>
 <td class="acciones">
  <button onclick="editar(${p.id})">Editar</button>
  <button onclick="sumar(${p.id})">+</button>
  <button onclick="restar(${p.id})">−</button>
  <button class="danger" onclick="eliminar(${p.id})">X</button>
 </td>
 </tr>
 `;
 });

 cont.innerHTML+="</table>";
}

function editar(id){

 let prod = stock.find(p=>p.id===id);

 let nombre = prompt("Nombre", prod.nombre);
 if(!nombre) return;

 let precio = prompt("Precio", prod.precio);

 prod.nombre=nombre;
 prod.precio=Number(precio);

 guardarDB();
 mostrarStock();
}

function sumar(id){
 stock = stock.map(p=>{
  if(p.id===id) p.cantidad++;
  return p;
 });
 guardarDB();
 mostrarStock();
}

function restar(id){
 stock = stock.map(p=>{
  if(p.id===id && p.cantidad>0) p.cantidad--;
  return p;
 });
 guardarDB();
 mostrarStock();
}

function eliminar(id){
 if(!confirm("Eliminar producto?")) return;
 stock = stock.filter(p=>p.id!==id);
 guardarDB();
 mostrarStock();
}

function val(id){
 return document.getElementById(id).value.trim();
}

function limpiar(){
 document.querySelectorAll("input").forEach(i=>i.value="");
}

mostrarStock();
