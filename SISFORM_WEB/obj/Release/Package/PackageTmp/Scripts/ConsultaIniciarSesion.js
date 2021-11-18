window.onload = function () {
    window.sessionStorage.setItem("urlBase", hdfRaiz.value);

    iniciarSesion.onclick = function () {
        progressLogin.style.width = "20%";
        Http.get("IniciarSesion/AutenticarUsuario?usuario=" + username.value + "&clave=" + password.value, Autenticar);
        setTimeout('', 1500);
        progressLogin.style.width = "40%";
    }
}

function logear(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        progressLogin.style.width = "20%";
        Http.get("IniciarSesion/AutenticarUsuario?usuario=" + username.value + "&clave=" + password.value, Autenticar);
        setTimeout('',1500);
        progressLogin.style.width = "40%";
    }
}

function Autenticar(rpta) {
    if (rpta) {
        progressLogin.style.width = "70%";
        var obj = JSON.parse(rpta)
        window.sessionStorage.setItem("idUsuario", obj.ID_Usuario);
        window.sessionStorage.setItem("Nombre", obj.Nombre);
        window.sessionStorage.setItem("FK_ID_UnidadGestion", obj.FK_ID_UnidadGestion);
        progressLogin.style.width = "100%";
        navegar("Home/Inicio");
    } else {
        toastDangerAlert("Usuario o contraseña incorrecto", "!Error¡");
        progressLogin.style.width = "0%";
    }
}