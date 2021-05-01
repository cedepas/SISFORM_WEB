
var lstCboTipoSeguimiento;
var idIncidente;
var IdTrabajador;
var cabeseraImagen;
var TipoDato;
var fechaSeguimiento;

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoSeguimientoIncidenciaCsv", mostrarCboTipoSeguimiento);
    Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);

    btnGrabarSeguimiento.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidente);
        frm.append("fechaSeguimientoIncidencia", txtFechaSeguimiento.value);
        frm.append("ID_TipoSeguimiento", cboTipoSeguimiento.value);
        frm.append("FK_ID_TrabajadorSeguimiento", IdTrabajador);
        frm.append("detalleSeguimientoIncidencia", txtSeguimiento.value);

        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarSeguimiento);
            Http.post("Incidencia/RegistrarSeguimiento", MostrarGrabarSeguimiento, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
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
        divSeguimiento.style.display = "inline-block";
    }
}
function mostrarCboTipoSeguimiento(rpta) {
    if (rpta) {
        lstCboTipoSeguimiento = rpta.split('¬');
        CrearCombo(lstCboTipoSeguimiento, cboTipoSeguimiento, "Seleccionar");
    }

}
function MostrarGrabarSeguimiento(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del seguimiento se registró correctamente", "¡Exito!");
        divSeguimiento.style.display = "none";
        Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);

    }

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