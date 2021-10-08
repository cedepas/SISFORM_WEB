var lstCboTipoEmpresa;
var idTipoEmpresa;
var idStakeholder;
var idStakeholderSuceso;
var idCategoriaSuceso;
var idEspecificacionSuceso;
var lista;
var objetoBusqueda = [];
var objetoBusquedaTrabajador = [];
var objetoParametrizado = [];
var textoBusqueda;
var objetoParametrizadoTrabajador =[];

var objetoBusquedaECM = [];
var objetoParametrizadoECM = [];
var textoBusquedaECM;

var idTrabajador;
var idEmpresaECM;
var idTrabajadorRes;
var idTrabajadorSup;

window.onload = function () {
    if (!isMobile.any()) {
        document.querySelectorAll('.form-row').forEach(function (element) {
            element.classList.add('row-eq-spacing-sm');
        });
    }

    document.querySelectorAll('.servicio').forEach(function (element) {
        element.addEventListener('change', function () {
            txtTotalServicios.value =
                parseInt(txtAlojamiento.value ? txtAlojamiento.value : 0) +
                parseInt(txtComedor.value ? txtComedor.value : 0) +
                parseInt(txtTransporte.value ? txtTransporte.value : 0) +
                parseInt(txtLavanderia.value ? txtLavanderia.value : 0) +
                parseInt(txtCompania.value ? txtCompania.value : 0) +
                parseInt(txtRiesgo.value ? txtRiesgo.value : 0) +
                parseInt(txtOtros.value ? txtOtros.value : 0);
        });
    });

    document.getElementById('txtBuscarPorTrabajador').addEventListener('search', function () {
        txtBuscarPorTrabajador.value = "";
        closeAllLists();
        btnNuevo.dispatchEvent(new Event('click'));
    });

    Http.get("Trabajador/ListarTrabajadorRepresentanteCsv", mostrarListarTrabajador);
    Http.get("Incidencia/ListarTrabajadorBusquedaCsv", mostrarListarTrabajadorBusquedaCsv);
    Http.get("Stakeholder/ListarPoderConvocatoriaCbo", mostrarPoderConvocatoria);
    Http.get("Stakeholder/ListarTipoPosicionamientoCbo", mostrarPosicion);
    Http.get("Stakeholder/ListarStakeholderCsv", CrearTablaCsv);

    cboPosicion.onchange = function () {
        var element = document.getElementById("PosicionColor");
        switch (cboPosicion.value) {
            case '':
                element.classList.remove("bg-success");
                element.classList.remove("bg-danger");
                element.classList.remove("bg-primary");
                break;
            case '1':
                element.classList.remove("bg-primary");
                element.classList.remove("bg-danger");
                element.classList.add("bg-success");
                break;
            case '2':
                element.classList.remove("bg-danger");
                element.classList.remove("bg-success");
                element.classList.add("bg-primary");
                break;
            case '3':
                element.classList.remove("bg-primary");
                element.classList.remove("bg-danger");
                element.classList.add("bg-danger");
                break;
        }
    }

    txtBuscarPorTrabajador.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtBuscarPorTrabajador.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarPorTrabajador.value = this.getElementsByTagName("input")[0].value;
                    idTrabajador = objeto.IDTrab;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (!txtBuscarPorTrabajador.value) {
            txtBuscarPorTrabajador.value = "";
            closeAllLists();
            btnNuevo.dispatchEvent(new Event('click'));
        }
    }
    txtBuscarResponsable.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtBuscarResponsable.value.toLowerCase();
        for (let objeto of objetoBusquedaTrabajador) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarResponsable.value = this.getElementsByTagName("input")[0].value;
                    idTrabajadorRes = objeto.IDTrab;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (!txtBuscarPorTrabajador.value) {
            txtBuscarPorTrabajador.value = "";
            closeAllLists();
            btnNuevo.dispatchEvent(new Event('click'));
        }
    }
    txtBuscarSupervisor.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtBuscarSupervisor.value.toLowerCase();
        for (let objeto of objetoBusquedaTrabajador) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarSupervisor.value = this.getElementsByTagName("input")[0].value;
                    idTrabajadorSup = objeto.IDTrab;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (!txtBuscarPorTrabajador.value) {
            txtBuscarPorTrabajador.value = "";
            closeAllLists();
            btnNuevo.dispatchEvent(new Event('click'));
        }
    }
    txtBuscarPorECM.onkeyup = function () {
        var a, b;
        closeAllListsECM();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaECM = txtBuscarPorECM.value.toLowerCase();
        for (let objeto of objetoBusquedaECM) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusquedaECM) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarPorECM.value = this.getElementsByTagName("input")[0].value;
                    idEmpresaECM = objeto.IDEmpr;
                    closeAllListsECM();
                });
                a.appendChild(b);
            }
        }
        if (!txtBuscarPorTrabajador.value) {
            txtBuscarPorTrabajador.value = "";
            closeAllLists();
            btnNuevo.dispatchEvent(new Event('click'));
        }
    }

    btnGuardar.onclick = function () {
        var frm = new FormData();
        if (idStakeholder) { frm.append("ID_Stakeholder", idStakeholder); }
        frm.append("FK_ID_Trabajador", idTrabajador);
        frm.append("FK_ID_PoderConvocatoria", cboPoderConvocatoria.value);
        frm.append("FK_ID_TipoPosicionamiento", cboPosicion.value);
        frm.append("transporte", txtTransporte.value);
        frm.append("compania", txtCompania.value);
        frm.append("riesgo", txtRiesgo.value);
        frm.append("otros", txtOtros.value);
        frm.append("fecha", txtFechaStakeholder.value);
        frm.append("analisis", txtAnalisis.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGuardar);
            Http.post("Stakeholder/GrabarStakeholder", MostrarGrabarStakeholder, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnGuardarSuceso.onclick = function () {
        var frm = new FormData();
        if (idStakeholderSuceso) { frm.append("ID_QuejasECM_NNLL", idStakeholderSuceso); }
        frm.append("FK_ID_Stakeholder", idStakeholder);
        frm.append("FK_ID_EmpresaNNLL", cboNNLL.value);
        frm.append("FK_ID_EmpresaECM", idEmpresaECM);
        frm.append("FK_ID_EstadoSuceso", cboEstadoSuceso.value);
        frm.append("FK_ID_TipoSuceso", cboTipoSuceso.value);
        frm.append("detalleSuceso", txtDetalleSuceso.value);
        //frm.append("accionesSuceso", txtAccionesSuceso.value); quitar del controller
        frm.append("detalleCompromiso", txtCompromisoPropietario.value);
        frm.append("fechaReporte", txtFechaReporte.value);
        //frm.append("fechaInicio", txtFechaInicio.value);
        //frm.append("fechaCierre", txtFechaCierre.value);
        frm.append("AceptacionQueda", (txtAceptaQueja.checked == true ? 1 : 0));
        frm.append("FK_ID_Usuario", window.sessionStorage.getItem('idUsuario'));
        frm.append("FK_ID_CategoriaSuceso", idCategoriaSuceso);
        frm.append("FK_ID_EspecificacionSuceso", cboEspecificacionSuceso.value);
        frm.append("detalleAceptacionQueja", txtdetalleAceptacionQueja.value);
        frm.append("FK_ID_SupFirmaActa", idTrabajadorSup);
        frm.append("fechaInicioSeguimiento", txtFechaInicioSeg.value);
        frm.append("fechaCierreSeguimiento", txtFechaCierreSeg.value);
        frm.append("fechaInicioPlandeAccion", txtFechaInicioPlan.value);
        frm.append("fechaCierrePlandeAccion", txtFechaCierrePlan.value);
        frm.append("FK_ID_ResponsableComedor", idTrabajadorRes);
        frm.append("fechaFirmadeActa", txtFechaFirmaDeActa.value);
        if (validarRequeridos('SE')) {
            checkSubmit(btnGuardarSuceso);
            Http.post("Stakeholder/GrabarStakeholderSuceso", MostrarGrabarStakeholderSuceso, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }
    btnModalSuceso.onclick = function () {
        limpiarControles("SE");
        Http.get("Trabajador/ListarEmpresasEspecializadasCsv", mostrarECM);
        Http.get("Stakeholder/ListarEstadoSucesoCboCsv", mostrarEstadoSuceso);
        Http.get("Stakeholder/ListarTipoSucesoCboCsv", mostrarTipoSuceso);
        Http.get("Stakeholder/ListarCategoriaSucesoCboCsv", mostrarCategoriaSuceso);
     //   Http.get("Stakeholder/ListarEspecificacionSucesoCboCsv", mostrarEspecificacionSuceso);
        Http.get("Stakeholder/ListarStakeholderSucesoPorIdStakeholderCsv?idStakeholder=" + idStakeholder, CrearTablaCsvSucesos);
        Http.get("Stakeholder/ListarEmpresasPorIDStakeHoldersCsv?idStakeholder=" + idStakeholder, mostrarEmpresasDeStakeHolder);
    }
    cboCategoriaSuceso.onchange = function () {
        idCategoriaSuceso = cboCategoriaSuceso.value;
        ListarEspecificacionSucesoCbo();
    }
    btnNuevo.onclick = function () {
        limpiarControles("form-control");
        document.querySelectorAll('.servicio').forEach(function (element) {
            element.value = 0;
        });
        btnGuardar.value = "Guardar";
        idTrabajador = undefined;
        idStakeholder = undefined;
        cboPosicion.value = '';
        cboPosicion.dispatchEvent(new Event('change'));
        btnNuevo.style.visibility = "hidden";
        btnModalSuceso.style.display = "none";
    }
    btnNuevoSuceso.onclick = function () {
        limpiarControles("SE");
        btnNuevoSuceso.style.visibility = "hidden";
        btnGuardarSuceso.value = "Guardar";
        idStakeholderSuceso = undefined;
      /*  cboECM.value = '';*/
    }
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        new Grilla(lista, "divTabla", 10, 3);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Stakeholder/ObtenerStakeholderPorIdCsv?idStakeholder=" + id, function (rpta) {
        if (rpta) {
            var campos = rpta.split('|');
            idStakeholder = campos[0];
            idTrabajador = campos[1];
            txtBuscarPorTrabajador.value = campos[2];
            cboPosicion.value = campos[5];
            cboPosicion.dispatchEvent(new Event('change'));
            cboPoderConvocatoria.value = campos[3];
            cboPoderConvocatoria.text = campos[6];
            txtAlojamiento.value = campos[7];
            txtComedor.value = campos[8];
            txtTransporte.value = campos[9];
            txtLavanderia.value = campos[10];
            txtCompania.value = campos[11];
            txtRiesgo.value = campos[12];
            txtOtros.value = campos[13];
            txtFechaStakeholder.value = campos[14];
            txtAnalisis.value = campos[15];
            txtTotalServicios.dispatchEvent(new Event('change'));
            btnNuevo.style.visibility = "visible";
            btnModalSuceso.style.display = "inline-block";
            btnNuevoSuceso.style.visibility = "hidden";
            btnGuardar.value = "Guardar";
        } else {
            limpiarControles('form-control');
        }
    });
}

function CrearTablaCsvSucesos(rpta) {
    lstSucesosStakeholder = rpta.split('¬');
    new GrillaModal(lstSucesosStakeholder, "divTablaSucesos", 10, 3);
}

function MostrarGrabarStakeholder(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Stakeholder/ListarStakeholderCsv", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        btnNuevo.dispatchEvent(new Event('click'));
        btnGuardar.value = "Guardar";
        btnGuardar.disabled = false;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function MostrarGrabarStakeholderSuceso(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Stakeholder/ListarStakeholderSucesoPorIdStakeholderCsv?idStakeholder=" + idStakeholder, CrearTablaCsvSucesos);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        btnNuevoSuceso.dispatchEvent(new Event('click'));
        btnGuardarSuceso.value = "Guardar";
        btnGuardarSuceso.disabled = false;
        Http.get("Stakeholder/ListarStakeholderCsv", CrearTablaCsv);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function modalObtenerRegistroPorId(id) {
    Http.get("Stakeholder/ObtenerStakeholderSucesoPorIdCsv?idStakeholderSuceso=" + id, function (rpta) {
        if (rpta) {
            var campos = rpta.split('|');
            idStakeholderSuceso = campos[0];
            /*txtBuscarPorECM.text = campos[2];*/
            txtBuscarPorECM.value = campos[2];
            idEmpresaECM = campos[1]
            cboNNLL.value = campos[3];
            cboNNLL.text = campos[4];
            cboEstadoSuceso.value = campos[5];
            cboEstadoSuceso.text = campos[6];
            Http.get("Stakeholder/ListarTipoSucesoCboCsv", mostrarTipoSucesoesp);
            cboTipoSuceso.value = campos[7];            
            cboTipoSuceso.text = campos[8];
            cboCategoriaSuceso.value = campos[9]
            idCategoriaSuceso = campos[9]
            ListarEspecificacionSucesoCboesp();
            cboCategoriaSuceso.text = campos[10]
            cboEspecificacionSuceso.value = campos[11]
            cboEspecificacionSuceso.text = campos[12]
            txtDetalleSuceso.value = campos[13];
            txtCompromisoPropietario.value = campos[14];
            txtdetalleAceptacionQueja.value = campos[15];
            txtFechaReporte.value = campos[16];
            txtFechaInicioSeg.value = campos[17] ? campos[17] : '';
            txtFechaCierreSeg.value = campos[18] ? campos[18] : '';
            txtFechaInicioPlan.value = campos[19] ? campos[19]:'';
            txtFechaCierrePlan.value = campos[20] ? campos[20]:'';
            campos[21] == 1 ? txtAceptaQueja.checked == true : txtAceptaQueja.checked == false ;
            txtFechaFirmaDeActa.value = campos[22];
            txtBuscarSupervisor.value = campos[23];
            idTrabajadorSup = campos[23];
            txtBuscarSupervisor.text = campos[24];
            txtBuscarResponsable.value = campos[25];
            idTrabajadorRes = campos[25];
            txtBuscarResponsable.text = campos[26];
            btnNuevoSuceso.style.visibility = "visible";
        } else {
            limpiarControles('SE');
        }
    });
}

function mostrarECM(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoECM(lista);
    }
}

function mostrarEstadoSuceso(rpta) {
    if (rpta) {
        lstCboEstadoSuceso = rpta.split('¬');
        CrearCombo(lstCboEstadoSuceso, cboEstadoSuceso, "Seleccione");
    }
}

function mostrarTipoSuceso(rpta) {
    if (rpta) {
        lstCboTipoSuceso = rpta.split('¬');
        CrearCombo(lstCboTipoSuceso, cboTipoSuceso, "Seleccione");
    }
}
function mostrarTipoSucesoesp(rpta) {
    if (rpta) {
        lstCboTipoSuceso = rpta.split('¬');
        CrearCombo(lstCboTipoSuceso, cboTipoSuceso,);
    }
}
function mostrarCategoriaSuceso(rpta) {
    if (rpta) {
        lstCboCategoriaSuceso = rpta.split('¬');
        CrearCombo(lstCboCategoriaSuceso, cboCategoriaSuceso, "Seleccione");
    }
}
function ListarEspecificacionSucesoCbo() {
    Http.get("Stakeholder/ListarEspecificacionSucesoCboCsv?ID_CategoriaSuceso=" + idCategoriaSuceso, mostrarEspecificacionSuceso);

}
function ListarEspecificacionSucesoCboesp() {
    Http.get("Stakeholder/ListarEspecificacionSucesoCboCsv?ID_CategoriaSuceso=" + idCategoriaSuceso, mostrarEspecificacionSucesoesp);

}

function mostrarEspecificacionSuceso(rpta) {
    if (rpta) {
        lstCboEspecificacionSuceso = rpta.split('¬');
        CrearCombo(lstCboEspecificacionSuceso, cboEspecificacionSuceso, "Seleccione");
    }
}
function mostrarEspecificacionSucesoesp(rpta) {
    if (rpta) {
        lstCboEspecificacionSuceso = rpta.split('¬');
        CrearCombo(lstCboEspecificacionSuceso, cboEspecificacionSuceso);
    }
}

function mostrarEmpresasDeStakeHolder(rpta) {
    if (rpta) {
        lstCboEmpresasStakeHolder = rpta.split('¬');
        CrearCombo(lstCboEmpresasStakeHolder, cboNNLL, "Seleccione");
    }
}

function mostrarPosicion(rpta) {
    if (rpta) {
        lstCboPosicion = rpta.split('¬');
        CrearCombo(lstCboPosicion, cboPosicion, "Seleccione");
    }
}

function mostrarPoderConvocatoria(rpta) {
    if (rpta) {
        lstCboPoderConvocatoria = rpta.split('¬');
        CrearCombo(lstCboPoderConvocatoria, cboPoderConvocatoria, "Seleccione");
    }
}

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusqueda) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function closeAllListsECM(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusquedaECM) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function mostrarListarTrabajador(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoAllTrabajador(lista)
    }
}
function mostrarListarTrabajadorBusquedaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoTrabajadorBusqueda(lista)
    }
}

function crearObjetoAllTrabajador() {
    objetoBusqueda = [];
    objetoParametrizado = [];
    cabeceras = lista[0].split('|');
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split('|');
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 0; i < (nRegistros - 1); i++) {
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
function crearObjetoTrabajadorBusqueda() {
    objetoBusquedaTrabajador = [];
    objetoParametrizadoTrabajador = [];
    cabeceras = lista[0].split('|');
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split('|');
        }
        objetoParametrizadoTrabajador.push(datos);
    }
    for (var i = 0; i < (nRegistros - 1); i++) {
        var valoresAInsertar = {};
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoTrabajador[i][j];
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaTrabajador.push(valoresAInsertar);
    }
}

function crearObjetoECM() {
    objetoBusquedaECM = [];
    objetoParametrizadoECM = [];
    cabeceras = lista[0].split('|');
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split('|');
        }
        objetoParametrizadoECM.push(datos);
    }
    for (var i = 0; i < (nRegistros - 1); i++) {
        var valoresAInsertar = {};
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoECM[i][j];
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaECM.push(valoresAInsertar);
    }
}