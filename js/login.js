function hacerLogin(){

 let u = document.getElementById("user").value;
 let p = document.getElementById("pass").value;

 if(u==="admin" && p==="novatech"){
  localStorage.setItem("logueado","true");
  window.location.href="dashboard.html";
 }else{
  document.getElementById("error").innerText="Usuario o contraseña incorrectos";
 }
}
