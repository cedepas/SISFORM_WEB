var imagB64;
var lstCboTipoSolucion;
var FK_ID_Incidencia;
var IdTrabajador;
var imagB64;
var cabeseraImagen;
var TipoDato;

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    //Http.get("Incidencia/ListarTipoSolucionIncidenciaCsv", mostrarCboTipoSolucion);
    Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);
   
    btnGrabaraplazamiento.onclick = function () {
        var frm = new FormData();
        frm.append("FK_ID_Incidencia", FK_ID_Incidencia);
        frm.append("FK_ID_TrabajadorAplaza", IdTrabajador);
        frm.append("diasaplazamiento", txtDiasAplazar.value);
        frm.append("detalleaplazamiento", txtdetalleapla.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabaraplazamiento);
            Http.post("Incidencia/AplazarInciden", MostrarGrabarAplazamiento, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    bntNuevo.onclick = function () {
        limpiarControles('form-control');
        location.reload();
    }
}

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
}
function consulta(e) {

    if (e.keyCode === 13 && !e.shiftKey) {
        Http.get("Incidencia/ObtenerIncidenciaPorIdParaSolucionCsv?idIncidencia=" + txtIdIncidente.value, AsignarCamposBusqueda);
    }
}
function AsignarCamposBusqueda(rpta) {
    if (rpta) {
        var campos = rpta.split('|');
        txtIdIncidente.value = campos[0];
        idIncidente = campos[0];
        cboEmpresaIncidente.value = campos[1];
        txtfechaIncidente.value = campos[2];
        txtBloque.value = campos[3];
        txtEspecificacion.value = campos[4];
        txtDetalles.value = campos[5];
        divSolucion.style.display = "inline-block";
    }
}
function mostrarCboTipoSolucion(rpta) {
    if (rpta) {
        lstCboTipoSolucion = rpta.split('¬');
        CrearCombo(lstCboTipoSolucion, cboTipoSolucion, "Seleccionar");
    }

}
function MostrarGrabarAplazamiento(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del aplazamiento se registró correctamente", "¡Exito!");
        divSolucion.style.display = "none";
        Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
       // Http.get("Incidencia/EnviarCorreoSolucion?idIncidencia=" + idIncidente, mostrarEnvioCorreo);
    } else {
        toastDangerAlert("no se registro el aplazamiento", "¡Error!");
    }
    limpiarControles('form-control');
    location.reload();
}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function obtenerRegistroPorId(id) {

    Http.get("Incidencia/ObtenerIncidenciaPorIdParaSolucionCsv?idIncidencia=" + id, AsignarCamposBusqueda);
}
function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}
