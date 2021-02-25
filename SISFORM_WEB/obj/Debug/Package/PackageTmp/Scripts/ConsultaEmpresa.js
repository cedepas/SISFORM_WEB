var lstCboTipoEmpr;
var lstCboRegimenes;
var lstCboPersona;
var lstCboLibro;
var lstCboColAse;

var lstCboContrato;
var lstCboEstAct;
var lstCboPlano;
var lstCboCerti;
var lstCboAuto;
var lstCboEstReal;

var idEmpresa;

window.onload = function () {
    Http.get("Empresa/ListarTipoEmpresaCbo", mostrarTipoEmpresaCbo);

    if (!isMobile.any()) {
        Http.get("Empresa/ListarEmpresa", CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    btnGrabar.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Empresa", (idEmpresa == "" ? "0" : idEmpresa));
        frm.append("FK_ID_TipoEmpresa", cboTipoEmpresa.value);
        frm.append("nombreComercial", txtNombreComercial.value);
        frm.append("razonSocial", txtRazonSocial.value);
        frm.append("tieneRuc", (txtTieneRuc.checked == true ? "SI" : "NO"));
        frm.append("regimenTributario", cboRegimenTributario.value);
        frm.append("tipoPersona", cboTipoPersona.value);
        frm.append("ruc", txtRuc.value);
        frm.append("telefono", txtTelefono.value);
        frm.append("direccion", txtDireccion.value);
        frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        frm.append("email", txtEmail.value);

        if (validarRequeridos('E')) {
            Http.post("Empresa/Grabar", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnObservacion.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Progreso", (txtIdProgreso.value == "" ? "0" : txtIdProgreso.value));
        frm.append("FK_ID_empresa", txtIdEmpresa.value);
        frm.append("observaciones", txtObservaciones.value);
        frm.append("fechaVisita", txtFechaVisita.value);
        frm.append("estado", (txtEstadoObs.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('O')) {
            Http.post("Empresa/GrabarObservacion", MostrarGrabarObservacion, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnCriterio1.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Criterio1", (txtIdCriterio1.value == "" ? "0" : txtIdCriterio1.value));
        frm.append("FK_ID_empresa", idEmpresa);
        frm.append("estadoActual", cboEstadoActual.value);
        frm.append("fechaExpedicionLicencia", txtFechaExpedicionLicencia.value);
        frm.append("fechaCaducidadLicencia", txtFechaCaducidadLicencia.value);
        frm.append("lugarVisible", (txtLugarVisible.checked == true ? "SI" : "NO"));
        frm.append("contratoAlquiler", cboContratoAlquiler.value);
        frm.append("estrituraPublica", cboEstrituraPublica.value);
        frm.append("croquisUbicacion", cboCroquisUbicacion.value);
        frm.append("plano", cboPlano.value);
        frm.append("m2", txtM2.value);
        frm.append("certificadoOperatividadExtintores", cboCertificadoOperatividadExtintores.value);
        frm.append("fechaExpedicionCertificado", txtFechaExpedicionCertificado.value);
        frm.append("fechaCaducidadCertificado", txtFechaCaducidadCertificado.value);
        frm.append("numeroTrabajadores", txtNumeroTrabajadores.value);
        frm.append("cuentanConCarnet", txtCuentanConCarnet.value);
        frm.append("noCuentanConCarnet", txtNoCuentanConCarnet.value);
        frm.append("declaracionJuradaAutoAvaluo", cboDeclaracionJuradaAutoAvaluo.value);
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('C1')) {
            Http.post("Empresa/GrabarCriterio1", MostrarGrabarCriterio1, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnCriterio2.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Criterio2", (txtIdCriterio2.value == "" ? "0" : txtIdCriterio2.value));
        frm.append("FK_ID_empresa", idEmpresa);
        frm.append("estadoReal", cboEstadoRealC2.value);
        frm.append("fechaExpedicion", txtFechaExpedicion.value);
        frm.append("fechaCaducidad", txtFechaCaducidad.value);
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('C2')) {
            Http.post("Empresa/GrabarCriterio2", MostrarGrabarCriterio2, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnCriterio3.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Criterio3", (txtIdCriterio3.value == "" ? "0" : txtIdCriterio3.value));
        frm.append("FK_ID_empresa", idEmpresa);
        frm.append("estadoReal", cboEstadoRealC3.value);
        frm.append("señalizacionContraSismos", (txtSeñalizacionContraSismos.checked == true ? "SI" : "NO"));
        frm.append("botiquinPrimerosAuxilios", (txtBotiquinPrimerosAuxilios.checked == true ? "SI" : "NO"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('C3')) {
            Http.post("Empresa/GrabarCriterio3", MostrarGrabarCriterio3, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        btnModalObs.style.visibility = "hidden";
        btnModalLic.style.visibility = "hidden";
        btnModalSal.style.visibility = "hidden";
        btnModalDef.style.visibility = "hidden";
        btnNuevo.style.visibility = "hidden";
    }
}

function mostrarTipoEmpresaCbo(rpta) {
    if (rpta) {
        lstCboTipoEmpr = rpta.split("¬");
        CrearCombo(lstCboTipoEmpr, cboTipoEmpresa, "Seleccione");

        var rptaRegimen = 'NRUS|NRUS¬REGIMEN ESPECIAL|REGIMEN ESPECIAL¬REGIMEN MYPE|REGIMEN MYPE¬REGIMEN GENERAL|REGIMEN GENERAL¬NO TIENE|NO TIENE';
        lstCboRegimenes = rptaRegimen.split('¬');
        CrearCombo(lstCboRegimenes, cboRegimenTributario, "Seleccione");

        var rptaPersona = 'NATURAL|NATURAL¬JURIDICA|JURIDICA¬NINGUNO|NIGUNO';
        lstCboPersona = rptaPersona.split('¬');
        CrearCombo(lstCboPersona, cboTipoPersona, "Seleccione");

        //var rptaLibro = 'SI TIENE|SI TIENE¬NO TIENE|NO TIENE¬EN PROCESO|EN PROCESO¬ACTUALIZAR|ACTUALIZAR';
        //lstCboLibro = rptaLibro.split('¬');
        //CrearCombo(lstCboLibro, cboLibroReclamaciones, "Seleccione");

        //var rptaAsePer = 'SI TIENE|SI TIENE¬NO TIENE|NO TIENE¬BUENA|BUENA¬REGULAR|REGULAR¬MALA|MALA';
        //lstCboColAse = rptaAsePer.split('¬');
        //CrearCombo(lstCboColAse, cboColaborador, "Seleccione");
        //CrearCombo(lstCboColAse, cboAsesoriaPersonalizada, "Seleccione");

        var rptaContrato = 'PROPIETARIO|PROPIETARIO¬CON CONTRATO|CON CONTRATO¬SIN CONTRATO|SIN CONTRATO';
        lstCboContrato = rptaContrato.split('¬');
        CrearCombo(lstCboContrato, cboContratoAlquiler, "Seleccione");

        var rptaEstAct = 'VIGENTE|VIGENTE¬EN TRAMITE|EN TRAMITE¬NO TIENE|NO TIENE¬POR VERIFICAR|POR VERIFICAR';
        lstCboEstAct = rptaEstAct.split('¬');
        CrearCombo(lstCboEstAct, cboEstadoActual, "Seleccione");
        CrearCombo(lstCboEstAct, cboCertificadoOperatividadExtintores, "Seleccione");
        CrearCombo(lstCboEstAct, cboDeclaracionJuradaAutoAvaluo, "Seleccione");
        CrearCombo(lstCboEstAct, cboEstadoRealC2, "Seleccione");
        CrearCombo(lstCboEstAct, cboEstadoRealC3, "Seleccione");

        var rptaPlano = 'SI TIENE|SI TIENE¬PENDIENTE|PENDIENTE¬NO TIENE|NO TIENE';
        lstCboPlano = rptaPlano.split('¬');
        CrearCombo(lstCboPlano, cboPlano, "Seleccione");
        CrearCombo(lstCboPlano, cboEstrituraPublica, "Seleccione");
        CrearCombo(lstCboPlano, cboCroquisUbicacion, "Seleccione");
    }
}

function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Empresa/ListarEmpresa", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdEmpresa.value = rpta;
        btnModalObs.style.visibility = "hidden";
        btnModalLic.style.visibility = "hidden";
        btnModalSal.style.visibility = "hidden";
        btnModalDef.style.visibility = "hidden";
        btnNuevo.style.visibility = "visible";
        btnGrabar.style.visibility = "hidden";
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarObservacion(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Empresa/ListarProgresoEmpresaCsv?idEmpresa=" + txtIdEmpresa.value, CrearTablaCsvObs);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdProgreso.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarCriterio1(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdCriterio1.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarCriterio2(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdCriterio2.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarCriterio3(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdCriterio3.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function CrearTablaCsvObs(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTablaObs", 5, 3);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Empresa/ObtenerEmpresaPorIdCsv?idEmpresa=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        btnModalObs.style.visibility = "visible";
        btnModalLic.style.visibility = "visible";
        btnModalSal.style.visibility = "visible";
        btnModalDef.style.visibility = "visible";
        btnNuevo.style.visibility = "visible";
        var listas = rpta.split('¯');
        var campos = [];
        if (listas[0]) {
            campos = listas[0].split('|');
            idEmpresa = campos[0];
            cboTipoEmpresa.value = campos[1];
            txtNombreComercial.value = campos[2];
            txtRazonSocial.value = campos[3];
            txtTieneRuc.value = (campos[4] == "SI" ? true : false);
            cboRegimenTributario.value = campos[5];
            cboTipoPersona.value = campos[6];
            txtRuc.value = campos[7];
            txtTelefono.value = campos[8];
            txtDireccion.value = campos[9];
            txtEstado.value = (campos[10] == "ACT" ? true : false);
            txtEmail.value = campos[11] ;
        }

        if (listas[1]) {
            campos = listas[1].split('|');
            txtIdCriterio1.value = campos[0];
            cboEstadoActual.value = campos[1];
            txtFechaExpedicionLicencia.value = campos[2];
            txtFechaCaducidadLicencia.value = campos[3];
            txtLugarVisible.value = campos[4];
            cboContratoAlquiler.value = campos[5];
            cboEstrituraPublica.value = campos[6];
            cboCroquisUbicacion.value = campos[7];
            cboPlano.value = campos[8];
            txtM2.value = campos[9];
            cboCertificadoOperatividadExtintores.value = campos[10];
            txtFechaExpedicionCertificado.value = campos[11];
            txtFechaCaducidadCertificado.value = campos[12];
            txtNumeroTrabajadores.value = campos[13];
            txtCuentanConCarnet.value = campos[14];
            txtNoCuentanConCarnet.value = campos[15];
            cboDeclaracionJuradaAutoAvaluo.value = campos[16];
            if (!isMobile.any()) {
                Http.get("Empresa/ListarProgresoEmpresaCsv?idEmpresa=" + idEmpresa, CrearTablaCsvObs);
            }
        } else {
            limpiarControles('C1')
        }

        if (listas[2]) {
            campos = listas[2].split('|');
            txtIdCriterio2.value = campos[0];
            cboEstadoRealC2.value = campos[1];
            txtFechaExpedicion.value = campos[2];
            txtFechaCaducidad.value = campos[3];
        } else {
            limpiarControles('C2')
        }

        if (listas[3]) {
            campos = listas[3].split('|');
            txtIdCriterio3.value = campos[0];
            cboEstadoRealC3.value = campos[1];
            txtSeñalizacionContraSismos.value = (campos[2] == "SI" ? true : false);
            txtBotiquinPrimerosAuxilios.value = (campos[3] == "SI" ? true : false);
        } else {
            limpiarControles('C3')
        }
    }
}
