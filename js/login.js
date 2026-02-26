if(!localStorage.getItem("usuarios")){
    localStorage.setItem("usuarios", JSON.stringify([
        {user:"admin", pass:"admin", rol:"admin"}
    ]));
}
function login(){

 let user = document.getElementById("user").value.trim().toLowerCase();
 let pass = document.getElementById("pass").value.trim();

 let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

 let encontrado = usuarios.find(u =>
  u.user.toLowerCase() === user && u.pass === pass
 );

 if(!encontrado){
  document.getElementById("error").textContent="Datos incorrectos";
  return;
 }

 localStorage.setItem("logueado","true");
 localStorage.setItem("rol", encontrado.rol);
 localStorage.setItem("usuario", encontrado.user);

 location.href="dashboard.html";
}
