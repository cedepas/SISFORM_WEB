var cboCtrlModulos;
var lstPermisos = [];

var cboCtrlModulos = document.getElementById("cboCtrlModulos");

window.onload = function () {
    Http.get("Administracion/ListarCtrlModulosCbo", mostrarCtrlModulosCbo);

    if (!isMobile.any()) {
        //Http.get("Empresa/ListarEmpresa", CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    cboCtrlModulos.onchange = function () {
        var modulo = cboCtrlModulos.value;

        var campos = [];
        nRegistros = lstPermisos.length;

        for (var i = 0; i < nRegistros; i++) {
            campos = lstPermisos[i].split('|');
            if (campos[0] == modulo) {
                chkStListar.checked = (campos[1] == "S" ? true : false);
                chkStAdicionar.checked = (campos[2] == "S" ? true : false);
                chkStModificar.checked = (campos[3] == "S" ? true : false);
                chkStEliminar.checked = (campos[4] == "S" ? true : false);
                chkStReporte.checked = (campos[5] == "S" ? true : false);
                break;
            } else {
                chkStListar.checked = false;
                chkStAdicionar.checked = false;
                chkStModificar.checked = false;
                chkStEliminar.checked = false;
                chkStReporte.checked = false;
            }
        }
    }

    btnGrabar.onclick = function () {
        var frm = new FormData();
        frm.append("FK_ID_CtrlModulo", cboCtrlModulos.value);
        frm.append("FK_ID_Usuario", txtIdTrabajador.value);
        frm.append("StListar", (chkStListar.checked == true ? "S" : "N"));
        frm.append("StAdicionar", (chkStAdicionar.checked == true ? "S" : "N"));
        frm.append("StModificar", (chkStModificar.checked == true ? "S" : "N"));
        frm.append("StEliminar", (chkStEliminar.checked == true ? "S" : "N"));
        frm.append("StReporte", (chkStReporte.checked == true ? "S" : "N"));

        if (validarRequeridos('E')) {
            Http.post("Administracion/Grabar", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        chkStListar.checked = false;
        chkStAdicionar.checked = false;
        chkStModificar.checked = false;
        chkStEliminar.checked = false;
        chkStReporte.checked = false;
        btnNuevo.style.visibility = "hidden";
    }
}

function mostrarCtrlModulosCbo(rpta) {
    if (rpta) {
        lstcboCtrlModulos = rpta.split("¬");
        CrearCombo(lstcboCtrlModulos, cboCtrlModulos, "Seleccione");
    }
}

function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Administracion/ListarEmpresa", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        btnNuevo.style.visibility = "visible";
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function consulta(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        Http.get("Administracion/ObtenerporDni?dni=" + txtDocumentoTrabajador.value, AsignarCampos);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Empresa/ObtenerEmpresaPorIdCsv?idEmpresa=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        btnNuevo.style.visibility = "visible";
        var campos = [];
        campos = rpta.split('|');
        txtIdTrabajador.value = campos[0];
        txtNombreTrabajador.value = campos[1];
        if (txtIdTrabajador.value) {
            Http.get("Administracion/AutorizacionUsuario?idUsuario=" + txtIdTrabajador.value, AsignarCampos2);
        }
    }
}

function AsignarCampos2(rpta) {
    if (rpta) {
        lstPermisos = rpta.split('¬');
    }
}