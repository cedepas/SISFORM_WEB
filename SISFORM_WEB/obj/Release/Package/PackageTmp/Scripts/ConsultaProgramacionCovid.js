var lstPrueba;
var idEmpresaTrab;
var idTrabajador;
var numeroPrueba;
var idEmpresaPuesto;
var idPruebaCovid;


window.onload = function () {
    if (!isMobile.any()) {
        Http.get("PruebaCovid/ListarPruebasCovid", CrearTablaCsv);
        //Http.get("PruebaCovid/ListarResultadoPruebaCbo", mostrarCbo);
        Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    btnGrabar.onclick = function () {
        var frm = new FormData();
        if (idPruebaCovid < 1) {
            if (idEmpresaTrab && idEmpresaTrab != '0') {
                frm.append("ID_Empresa", idEmpresaTrab);
            }
            else toastDangerAlert("El colaborador no tiene asignado una Empresa ni Puesto de trabajo", "¡Aviso!")
            frm.append("FK_ID_Trabajador", idTrabajador);
            frm.append("fechaPrueba", txtFechaPrueba.value);
            frm.append("numeroPrueba", numeroPrueba);
            frm.append("resultadoPrueba", 1);
            frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

            if (validarRequeridos('E')) {
                Http.post("PruebaCovid/GrabarPrueba", MostrarGrabar, frm);
            } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        } else {
            var frm = new FormData();
            frm.append("ID_PruebasCovid", idPruebaCovid);
            frm.append("FK_ID_Trabajador", idTrabajador);
            frm.append("fechaPrueba", txtFechaPrueba.value);
            frm.append("numeroPrueba", txtNumeroPrueba.value);
            frm.append("resultadoPrueba", cboResultadoPrueba.value);
            frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

            if (validarRequeridos('E')) {
                Http.post("PruebaCovid/GrabarPrueba", MostrarGrabar, frm);
            } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        }


    }
    btnAgregarPuesto.onclick = function () {
        var frm = new FormData();
        //frm.append("ID_TrabajadorPuesto", (txtIdTrabajadorPuesto.value == "" ? "0" : txtIdTrabajadorPuesto.value));
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
        btnNuevo.style.visibility = "hidden";
        document.getElementById("fechaPrueba").style.display = "inline";
        document.getElementById("numeroPrueba").style.display = "inline";
        document.getElementById("resultadoPrueba").style.display = "none";
        btnGrabar.style.visibility = "visible";

    }
    btnModalAgregar.onclick = function () {
        txtIdTrabajadorPuesto.value = idTrabajador;
        btnModalAgregar.style.visibility = "hidden";
        btnNuevo.style.visibility = "hidden";
    }
    cboEmpresa.onchange = function () {
        idEmpresaPuesto = cboEmpresa.value;
        listarPuestosTrabajoCbo();
    }
}

function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("PruebaCovid/ListarPruebasCovid", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        //txtIdPruebasCovid.value = rpta;
        btnNuevo.style.visibility = "visible";
        limpiarControles('form-control');


    }
    else toastDangerAlert("No se pudo grabar el registro, verique la fecha de programación", "¡Error!");
}

function consulta(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        Http.get("PruebaCovid/ObtenerporDni?dni=" + txtDocumentoTrabajador.value, AsignarCampos);
    }
}
function obtenerRegistroPorId(id) {
    Http.get("PruebaCovid/ObtenerProgramacionPruebaCovidPorIDCsv?idPruebaCovid=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {
    var resultadoPrueba;
    if (rpta) {

        btnNuevo.style.visibility = "visible";
        var campos = rpta.split('|');
        if (campos[0] == 'ko') {
            limpiarControles('form-control');
            toastDangerAlert(campos[1], "¡Alerta!");
        }
        else {
            if (campos[5] == '' || campos[5] == '0') {
                btnModalAgregar.style.visibility = "visible";
                toastPrimaryAlert("El colaborador no tiene una Empresa ni puesto asignado", "¡Alerta!");
                idTrabajador = campos[0];
            }
            else {
                if (campos[8] == "PRO") {
                    //cboResultadoPrueba.style.visibility = "visible";
                    //txtNumeroPrueba.style.visibility = "visible";
                    document.getElementById("tituloCovid").innerHTML = "Registrar resultado de prueba";
                    document.getElementById("fechaPrueba").style.display = "none";
                    document.getElementById("numeroPrueba").style.display = "inline";
                    document.getElementById("resultadoPrueba").style.display = "inline";
                    Http.get("PruebaCovid/ListarResultadoPruebaCbo", mostrarCbo);
                    //txtFechaPrueba.style.visibility = "hidden";
                    //noprog.visibility="visible";
                    //$('label[for=txtFechaPrueba], input#txtFechaPrueba').hide();
                    //$('label[for=txtFechaPrueba],input#txtFechaPrueba').hide();
                } else {
                    document.getElementById("tituloCovid").innerHTML = "Programar prueba";
                    document.getElementById("fechaPrueba").style.display = "inline";
                    document.getElementById("numeroPrueba").style.display = "inline";
                    document.getElementById("resultadoPrueba").style.display = "none";
                }

            }
            if (campos[0]) {
                idTrabajador = campos[0];
                txtDocumentoTrabajador.value = campos[1];
                txtNombreTrabajador.value = campos[2];
                numeroPrueba = campos[3];
                txtNumeroPrueba.value = campos[3];
                txtFechaPrueba.value = campos[4];
                idEmpresaTrab = campos[5];
                resultadoPrueba = parseInt(campos[6],10);
                idPruebaCovid = parseInt(campos[7], 10);
                //txtNumeroPrueba.value = campos[2];
                if (resultadoPrueba > 0) {
                    btnGrabar.style.visibility = 'hidden';
                } else {
                    btnGrabar.style.visibility = 'visible';
                }
            } else {
                limpiarControles('form-control');
            }

        }




    } else {
        limpiarControles('form-control');
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
function listarPuestosTrabajoCbo() {
    Http.get("Trabajador/ListarPuestoTrabajoCbo?idEmpresa=" + idEmpresaPuesto, mostrarPuestosTrabajoCbo);

}
function mostrarPuestosTrabajoCbo(rpt) {

    var html = "<option value=''>Seleccione Puesto</option>";
    var puestos = rpt.split("¬");
    var nRegistros = puestos.length;
    var idPuesto, nombrePuesto
    for (var i = 0; i < nRegistros; i++) {
        idPuesto = puestos[i].substr(0, 1);
        nombrePuesto = puestos[i].substr(2, puestos[i].length - 2);
        html += "<option value='";
        html += idPuesto;
        html += "'>";
        html += nombrePuesto;
        html += "</option>";

    }
    cboPuestoTrabajo.innerHTML = html;
}
function MostrarGrabarPuesto(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdTrabajadorPuesto.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}