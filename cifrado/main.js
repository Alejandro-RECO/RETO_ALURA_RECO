let llaves ={
    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat"
};
function encriptar(texto){
    return texto.remplace(/[aeiou]/g, function(match){
        return llaves[match];
    });
}
function textEncriptado(texto){
    var reemplazos = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    for (var busqueda in reemplazos) {
        texto = texto.replace(new RegExp(busqueda, "g"), reemplazos[busqueda]);
    }

    return texto;
}

function letrasEnLlaves(palabra){
    for(let letra in llaves){
        if(palabra.includes(letra)){
            return true;
        }
    }
    return false;
}
function ejecutar(){
    let entrada = document.getElementById("textPrincipal");
    let salida = document.getElementById("textEncriptado");
    let texto = entrada.value;

    if(texto.trim() === ""){
        MoNotificacion("No se detectan parametros a encriptar");
        return;
    }
    let resultado = encriptar(texto);
    salida.value = resultado;
    MoNotificacion("Texto encriptado efectivamente")
}

function ejecutarDesencriptado(){
    let entrada = document.getElementById("textPrincipal");
    let salida = document.getElementById("textEncriptado");
    let texto = entrada.value;

    if(texto.trim() === ""){
        MoNotificacion("No se detectan parametros a encriptar")
        return;
    }
    let resultado = desencriptar(texto);
    salida.value = resultado;
    MoNotificacion ("Texto desencriptado efectivamente")
}

function copyText(){
    let texto = document.getElementById("textEncriptado").value.trim();
    if(!texto){
        nadaQueCopiar();
        return;
    }
    copiarAlportapapeles();
}
function copyPorPapel(){
    let texto = document.getElementById("textEncriptado").value;

    if(texto.trim() === ""){
        return;
    }

    navigator.clipboard.writeText(texto)
    .then(()=>{
        MoNotificacion("Texto copiado al porta papeles");
    })
    .catch((error)=> {
        console.error("Error al copiar el texto: ", error);
    });
}

const pegar = document.getElementById("pegar");
pegar.addEventListener("click", function(event){
    event.preventDefault();
    navigator.clipboard.readText()
    .then((texto)=>{
        document.getElementById("texPrincipal").value = texto;
        mosOculDiv();
        MoNotificacion("Texto pegado correctamente");
    })
    .catch((error)=>{
        MoNotificacion("Error al pegar texto: " + error);
    });
})
function brTextareados(){
    let salida = document.getElementById("textEncriptado");
    let texto = salida.value.trim();

    if(texto === ""){
        MoNotificacion("Sin parametros para restablecer");
        return;
    }
    salida.value = "";
    MoNotificacion("Parametrso reestablecidos");
}
function mosOculDiv(){
    setTimeout(()=>{
        let texto = document.getElementById("texPrincipal").value;
        let divPasivo = document.getElementById("activo");
        let divActivo = document.getElementById("pasivo");
        let textEncriptado = document.getElementById("textEncriptado");

        if(texto == ""){
            divPasivo.style.display = "block";
            divActivo.style.display = "none";
        }else{
            divPasivo.style.display = "none";
            divActivo.style.display = "block";

            textEncriptado.value = texto;
        }
    }, 0);
}

let timeId = null;
let intervalId = null;


function MoNotificacion(mensajeTexto){
    mensaje.innerText = mensajeTexto;
    notification.classList.add("show");
    clearTimeout(timeId);
    clearInterval(intervalId);
    timeId = setTimeout(function(){
        notification.classList.remove("show");
    }, 3000);
    
    let progress = document.querySelector("#notificación progress");
    progress.max = 3000;
    progress.value = 3000;

    intervalId = setInterval (function(){
        progress.value -= 10;

        if(progress.value === 0 ){
            clearInterval(intervalId);
        }
    }, 10);
}

const notificacion = document.getElementById("notificacion");
const mensaje = document.querySelector(".mensaje"); 
const cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", function(event) {
  event.preventDefault();
  notificacion.classList.remove("show");
  clearTimeout(timerId);
  clearInterval(intervalId);
});