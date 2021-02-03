﻿var ubigeo;
var lstCboTipoDoc;
var lstCboPuesto;
var lstCboEmpresa;
var idTrabajador;

window.onload = function () {
    Http.get("Trabajador/ListarTipoDocumentoCbo", mostrarTipoDocumentoCbo);
    Http.get("Trabajador/listarUbigeoCbo", mostrarListaUbigeo);
    Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);

    if (!isMobile.any()) {
        

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);

    cboEmpresa.onchange = function () {
        listarPuestoTrabajo();
    }

    cboDepartamento.onchange = function () {
        listarProvincias();
    }

    cboProvincia.onchange = function () {
        listarDistritos();
    }

    btnGrabar.onclick = function () {
        var frm = new FormData();
        if (idTrabajador) {
            frm.append("ID_Trabajador", idTrabajador);
        }
        //frm.append("ID_Trabajador", (txtIdTrabajador.value == "" ? "0" : txtIdTrabajador.value));
        frm.append("FK_ID_TipoDocumento", cboTipoDocumento.value);
        frm.append("numeroDocumento", txtNuDoc.value);
        frm.append("nombreTrabajador", txtNombre.value.toUpperCase());
        frm.append("apellidoPaterno", txtApePaterno.value.toUpperCase());
        frm.append("apellidoMaterno", txtApeMaterno.value.toUpperCase());
        frm.append("fechaNacimiento", dtFecNac.value);
        frm.append("ubigeo", cboDepartamento.value + cboProvincia.value + cboDistrito.value);
        frm.append("referencia", txtReferencia.value.toUpperCase());
        frm.append("telefono", txtTelefono.value);
        frm.append("direccion", txtDireccion.value.toUpperCase());
        //frm.append("condicionTrabajador", (txtCondicion.checked == true ? "SI" : "NO"));
        frm.append("familiarContacto", txtFamiliarContacto.value.toUpperCase());
        frm.append("telefonoContacto", txtTelefonoContacto.value);
        frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('T')) {
            Http.post("Trabajador/Grabar", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnGrabarPuesto.onclick = function () {
        var frm = new FormData();
        frm.append("ID_TrabajadorPuesto", (txtIdTrabajadorPuesto.value == "" ? "0" : txtIdTrabajadorPuesto.value));
        frm.append("FK_ID_Trabajador", (idTrabajador == "" ? "0" : idTrabajador));
        //frm.append("FK_ID_Trabajador", txtIdTrabajador.value);
        frm.append("FK_ID_PuestoTrabajo", cboPuestoTrabajo.value);
        frm.append("FK_ID_Empresa", cboEmpresa.value);
        frm.append("fechaIngreso", txtFechaIngreso.value);
        frm.append("fechaFin", txtFechaSalida.value);
        frm.append("estado", (txtEstadoPuesto.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('P')) {
            Http.post("Trabajador/GrabarPuesto", MostrarGrabarPuesto, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        btnModal.style.visibility = "hidden";
        btnNuevo.style.visibility = "hidden";
    }

}

function mostrarTipoDocumentoCbo(rpta) {
    if (rpta) {
        lstCboTipoDoc = rpta.split("¬");
        CrearCombo(lstCboTipoDoc, cboTipoDocumento, "Seleccione");
    }
}

function mostrarPuestoTrabajoCbo(rpta) {
    if (rpta) {
        lstCboPuesto = rpta.split("¬");
        CrearCombo(lstCboPuesto, cboPuestoTrabajo, "Seleccione");
    }
}

function mostrarEmpresaCbo(rpta) {
    if (rpta) {
        lstCboEmpresa = rpta.split("¬");
        CrearCombo(lstCboEmpresa, cboEmpresa, "Seleccione");
    }
}
function listarPuestoTrabajo() {
    Http.get("Trabajador/ListarPuestoTrabajoCbo?idEmpresa=" + cboEmpresa.value, mostrarPuestoTrabajoCbo);
}

function mostrarListaUbigeo(rpta) {
    if (rpta != "") {
        ubigeo = rpta.split("¬");
        listarDepartamentos();
    }
}

function listarDepartamentos() {
    var html = "<option value=''>Seleccione Dpto</option>";
    var nRegistros = ubigeo.length;
    var idDpto, idProv, idDist, nombre;
    for (var i = 0; i < nRegistros; i++) {
        idDpto = ubigeo[i].substr(0, 2);
        idProv = ubigeo[i].substr(2, 2);
        idDist = ubigeo[i].substr(4, 2);
        if (idDpto != "00" && idProv == "00" && idDist == "00") {
            nombre = ubigeo[i].substr(6, ubigeo[i].length - 6);
            html += "<option value='";
            html += idDpto;
            html += "'>";
            html += nombre;
            html += "</option>";
        }
    }
    cboDepartamento.innerHTML = html;
    listarProvincias();
}

function listarProvincias() {
    var html = "<option value=''>Seleccione Prov</option>";
    var nRegistros = ubigeo.length;
    var idDpto, idProv, idDist, nombre;
    var idDptoSel = cboDepartamento.value;
    for (var i = 0; i < nRegistros; i++) {
        idDpto = ubigeo[i].substr(0, 2);
        idProv = ubigeo[i].substr(2, 2);
        idDist = ubigeo[i].substr(4, 2);
        if (idDpto == idDptoSel && idProv != "00" && idDist == "00") {
            nombre = ubigeo[i].substr(6, ubigeo[i].length - 6);
            html += "<option value='";
            html += idProv;
            html += "'>";
            html += nombre;
            html += "</option>";
        }
    }
    cboProvincia.innerHTML = html;
    listarDistritos();
}

function listarDistritos() {
    var html = "<option value=''>Seleccione Dist</option>";
    var nRegistros = ubigeo.length;
    var idDpto, idProv, idDist, nombre;
    var idDptoSel = cboDepartamento.value;
    var idProvSel = cboProvincia.value;
    for (var i = 0; i < nRegistros; i++) {
        idDpto = ubigeo[i].substr(0, 2);
        idProv = ubigeo[i].substr(2, 2);
        idDist = ubigeo[i].substr(4, 2);
        if (idDpto == idDptoSel && idProv == idProvSel && idDist != "00") {
            nombre = ubigeo[i].substr(6, ubigeo[i].length - 6);
            html += "<option value='";
            html += idDist;
            html += "'>";
            html += nombre;
            html += "</option>";
        }
    }
    cboDistrito.innerHTML = html;
}

function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdTrabajador.value = rpta;
        btnModal.style.visibility = "visible";
        btnNuevo.style.visibility = "visible";
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarPuesto(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdTrabajadorPuesto.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Trabajador/ObtenerTrabajadorPorId?idTrabajador=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        btnModal.style.visibility = "visible";
        btnNuevo.style.visibility = "visible";
        var listas = rpta.split('¯');
        var campos = [];
        if (listas[0]) {
            campos = listas[0].split('|');
            idTrabajador = campos[0];
            cboTipoDocumento.value = campos[1];
            txtNuDoc.value = campos[2];
            txtNombre.value = campos[3];
            txtApePaterno.value = campos[4];
            txtApeMaterno.value = campos[5];
            dtFecNac.value = campos[6];
            cboDepartamento.value = campos[7].substr(0, 2);
            listarProvincias();
            cboProvincia.value = campos[7].substr(2, 2);
            listarDistritos();
            cboDistrito.value = campos[7].substr(4, 2);
            txtReferencia.value = campos[8];
            txtTelefono.value = campos[9];
            txtDireccion.value = campos[10];
            //txtCondicion.checked = (campos[11] == "SI" ? true : false);
            txtFamiliarContacto.value = campos[11];
            txtTelefonoContacto.value = campos[12];
            txtEstado.checked = (campos[13] == "ACT" ? true : false);
        }

        if (listas[1]) {
            campos = listas[1].split('|');
            txtIdTrabajadorPuesto.value = campos[0];
            cboPuestoTrabajo.value = campos[1];
            cboEmpresa.value = campos[2];
            txtFechaIngreso.value = campos[3];
            txtFechaSalida.value = campos[4];
            txtEstadoPuesto.checked = (campos[5] == "ACT" ? true : false);
        } else {
            limpiarControles('P')
        }
    }    
}
