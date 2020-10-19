var imagB64;
var lstCboTipoSolucion;
var idIncidente;
var IdTrabajador;

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoSolucionIncidenciaCsv", mostrarCboTipoSolucion);
    Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);

    btnGrabarSolucion.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidente);
        frm.append("ID_TipoSolucion", cboTipoSolucion.value);
        frm.append("FK_ID_TrabajadorSoluciona", IdTrabajador);
        frm.append("detalleSolucion", txtSolucion.value);
        frm.append("imagen", imagB64);

        if (validarRequeridos('E')) {
            Http.post("Incidencia/RegistrarSolucion", MostrarGrabarSolucion, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
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
function MostrarGrabarSolucion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del Tipo de Evento se registró correctamente", "¡Exito!");
        divSolucion.style.display = "none";
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
function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}
