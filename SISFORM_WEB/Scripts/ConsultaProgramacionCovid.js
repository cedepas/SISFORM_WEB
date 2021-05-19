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
        //Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);
        Http.get("PruebaCovid/ListarResultadoPruebaCbo", mostrarCbo);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    obtenerfechaActual();

    txtFechaPruebas.value = fechaActual;

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
            frm.append("resultadoPrueba", cboResultadoPrueba.value);
            frm.append("FK_ID_Empresa", idEmpresaTrab);
            frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

            if (validarRequeridos('E')) {
                Http.post("PruebaCovid/GrabarPrueba", MostrarGrabar, frm);
            } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        } else {
            if (cboResultadoPrueba.value == 1) {
                toastDangerAlert("Seleciones el Resultado!", "¡Aviso!");
            }
            else {
                if (idEmpresaTrab === undefined) {
                    idEmpresaTrab = cboEmpresasTrabajador.value;
                }
                var frm = new FormData();
                frm.append("ID_PruebasCovid", idPruebaCovid);
                frm.append("FK_ID_Trabajador", idTrabajador);
                frm.append("fechaPrueba", txtFechaPrueba.value);
                frm.append("numeroPrueba", txtNumeroPrueba.value);
                frm.append("resultadoPrueba", cboResultadoPrueba.value);
                frm.append("FK_ID_Empresa", idEmpresaTrab);
                frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
                frm.append("FK_ID_FrecuenciaPruebaCovid", cboFrecuenciaPruebas.value);
                if (validarRequeridos('G')) {
                    Http.post("PruebaCovid/GrabarPrueba", MostrarGrabar, frm);
                } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
            }
        }
    }

    //btnAgregarPuesto.onclick = function () {
    //    var frm = new FormData();
    //    //frm.append("ID_TrabajadorPuesto", (txtIdTrabajadorPuesto.value == "" ? "0" : txtIdTrabajadorPuesto.value));
    //    frm.append("FK_ID_Trabajador", (idTrabajador == "" ? "0" : idTrabajador));
    //    //frm.append("FK_ID_Trabajador", txtIdTrabajador.value);
    //    frm.append("FK_ID_PuestoTrabajo", cboPuestoTrabajo.value);
    //    frm.append("FK_ID_Empresa", cboEmpresa.value);
    //    frm.append("fechaIngreso", txtFechaIngreso.value);
    //    frm.append("fechaFin", txtFechaSalida.value);
    //    frm.append("estado", (txtEstadoPuesto.checked == true ? "ACT" : "ANU"));
    //    frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

    //    if (validarRequeridos('P')) {
    //        Http.post("Trabajador/GrabarPuesto", MostrarGrabarPuesto, frm);
    //    } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    //}

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        btnNuevo.style.visibility = "hidden";
        document.getElementById("fechaPrueba").style.display = "inline";
        document.getElementById("numeroPrueba").style.display = "inline";
        document.getElementById("resultadoPrueba").style.display = "none";
        document.getElementById("empresasTrabajador").style.display = "none";
        document.getElementById("empresaTrabajador").style.display = "none";
        btnGrabar.style.visibility = "visible";

    }

    btnModalAgregar.onclick = function () {
        txtIdTrabajadorPuesto.value = idTrabajador;
        btnModalAgregar.style.visibility = "hidden";
        btnNuevo.style.visibility = "hidden";
    }
    btnModalPruebasPorDia.onclick = function () {
        Http.get("PruebaCovid/ListarResultadoPruebasCovidCsv", crearTablaTodosLosResultados);
        txtCantidadCasosPositivos.value = 0;
    }

    //cboEmpresa.onchange = function () {
    //    idEmpresaPuesto = cboEmpresa.value;
    //    listarPuestosTrabajoCbo();
    //}

    txtfechaResultados.onchange = function () {
        Http.get("PruebaCovid/ListarResultadosCovidPorFechaCsv?fechaPrueba=" + txtfechaResultados.value, mostrarResultadosPorFecha);
    }
    btnIngresoPruebas.onclick = function () {
        var frm = new FormData();
        frm.append("fechaPrueba", txtFechaPruebas.value);
        frm.append("FK_ID_DistribucionPruebasCovid", cboPersonalTamizado.value);
        frm.append("cantidadPruebas", txtCantidadPruebas.value);
        frm.append("casosPositivos", txtCantidadCasosPositivos.value);
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        if (validarRequeridos('T')) {
            Http.post("PruebaCovid/RegitroPruebasCovid", MostrarGrabarResultados, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnExportar.onclick = function () {
        console.log(btnExportar.value);
        var downloadLink;
        //var dataType = 'application/vnd.ms-excel;charset=utf-8';

        var tableSelect = document.getElementById('divTabla');


        var tableHTML = tableSelect.outerHTML.replace(/input /g, '').replace(/ /g, '%20');
        console.log(tableHTML);
        var filename = 'PruebasCovid';
        // Nombre Archivo
        filename = filename ? filename + '.xls' : 'excel_data.xls';

        // Crear Link del Elemento a descargar
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Crear Link del Archivo
            downloadLink.href = 'data:application/vnd.ms-excel;charset=utf-8,' + tableHTML;

            // Configuración del nombre del archivo
            downloadLink.download = filename;

            //ejecutando la funcion de descarga
            downloadLink.click();
        }
    }

}

function resulExcel(rpta) {
    console.log(rpta);
}
function obtenerfechaActual() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10)
        dia = '0' + dia;
    if (mes < 10)
        mes = '0' + mes
    fechaActual = ano + "-" + mes + "-" + dia;
}
function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            //Http.get("PruebaCovid/ListarPruebasCovid", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        //txtIdPruebasCovid.value = rpta;
        btnNuevo.style.visibility = "visible";
        var tabla;
        tabla = document.getElementById('tbDatadivTabla');
        for (var i = 0; i < tabla.children.length; i++) {
            var NroFila = tabla.children.item(i);
            var idReg = NroFila.children.item(0).innerHTML;
            if (idReg == idPruebaCovid) {
                document.getElementById('tbDatadivTabla').removeChild(document.getElementById('tbDatadivTabla').childNodes[i]);
            }
        }
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro, verique la fecha de programación", "¡Error!");
}
function mostrarResultadosPorFecha(rpta) {
    document.getElementById('cantidadPruebas').innerHTML = "";
    document.getElementById('resultadosPruebas').innerHTML = "";
    if (rpta) {
        var b, c;
        var listas = rpta.split('¯');
        b = document.createElement("div");
        b.innerHTML = "<p>Cantidad de pruebas fecha " + txtfechaResultados.value + "</p>";
        c = document.createElement("div");
        c.innerHTML = "<p>Resultados de fecha " + txtfechaResultados.value + "</p>";
        if (listas[0].includes('¬')) {
            lstCantidad = listas[0].split('¬');
            for (var i = 0 in lstCantidad) {
                var LstAmostrar = lstCantidad[i].split('|');
                b.innerHTML += "&nbsp;&nbsp; <label>" + LstAmostrar[0] + "</label>";
                b.innerHTML += "&nbsp; <label>" + LstAmostrar[1] + "</label>";
                document.getElementById('cantidadPruebas').appendChild(b);
            }
        }
        else {
            var lista1 = listas[0].split('|');
            //contadorTrabajdoresCapacitados = contadorTrabajdoresCapacitados + 1;
            //b = document.createElement("div");
            b.innerHTML += "&nbsp;&nbsp; <label>" + lista1[0] + "</label>";
            b.innerHTML += "&nbsp; <label>" + lista1[1] + "</label>";
            document.getElementById('cantidadPruebas').appendChild(b);
        }
        if (listas[1].includes('¬')) {
            lstResultados = listas[1].split('¬');
            for (var i = 0 in lstResultados) {
                var LstAmostrar = lstResultados[i].split('|');
                c.innerHTML += "&nbsp;&nbsp; <label>" + LstAmostrar[0] + "</label>";
                c.innerHTML += "&nbsp; <label>" + LstAmostrar[1] + "</label>";
                document.getElementById('resultadosPruebas').appendChild(c);
            }
        }
        else {
            var lista1 = listas[1].split('|');
            //contadorTrabajdoresCapacitados = contadorTrabajdoresCapacitados + 1;
            //b = document.createElement("div");
            c.innerHTML += "&nbsp;&nbsp; <label>" + lista1[0] + "</label>";
            c.innerHTML += "&nbsp; <label>" + lista1[1] + "</label>";
            document.getElementById('resultadosPruebas').appendChild(c);
        }
    }
    else toastDangerAlert("Error al obtener resultados por fecha", "¡Error!");
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
    document.getElementById("empresasTrabajador").style.display = "none";
    document.getElementById("empresaTrabajador").style.display = "none";
    btnNuevo.style.visibility = "visible";
    if (rpta) {
        if (rpta.substring(0, 2) == "ok") {
            campos = rpta.substring(2, rpta.length).split('¬');
            if (campos[0]) {
                lstDatosTrabajador = campos[0].split('|');
                idEmpresaTrab = lstDatosTrabajador[5] == "" ? 0 : lstDatosTrabajador[5];
                if (idEmpresaTrab == 0) {
                    toastDangerAlert("El colaborador no tiene una Empresa ni puesto asignado", "¡Alerta!");
                    limpiarControles('form-control');
                }
                else {
                    idTrabajador = lstDatosTrabajador[0];
                    txtDocumentoTrabajador.value = lstDatosTrabajador[1];
                    txtNombreTrabajador.value = lstDatosTrabajador[2];
                    numeroPrueba = lstDatosTrabajador[3];
                    txtNumeroPrueba.value = lstDatosTrabajador[3];
                    txtFechaPrueba.value = lstDatosTrabajador[4];

                    resultadoPrueba = parseInt(lstDatosTrabajador[6], 10);
                    idPruebaCovid = 0;
                    document.getElementById("fechaPrueba").style.display = "inline";
                    document.getElementById("numeroPrueba").style.display = "inline";
                    document.getElementById("resultadoPrueba").style.display = "none";
                    document.getElementById("frecuenciaPruebas").style.display = "none";
                    cboResultadoPrueba.value = 1;
                    btnGrabar.style.visibility = 'visible';
                }
                
                //if (resultadoPrueba > 1) {
                //    btnGrabar.style.visibility = 'hidden';
                //} else {
                //    btnGrabar.style.visibility = 'visible';
                //}
            } else {
                limpiarControles('form-control');
            }
        }
        else {
            var campos = rpta.split('¯');
            if (campos[1] == "") {
                limpiarControles('form-control');
                toastDangerAlert("El colaborador no tiene una Empresa ni puesto asignado", "¡Alerta!");
            }
            else {
                lstDatosTrabajador = campos[0].split('|');
                document.getElementById("tituloCovid").innerHTML = "Registrar resultado de prueba";
                document.getElementById("fechaPrueba").style.display = "none";
                document.getElementById("numeroPrueba").style.display = "inline";
                document.getElementById("resultadoPrueba").style.display = "inline";
                document.getElementById("frecuenciaPruebas").style.display = "inline";
                idTrabajador = lstDatosTrabajador[0];
                txtDocumentoTrabajador.value = lstDatosTrabajador[1];
                txtNombreTrabajador.value = lstDatosTrabajador[2];
                numeroPrueba = lstDatosTrabajador[3];
                txtNumeroPrueba.value = lstDatosTrabajador[3];
                idPruebaCovid = parseInt(lstDatosTrabajador[6], 10);
                txtFechaPrueba.value = lstDatosTrabajador[4];
                cboFrecuenciaPruebas.value = 1;
                cboResultadoPrueba.value = 5;
                lstEmpresasDeTrabajador = campos[1].split('¬');
                btnGrabar.style.visibility = 'visible';
                if (lstEmpresasDeTrabajador.length > 1) {
                    var elemento = document.getElementById("cboEmpresasTrabajador");
                    elemento.className += " G";
                    document.getElementById("empresasTrabajador").style.display = "inline";
                    CrearCombo(lstEmpresasDeTrabajador, cboEmpresasTrabajador, "Seleccione");
                }
                else {
                    var elemento = document.getElementById("cboEmpresasTrabajador");
                    elemento.classList.remove("G");
                    lstDatosUnaEmpresa = lstEmpresasDeTrabajador[0].split('|');
                    document.getElementById("empresaTrabajador").style.display = "inline";
                    txtEmpresaTrabajador.value = lstDatosUnaEmpresa[1];
                    idEmpresaTrab = lstDatosUnaEmpresa[0];
                }
            }
        }
    } else {
        limpiarControles('form-control');
        toastDangerAlert("Verificar el estado de trabajo y su puesto de trabajo", "¡Alerta!");
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
        campos = rpta.split('¯');
        lstPrueba = campos[0].split('¬');
        CrearCombo(lstPrueba, cboResultadoPrueba, "Seleccione");
        lstTipoPoblacion = campos[1].split('¬');
        CrearCombo(lstTipoPoblacion, cboPersonalTamizado, "Seleccione");
        lstFrecuenciaPruebas = campos[2].split('¬');
        CrearCombo(lstFrecuenciaPruebas, cboFrecuenciaPruebas, "Seleccione");
    }
}
//function mostrarPuestoTrabajoCbo(rpta) {
//    if (rpta) {
//        lstCboPuesto = rpta.split("¬");
//        CrearCombo(lstCboPuesto, cboPuestoTrabajo, "Seleccione");
//    }
//}
//function mostrarEmpresaCbo(rpta) {
//    if (rpta) {
//        lstCboEmpresa = rpta.split("¬");
//        CrearCombo(lstCboEmpresa, cboEmpresa, "Seleccione");
//    }
//}
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
function MostrarGrabarResultados(rpta) {
    if (rpta == "ok") {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        Http.get("PruebaCovid/ListarResultadoPruebasCovidCsv", crearTablaTodosLosResultados);
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function crearTablaTodosLosResultados(rpta) {
    if (rpta) {
        lstResultadosDias = rpta.split('¬');
        var grillaModal = new GrillaModal(lstResultadosDias, "divTablaPuestos", 10, 3);
    }
}
