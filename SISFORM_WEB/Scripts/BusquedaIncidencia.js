var idTipoTiltro;

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    //Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoFiltroIncidenciaCsv", mostrarCboTipoFiltroIncidencia);
    //Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);

    btnBuscarIncidencias.onclick = function () {
        console.log(cboTipoFiltroIncidencia.value.toString());
        console.log(txtfechaIncidente.value.toString());
        Http.get("Incidencia/ObtenerIncidenciaPorFiltroCsv?ID_TipoFilto=" + cboTipoFiltroIncidencia.value.toString() + "&Filtro=" + txtfechaIncidente.value.toString(), CrearTablaCsv);
    }

}
function mostrarCboTipoFiltroIncidencia(rpta) {
    if (rpta) {
        lstCboTipoFiltroIncidencia = rpta.split('¬');
        CrearCombo(lstCboTipoFiltroIncidencia, cboTipoFiltroIncidencia, "Seleccionar");
    }
}
cboTipoFiltroIncidencia.onchange = function () {
    idTipoTiltro = cboTipoFiltroIncidencia.value;
    if (idTipoTiltro == 1) {
        console.log(1111)
    }
    else {
        console.log(2222);
    }

}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}