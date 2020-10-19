var lstPrueba;

window.onload = function () {
    if (!isMobile.any()) {
        Http.get("Trabajador/ListarPruebasCovid", CrearTablaCsv);
        Http.get("Trabajador/ListarResultadoPruebaCbo", mostrarCbo);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    btnGrabar.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Empresa", (txtIdPruebasCovid.value == "" ? "0" : txtIdPruebasCovid.value));
        frm.append("FK_ID_Trabajador", txtIdTrabajador.value);
        frm.append("fechaPrueba", txtFechaPrueba.value);
        frm.append("numeroPrueba", txtNumeroPrueba.value);
        frm.append("resultadoPrueba", cboResultadoPrueba.value);
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('E')) {
            Http.post("Trabajador/GrabarPrueba", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        btnNuevo.style.visibility = "hidden";
    }
}

function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Trabajador/ListarPruebasCovid", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdPruebasCovid.value = rpta;
        btnNuevo.style.visibility = "visible";
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function consulta(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        Http.get("Trabajador/ObtenerporDni?dni=" + txtDocumentoTrabajador.value, AsignarCampos);
    }
}

function AsignarCampos(rpta) {
    if (rpta) {
        btnNuevo.style.visibility = "visible";
        var campos = rpta.split('|');
        if (campos[0]) {
            txtIdTrabajador.value = campos[0];
            txtNombreTrabajador.value = campos[1];
            txtNumeroPrueba.value = campos[2];
        }
    }
}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function mostrarCbo(rpta) {
    if (rpta) {
        lstPrueba = rpta.split('¬');
        CrearCombo(lstPrueba, cboResultadoPrueba, "Seleccione");
    }
}