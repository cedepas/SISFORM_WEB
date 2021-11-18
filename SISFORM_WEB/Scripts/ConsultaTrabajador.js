var ubigeo;
var lstCboTipoDoc;
var lstCboPuesto;
var lstCboEmpresa;
var idTrabajador;
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
//var objetoParametrizadoPuesto = [];
//var objetoBusquedaPuesto = [];
var filtro;
var textoBusqueda;
//var textoBusquedaPuesto;
var estadoModal;
var lstPuestosTrabajador;
var lstDetalleVacuna;
var idEmpresaPuesto;
var idPuestoTrabajo;
var FK_ID_Vacuna;

window.onload = function () {
    Http.get("Trabajador/ListarTipoDocumentoCbo", mostrarTipoDocumentoCbo);
    Http.get("Trabajador/listarUbigeoCbo", mostrarListaUbigeo);
    Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
    Http.get("Trabajador/ListarUnidadGestionCsv", mostrarUnidadGestionCbo);
    Http.get("Trabajador/ListarSexoCboCsv", mostrarSexoCbo);

    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);

    cboDepartamento.onchange = function () {
        listarProvincias();
    }

    cboProvincia.onchange = function () {
        listarDistritos();
    }

    txtNuDoc.onblur = function () {
        if (cboTipoDocumento.value == 1) {
            Http.get("Trabajador/ValidarDniReniec?DNI=" + txtNuDoc.value, ValidacionDNIPorRENIEC);
        }
    }

    btnGrabar.onclick = function () {
        var frm = new FormData();
        if (idTrabajador) {
            frm.append("ID_Trabajador", idTrabajador);
        }
        frm.append("ID_Trabajador", idTrabajador);
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
        frm.append("familiarContacto", txtFamiliarContacto.value.toUpperCase());
        frm.append("telefonoContacto", txtTelefonoContacto.value);
        frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        frm.append("FK_ID_UnidadGestion", cboUnidadGestion.value);
        frm.append("FK_ID_NivelInstruccion", cboNivelInstruccion.value);
        frm.append("estadoResidencia", (txtEstadoResidencia.checked == true ? "SI" : "NO"));
        frm.append("FK_ID_Sexo", cboSexo.value);
        if (validarRequeridos('T')) {
            Http.post("Trabajador/Grabar", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        //}
        //else {
        //    if (cboTipoDocumento.value == 1) {
        //        Http.get("Trabajador/ValidarDniReniec?DNI=" + txtNuDoc.value, DNIValidado);
        //    }
        //    else {
        //        frm.append("FK_ID_TipoDocumento", cboTipoDocumento.value);
        //        frm.append("numeroDocumento", txtNuDoc.value);
        //        frm.append("nombreTrabajador", txtNombre.value.toUpperCase());
        //        frm.append("apellidoPaterno", txtApePaterno.value.toUpperCase());
        //        frm.append("apellidoMaterno", txtApeMaterno.value.toUpperCase());
        //        frm.append("fechaNacimiento", dtFecNac.value);
        //        frm.append("ubigeo", cboDepartamento.value + cboProvincia.value + cboDistrito.value);
        //        frm.append("referencia", txtReferencia.value.toUpperCase());
        //        frm.append("telefono", txtTelefono.value);
        //        frm.append("direccion", txtDireccion.value.toUpperCase());
        //        frm.append("familiarContacto", txtFamiliarContacto.value.toUpperCase());
        //        frm.append("telefonoContacto", txtTelefonoContacto.value);
        //        frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        //        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        //        frm.append("FK_ID_UnidadGestion", cboUnidadGestion.value);
        //        if (validarRequeridos('T')) {
        //            Http.post("Trabajador/Grabar", MostrarGrabar, frm);
        //        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        //    }
        //}

        //function DNIValidado(rpta) {
        //    if (rpta){
        //        frm.append("FK_ID_TipoDocumento", cboTipoDocumento.value);
        //        frm.append("numeroDocumento", txtNuDoc.value);
        //        frm.append("nombreTrabajador", txtNombre.value.toUpperCase());
        //        frm.append("apellidoPaterno", txtApePaterno.value.toUpperCase());
        //        frm.append("apellidoMaterno", txtApeMaterno.value.toUpperCase());
        //        frm.append("fechaNacimiento", dtFecNac.value);
        //        frm.append("ubigeo", cboDepartamento.value + cboProvincia.value + cboDistrito.value);
        //        frm.append("referencia", txtReferencia.value.toUpperCase());
        //        frm.append("telefono", txtTelefono.value);
        //        frm.append("direccion", txtDireccion.value.toUpperCase());
        //        frm.append("familiarContacto", txtFamiliarContacto.value.toUpperCase());
        //        frm.append("telefonoContacto", txtTelefonoContacto.value);
        //        frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        //        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        //        frm.append("FK_ID_UnidadGestion", cboUnidadGestion.value);
        //        if (validarRequeridos('T')) {
        //            Http.post("Trabajador/Grabar", MostrarGrabar, frm);
        //        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
        //    } else toastDangerAlert("El DNI ingreso no es valido*", "¡Aviso!");
        //}

    }

    btnGrabarPuesto.onclick = function () {
        var frm = new FormData();
        frm.append("ID_TrabajadorPuesto", (txtIdTrabajadorPuesto.value == "" ? "0" : txtIdTrabajadorPuesto.value));
        frm.append("FK_ID_Trabajador", (idTrabajador == "" ? "0" : idTrabajador));
        frm.append("FK_ID_PuestoTrabajo", cboPuestoTrabajo.value);
        frm.append("FK_ID_Empresa", idEmpresaPuesto);
        frm.append("fechaIngreso", txtFechaIngreso.value);
        frm.append("fechaFin", txtFechaSalida.value);
        frm.append("estado", (txtEstadoPuesto.checked == true ? "ACT" : "ANU"));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));

        if (validarRequeridos('P')) {
            Http.post("Trabajador/GrabarPuesto", MostrarGrabarPuesto, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnGrabarVacuna.onclick = function () {
        var frm = new FormData();
        frm.append("ID_DetalleVacuna",(txtiddetallevacuna.value == "" ? "0" : txtiddetallevacuna.value));
        frm.append("FK_ID_Vacuna", cboTipoVacuna.value);
        frm.append("numeroDosis", numeroDosis.value);
        frm.append("fechavacuna", txtFechaVacuna.value);
        frm.append("FK_ID_Trabajador", idTrabajador);
        if (validarRequeridos('T')) {
            Http.post("Trabajador/GrabarVacuna", MostrarGrabarVacuna, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        btnModal.style.visibility = "hidden";
        btnNuevo.style.visibility = "hidden";
        btnModalVacuna.style.visibility = "hidden";
    }

    btnModal.onclick = function () {
        limpiarControles('form-control-modal');
        Http.get("Trabajador/ListarPuestoTrabajoporIdCsv?idTrabajador=" + idTrabajador, CrearTablaCsvPuestos);
    }
    btnModalVacuna.onclick = function () {
        limpiarControles('form-control-modal');        
        Http.get("Trabajador/ListarDetalleVacunaporIdTrabajadorCsv?idTrabajador=" + idTrabajador, CrearTablaCsvVacuna);
        AsignarCamposDetalleVacuna();
        ListarTipoVacuna();
    }
    txtbuscarPorEmpresa.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtbuscarPorEmpresa.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresa.value = this.getElementsByTagName("input")[0].value;
                    idEmpresaPuesto = objeto.IDEmpr;
                    listarPuestoTrabajo();
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    /*/txtPuestoTrabajo.onkeyup = function () {
    //    var a, b;
    //    closeAllListsPuesto();
    //    a = document.createElement("div");
    //    a.setAttribute("id", this.id + "predictivo-list");
    //    a.setAttribute("class", "predictivo-items");
    //    this.parentNode.appendChild(a);
    //    textoBusquedaPuesto = txtPuestoTrabajo.value.toLowerCase();
    //    for (let objeto of objetoBusquedaPuesto) {
    //        let Nombre = objeto.NombrePuesto.toLowerCase();
    //        if (Nombre.indexOf(textoBusquedaPuesto) !== -1) {
    //            b = document.createElement("div");
    //            b.innerHTML = "<strong>" + objeto.NombrePuesto + "</strong>";
    //            b.innerHTML += "<input type='hidden' value='" + objeto.NombrePuesto + "'>";
    //            b.addEventListener("click", function (e) {
    //                txtPuestoTrabajo.value = this.getElementsByTagName("input")[0].value;
    //                idPuestoTrabajo = objeto.IDPuesto;
    //                //listarPuestoTrabajo();
    //                closeAllListsPuesto();
    //            });
    //            a.appendChild(b);
    //        }
    //    }
    /}*/
}
function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusqueda) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
//function closeAllListsPuesto(elmnt) {
//    var x = document.getElementsByClassName("predictivo-items");
//    for (var i = 0; i < x.length; i++) {
//        if (elmnt != x[i] && elmnt != textoBusquedaPuesto) {
//            x[i].parentNode.removeChild(x[i]);
//        }
//    }
//}

function consulta(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        if (cboTipoDocumento.value == 1) {
            Http.get("Trabajador/ValidarDniReniec?DNI=" + txtNuDoc.value, ValidacionDNIPorRENIEC);
        }
    }
}

function ValidacionDNIPorRENIEC(rpta) {
    if (rpta) {
        lstNombres = rpta.split("|");
        document.getElementById('txtNombre').value = lstNombres[3].replace('&Aacute;', 'Á').replace('&Eacute;', 'É').replace('&Iacute;', 'Í').replace('&Oacute;', 'Ó').replace('&Uacute;', 'Ú').replace('&Ntilde', 'Ñ');
        document.getElementById('txtApePaterno').value = lstNombres[1].replace('&Aacute;', 'Á').replace('&Eacute;', 'É').replace('&Iacute;', 'Í').replace('&Oacute;', 'Ó').replace('&Uacute;', 'Ú').replace('&Ntilde', 'Ñ');
        document.getElementById('txtApeMaterno').value = lstNombres[2].replace('&Aacute;', 'Á').replace('&Eacute;', 'É').replace('&Iacute;', 'Í').replace('&Oacute;', 'Ó').replace('&Uacute;', 'Ú').replace('&Ntilde', 'Ñ');
    } else toastDangerAlert("El DNI Digitado no existe existe en RENIEC*", "¡Aviso!");
}

function mostrarTipoDocumentoCbo(rpta) {
    if (rpta) {
        campos = rpta.split("¯");
        lstCboTipoDoc = campos[0].split("¬");
        CrearCombo(lstCboTipoDoc, cboTipoDocumento, "Seleccione");
        lstCboUnidadGestionDoc = campos[1].split("¬");
        CrearCombo(lstCboUnidadGestionDoc, cboUnidadGestion, "Seleccione");
        lstCboNivelInstruccion = campos[2].split("¬");
        CrearCombo(lstCboNivelInstruccion, cboNivelInstruccion, "Seleccione");
    }
}

function mostrarUnidadGestionCbo(rpta) {
    if (rpta) {
        lstCboUnidadGestionDoc = rpta.split("¬");
        CrearCombo(lstCboUnidadGestionDoc, cboUnidadGestion, "Seleccione");
    }
}
function mostrarSexoCbo(rpta) {
    if (rpta) {
        lstCboSexo = rpta.split("¬");
        CrearCombo(lstCboSexo, cboSexo, "Seleccione");
    }
}

function mostrarPuestoTrabajoCbo(rpta) {
    if (rpta) {
        lstCboPuesto = rpta.split("¬");
        CrearCombo(lstCboPuesto, cboPuestoTrabajo, "Seleccione");
        cboPuestoTrabajo.value = idPuestoTrabajo;
    }
}
function mostrarTipoVacunaCbo(rpta) {
    if (rpta) {
        lstCboTipoVacuna = rpta.split("¬");
        CrearCombo(lstCboTipoVacuna, cboTipoVacuna, "Seleccione");
    }
}

function mostrarEmpresaCbo(rpta) {
    if (rpta) {
        lstCboEmpresa = rpta.split("¬");
        CrearCombo(lstCboEmpresa, cboEmpresa, "Seleccione");
    }
}
function listarPuestoTrabajo() {
    Http.get("Trabajador/ListarPuestoTrabajoPorEmpresaCboCsv?idEmpresa=" + idEmpresaPuesto, mostrarPuestoTrabajoCbo);
}
function ListarTipoVacuna() {
    Http.get("Trabajador/ListarTipoVacunaCboCsv", mostrarTipoVacunaCbo);
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
            Http.get("Trabajador/ListarPuestoTrabajoporIdCsv?idTrabajador=" + idTrabajador, CrearTablaCsvPuestos);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtIdTrabajadorPuesto.value = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarGrabarVacuna(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Trabajador/ListarDetalleVacunaporIdTrabajadorCsv?idTrabajador=" + idTrabajador, CrearTablaCsvVacuna);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        txtiddetallevacuna.value = rpta;
    }
    else {
        toastDangerAlert("No se pudo grabar el registro", "¡Error!");
    }
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function CrearTablaCsvPuestos(rpta) {
    document.getElementById("divTablaPuestos").innerHTML = "";
    if (rpta) {
        lstPuestosTrabajador = rpta.split('¬');
        var grillaModal = new GrillaModal(lstPuestosTrabajador, "divTablaPuestos", 10, 3);
    }
}
function CrearTablaCsvVacuna(rpta) {
    document.getElementById("divTablaDetalleVacuna").innerHTML = "";
    if (rpta) {
        lstDetalleVacuna = rpta.split('¬');
        var grillaModal = new GrillaModal(lstDetalleVacuna, "divTablaDetalleVacuna", 10, 3);
    }

}

function CrearListaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}

function crearObjeto() {
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusqueda = [];
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizado[i][j];
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusqueda.push(valoresAInsertar);
    }
}
//function CrearListaPuestoCsv(rpta) {
//    if (rpta) {
//        listaPuesto = rpta.split('¬');
//        crearObjetoPuesto(listaPuesto)
//    }
//}

//function crearObjetoPuesto() {
//    cabeceras = listaPuesto[0].split("|");
//    var nRegistros = listaPuesto.length;
//    var nCampos = cabeceras.length;
//    objetoBusquedaPuesto = [];
//    var clave;
//    var valor;
//    for (var i = 1; i <= nRegistros - 1; i++) {
//        for (var j = 0; j < nCampos; j++) {
//            datos = listaPuesto[i].split("|");
//        }
//        objetoParametrizadoPuesto.push(datos);
//    }
//    for (var i = 0; i < nRegistros - 1; i++) {
//        var valoresAInsertar = {};
//        for (var j = 0; j < nCampos; j++) {
//            clave = cabeceras[j];
//            valor = objetoParametrizadoPuesto[i][j];
//            Object.defineProperty(valoresAInsertar, clave.toString(), {
//                value: valor,
//                writable: false
//            });
//        }
//        objetoBusquedaPuesto.push(valoresAInsertar);
//    }
//}

function obtenerRegistroPorId(id) {

    Http.get("Trabajador/ObtenerTrabajadorPorId?idTrabajador=" + id, AsignarCampos);
    Http.get("Trabajador/ListarPuestoTrabajoporIdCsv?idTrabajador=" + id, CrearTablaCsvPuestos);

}

function modalObtenerRegistroPorId(id) {
    Http.get("Trabajador/ListarPuestoTrabajoporIdTrabajadorPuestoCsv?idTrabajadorPuesto=" + id, AsignarCamposPuestoTrabajo);
}

function AsignarCamposPuestoTrabajo(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        Http.get("Trabajador/ListarPuestoTrabajoPorEmpresaCboCsv?idEmpresa=" + campos[6], mostrarPuestoTrabajoCbo);
        txtIdTrabajadorPuesto.value = campos[0];
        txtbuscarPorEmpresa.value = campos[1];
        //txtPuestoTrabajo.value = campos[2];
        txtFechaIngreso.value = campos[3];
        txtFechaSalida.value = campos[4];
        idEmpresaPuesto = campos[6];
        txtEstadoPuesto.checked = (campos[5] == "ACT" ? true : false);
        idPuestoTrabajo = campos[7];
    } else limpiarControles('form-control-modal');
}
function AsignarCamposDetalleVacuna() {
    {
        txtiddetallevacuna.value = "";
        lblNombreTrabajador.value = txtNombre.value
    }
}

function AsignarCampos(rpta) {
    if (rpta) {
        btnModal.style.visibility = "visible";
        btnNuevo.style.visibility = "visible";
        btnModalVacuna.style.visibility = "visible";
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
            cboUnidadGestion.value = campos[14];
            cboNivelInstruccion.value = campos[15];
            cboSexo.value = campos[16];
        }
        limpiarControles('P')

        //if (listas[1]) {
        //    campos = listas[1].split('|');
        //    txtIdTrabajadorPuesto.value = campos[0];
        //    cboPuestoTrabajo.value = campos[1];
        //    txtbuscarPorEmpresa.value = campos[2];
        //    txtFechaIngreso.value = campos[3];
        //    txtFechaSalida.value = campos[4];
        //    txtEstadoPuesto.checked = (campos[5] == "ACT" ? true : false);
        //} else {
        //    limpiarControles('P')
        //}
    }
}
