var lstZona;
var idZona;
var lstUbicacion;
var lstCboEmpresa;
var fechaActual;
var IdTrabajador;
var lstCboTipoProgrInci;
var idIncidenciaTemp;
var idCategoria;
var lstCboCategoria;
var idBloque;
var lstCboBloque;
var lsEspecificacion;
var lstCboEspecificacion;
var lstCboTipoEvento;
var lstCboBarrera;
var lstCboRangoCumplimiento;
var idIncidencia;
var idBarrera;
var lstCboTipoBarrera;
var lstCboEmpresaIncidente;
var lstCboTipoEmpresa;
var idTipoEmpresa;
var imagB64;

window.onload = function () {
    if (!isMobile.any()) {
        //Llenar Combo Zona
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);
    Http.get("Empresa/ListarTipoEmpresaCbo", mostrarTipoEmpresaCbo);
    Http.get("Incidencia/ListarTipoProgramacionIncidenciaCsv", mostrarTipoProgrInciCbo);
    Http.get("Incidencia/ListarZonaCbo", mostrarZonaCbo);
    Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);
    Http.get("Incidencia/ListarIncidenciasActCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoEventoCsv", mostrarTipoEventoCbo);
    Http.get("Incidencia/ListarCategoriaCsv", mostrarCategoriaCbo);
    Http.get("Incidencia/ListarBarreraCsv", mostrarBarreraCbo);
    obtenerfechaActual();

    txtFechaIncidencia.value = fechaActual;
    //Grabar Registro cabecera de la incidencia

    btnGrabarIncidencia.onclick = function () {
        var frm = new FormData();
        frm.append("fechaHecho", txtFechaIncidencia.value);
        frm.append("FK_ID_EmpresaInfractora", cboEmpresaIncidente.value);
        frm.append("FK_ID_Zona", cboZona.value);
        frm.append("FK_ID_Ubicacion", cboUbicacion.value);
        frm.append("FK_ID_TrabajadorReporta", IdTrabajador);
        frm.append("FK_ID_TipoProgramacionIncidencia", cboTipoProgInci.value);
        frm.append("fechaLimiteSolucion", txtFechaIncidencia.value);

        if (validarRequeridos('E')) {
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarCabecera, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");

    }
    btnRegDeta.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidencia);
        frm.append("FK_ID_TipoEvento", cboTipoEvento.value);
        frm.append("FK_ID_Categoria", cboCategoria.value);
        frm.append("FK_ID_Bloque", cboBloque.value);
        frm.append("FK_ID_Especificacion", cboEspecificacion.value);
        frm.append("FK_ID_EmpresaInvolucrada", cboEmpresaInvolucrada.value);
        frm.append("detalleHecho", txtDetalles.value);

        if (validarRequeridos('DE')) {
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarTipoEvento, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    btnBarrera.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidencia);
        frm.append("FK_ID_Barrera", cboBarrera.value);
        frm.append("FK_ID_TipoBarrera", cboTipoBarrera.value);
        frm.append("detalleBarrera", txtBarrera.value);

        if (validarRequeridos('DB')) {
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarBarrera, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnImagenIndicencia.onclick = function () {
        var frm = new FormData();
        frm.append("FK_ID_Incidencia", idIncidencia);
        frm.append("imagen", imagB64);
        frm.append("FK_ID_TipoImagen", 1);
        frm.append("FK_ID_SolucionIncidencia", 0);
        if (validarRequeridos('E')) {
            Http.post("Incidencia/IncidenciaImagen", MostrarIncidenciaImagen, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    //Llenar Combo Ubicación
    cboZona.onchange = function () {
        idZona = cboZona.value;
        listarUbicacionCbo();
    }
    cboCategoria.onchange = function () {
        idCategoria = cboCategoria.value;
        listarBloqueCbo();
    }
    cboBloque.onchange = function () {
        idBloque = cboBloque.value;
        listarEspecificacionCbo();
    }
    cboBarrera.onchange = function () {
        idBarrera = cboBarrera.value;
        listarTipoBarreraCbo();
    }
    cboTipoEmpresa.onchange = function () {
        idTipoEmpresa = cboTipoEmpresa.value;
        listarEmpresaPorTipoCbo();
        
    }


}
function mostrarZonaCbo(rpta) {
    if (rpta) {
        lstZona = rpta.split("¬");
        CrearCombo(lstZona, cboZona, "Seleccione");
    }
}
function listarUbicacionCbo() {
    Http.get("Incidencia/ListarUbicacionCbo?idZona=" + idZona, mostrarUbicacionCbo);
}
function mostrarUbicacionCbo(rpta) {
    if (rpta) {
        lstUbicacion = rpta.split("¬");
        CrearCombo(lstUbicacion, cboUbicacion, "Seleccione");
    }
}
function listarBloqueCbo() {
    Http.get("Incidencia/ListarBloqueCsv?idCategoria=" + idCategoria, mostrarBloqueCbo);
}
function mostrarBloqueCbo(rpta) {
    if (rpta) {
        lstCboCategoria = rpta.split("¬");
        CrearCombo(lstCboCategoria, cboBloque, "Seleccione");
    }
}
function listarEspecificacionCbo() {
    Http.get("Incidencia/ListarEspecificacionCsv?idCategoria=" + idCategoria + "&idBloque=" + idBloque, mostrarEspecificacionCbo);
}
function mostrarEspecificacionCbo(rpta) {
    if (rpta) {
        lstCboEspecificacion = rpta.split("¬");
        CrearCombo(lstCboEspecificacion, cboEspecificacion, "Seleccione");
    }
}
function listarTipoBarreraCbo() {
    Http.get("Incidencia/ListarTipoBarreraCsv?idBarrera=" + idBarrera, mostrarTipoBarreraCbo);
}
function mostrarTipoBarreraCbo(rpta) {
    if (rpta) {
        lstCboTipoBarrera = rpta.split("¬");
        CrearCombo(lstCboTipoBarrera, cboTipoBarrera, "Seleccione");
    }
}
function mostrarEmpresaCbo(rpta) {
    if (rpta) {
        lstCboEmpresa = rpta.split("¬");
        CrearCombo(lstCboEmpresa, cboEmpresaInvolucrada, "Seleccione");
    }
}
function mostrarTipoEmpresaCbo(rpta) {
    if (rpta) {
        lstCboTipoEmpresa = rpta.split("¬");
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
    }
}
function listarEmpresaPorTipoCbo() {
    Http.get("Empresa/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + idTipoEmpresa, mostrarEmpresaPorTipoCbo);

}
function mostrarEmpresaPorTipoCbo(rpta) {
    if (rpta) {
        lstCboEmpresaIncidente = rpta.split("¬");
        CrearCombo(lstCboEmpresaIncidente, cboEmpresaIncidente, "Seleccione");
    }
}
function mostrarTipoEventoCbo(rpta) {
    if (rpta) {
        lstCboTipoEvento = rpta.split("¬");
        CrearCombo(lstCboTipoEvento, cboTipoEvento, "Seleccione");
    }
}
function mostrarTipoProgrInciCbo(rpta) {
    if (rpta) {
        lstCboTipoProgrInci = rpta.split("¬");
        CrearCombo(lstCboTipoProgrInci, cboTipoProgInci, "Seleccione");
    }
}
function mostrarCategoriaCbo(rpta) {
    if (rpta) {
        lstCboCategoria = rpta.split("¬");
        CrearCombo(lstCboCategoria, cboCategoria, "Seleccione");
    }
}
function mostrarBarreraCbo(rpta) {
    if (rpta) {
        lstCboBarrera = rpta.split("¬");
        CrearCombo(lstCboBarrera, cboBarrera, "Seleccione");
    }
}
function obtenerfechaActual() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10)
        dia = '0' + dia;
    if (mes < 10)
        mes = '0' + mes
    fechaActual = ano + "-" + mes + "-" + dia;
}
function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}
function MostrarGrabarCabecera(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        document.getElementById("lblNumeroIncidencia").innerHTML = rpta;
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "1/4 Completos";
        btnModalTipoEvento.style.display = "inline-block";
        btnGrabarIncidencia.style.display = "none";
        idIncidencia = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}function MostrarGrabarTipoEvento(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del Tipo de Evento se registró correctamente", "¡Exito!");
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "2/4 Completos";
        btnGrabarIncidencia.style.display = "none";
        btnModalBarrera.style.display = "inline-block";
        btnModalTipoEvento.style.display = "none";
        idIncidencia = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarGrabarBarrera(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la Barrera se registró correctamente", "¡Exito!");
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "3/4 Completos";
        btnGrabarIncidencia.style.display = "none";
        btnModalBarrera.style.display = "inline-block";
        btnModalTipoEvento.style.display = "none";
        idIncidencia = rpta;
        Http.get("Incidencia/EnviarCorreo?idIncidencia=" + idIncidencia, mostrarEnvioCorreo);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarIncidenciaImagen(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la incidencia fue correcto", "¡Exito!");
        btnImagenIndicencia.style.display = "none";
        idIncidencia = rpta;
        //Http.get("Incidencia/EnviarCorreo?idIncidencia=" + idIncidencia, mostrarEnvioCorreo);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function mostrarEnvioCorreo(rpta) {
    if (rpta) {
        toastSuccessAlert("Se envió el correo al Infractor correctamente.", "¡Exito!");
    }

}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function codificarImg(element) {

    console.log(element);
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        imgVistaPrevia.style.display = "inline-block";
        imagB64 = reader.result;
        imgVistaPrevia.src = reader.result;

        //document.getElementById("imgVistaPrevia").src=reader.result;
    }
    reader.readAsDataURL(file);

}
function obtenerRegistroPorId(id) {
    Http.get("Incidencia/ObtenerIncidenciaPorIdCsv?idIncidencia=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {

    if (rpta) {
        var campos = rpta.split('|');

        document.getElementById("lblNumeroIncidencia").innerHTML = campos[0];
        idIncidencia = campos[0];
        txtFechaIncidencia.value = campos[1];
        cboEmpresaIncidente.value = campos[2];
        cboZona.value = campos[3];
        cboUbicacion.value = campos[4];
        cboTipoProgInci.value = campos[5];
        cboTipoEvento.value = campos[6];
        cboCategoria.value = campos[7];
        cboBloque.value = campos[8];
        cboEspecificacion.value = campos[9];
        cboEmpresaInvolucrada.value = campos[10];
        txtDetalles.value = campos[11];
        cboBarrera.value = campos[12];
        cboTipoBarrera.value = campos[13];
        txtBarrera.value = campos[14];
        if (cboTipoEvento.value == 0 || cboTipoEvento.value=="" ) {
            btnModalTipoEvento.style.display = "inline-block";
            lblRegTitu.style.visibility = "visible";
            lblAlertaRegistro.style.visibility = "visible";
            document.getElementById("lblAlertaRegistro").innerHTML = "1/4 Completos";
        } else {
            if (cboTipoEvento.value > 0) {
                btnModalTipoEvento.style.display = "none";
                lblRegTitu.style.visibility = "visible";
                lblAlertaRegistro.style.visibility = "visible";
                document.getElementById("lblAlertaRegistro").innerHTML = "2/4 Completos";
            }
            if (cboBarrera.value == 0 || cboBarrera.value == "") {
                btnModalBarrera.style.display = "inline-block";

            }
        }
    } else {
        limpiarControles('form-control');
    }
}
