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
function cargar(event) {
    for (let i = 0; i < 2; i++) {
        var selectFile = event.files[0];
        var reader = new FileReader();




        reader.onload = function (e) {

            img = e.target.result;
            imgVistaPrevia.src = img;
        }
        reader.readAsDataURL(selectFile);

        imgVistaPrevia.onload = function () {
            if (img) {
                imgre = resizing(img, 650, 500);
                imgVistaPrevia.style.display = "inline-block";
                imgVistaPrevia.src = imgre;
            }
        }
    }
}
function resizing(base64, maxWidth, maxHeight) {
    if (typeof (maxWidth) === 'undefined') var maxWidth = 500;
    if (typeof (maxHeight) === 'undefined') var maxHeight = 500;

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var copyCanvas = document.createElement("canvas");
    var copyCtx = copyCanvas.getContext("2d");

    var img = new Image();
    img.src = base64;

    var ratio = 1;
    if (img.width > maxWidth)
        ratio = maxWidth / img.width;
    else if (img.height > maxHeight)
        ratio = maxHeight / img.height;

    copyCanvas.width = img.width;
    copyCanvas.height = img.height;
    copyCtx.drawImage(img, 0, 0);

    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(copyCanvas, 0, 0, copyCanvas.width, copyCanvas.height, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
}
function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}
