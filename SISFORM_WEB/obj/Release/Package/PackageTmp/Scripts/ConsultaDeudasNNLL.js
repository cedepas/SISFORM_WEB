var idUsuario
var idNNLL;
var idEmpresaEMC;
var objetoParametrizado = [];
var objetoParametrizadoECM = [];
var objetoBusqueda = [];
var objetoBusquedaECM = [];
var filtro;
var textoBusqueda;
var textoBusquedaECM;
var FK_ID_UnidadGestion;
var fechaActual;
var idDeuda;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarTipoEmpresaCbo", mostrarTipoEmpresaCbo);
        Http.get("SeguimientoNegocios/ListarDuedasNNLLCsv", CrearTablaCsv);
        Http.get("Trabajador/ListarEmpresasEspecializadasCsv", CrearListaECMs);
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaValorizacion.value = fechaActual;

    cboTipoEmpresa.onchange = function () {
        Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + cboTipoEmpresa.value, mostrarEmpresaPorTipoCbo);
    }

    txtEmpresaNNLL.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtEmpresaNNLL.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtEmpresaNNLL.value = this.getElementsByTagName("input")[0].value;
                    idNNLL = objeto.IDEmpr;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }

    txtEmpresaECM.onkeyup = function () {
        var a, b;
        closeAllListsECM();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaECM = txtEmpresaECM.value.toLowerCase();
        for (let objeto of objetoBusquedaECM) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusquedaECM) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtEmpresaECM.value = this.getElementsByTagName("input")[0].value;
                    idEmpresaEMC = objeto.IDEmpr;
                    closeAllListsECM();
                });
                a.appendChild(b);
            }
        }
    }
    btnGrabarDeuda.onclick = function () {
        var frm = new FormData();
        if (idDeuda) {
            frm.append("id_deudaNNLL", idDeuda);
        }
        frm.append("id_deudaNNLL", idDeuda);
        frm.append("FK_ID_NNLL", idNNLL);
        frm.append("FK_ID_ECM", idEmpresaEMC);
        frm.append("añoDeuda", añoDeuda.value);
        frm.append("mes", cboMesDeuda.value);
        frm.append("montoValorizacion", txtMontoDeuda.value);
        frm.append("fechaValorizacion", txtFechaValorizacion.value);
        frm.append("estadoValorizacion", (txtEstadoValorizacion.checked == true ? 1 : 0));
        frm.append("FK_ID_UsuarioCrea", idUsuario);
        frm.append("FechaOrdenServicioECM", txtFechaOrdenServicioECM.value);
        frm.append("EstadoOrdenServicioECM", (txtOrdenServicioECM.checked == true ? 1 : 0));
        frm.append("fechaFacturacion", txtFechaFacturacion.value);
        frm.append("estadoFacturacion", (txtEstadoFacturacion.checked == true ? 1 : 0));
        frm.append("fechaPago", txtFechaPago.value);
        frm.append("estadoPago", (txtEstadoPago.checked == true ? 1 : 0));
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarDeuda);
            Http.post("SeguimientoNegocios/GrabarDeuda", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    bntNuevo.onclick = function () {
        location.reload();
    }
}

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
}

function MostrarGrabar(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la incidencia fue correcto", "¡Exito!");
        if (!isMobile.any()) {
            Http.get("SeguimientoNegocios/ListarDuedasNNLLCsv", CrearTablaCsv);
        }
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function mostrarTipoEmpresaCbo(rpta) {
    if (rpta) {
        lstCboTipoEmpresa = rpta.split("¬");
        lstCboTipoEmpresa.shift();
        lstCboTipoEmpresa.splice(3, 1);
        lstCboTipoEmpresa.pop();
        lstCboTipoEmpresa.pop();
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
        var lstMeses = [
            "1|ENERO", "2|FEBRERO", "3|MARZO",
            "4|ABRIL", "5|MAYO", "6|JUNIO", "7|JULIO",
            "8|AGOSTO", "9|SEPTIEMBRE", "10|OCTUBRE",
            "11|NOVIEMBRE", "12|DICIEMBRE"
        ]
        CrearCombo(lstMeses, cboMesDeuda, "Seleccione");
    }
}
function mostrarEmpresaPorTipoCbo(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista);
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
function obtenerRegistroPorId(id) {
    Http.get("SeguimientoNegocios/ObtenerDeudaNNLLPorIdCsv?idDeuda=" + id, AsignarCamposDeudasNNLL);
}
function AsignarCamposDeudasNNLL(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        idDeuda = campos[0];
        idNNLL = campos[1];
        txtEmpresaNNLL.value = campos[2];
        cboTipoEmpresa.value = campos[3];
        idEmpresaEMC = campos[4];
        txtEmpresaECM.value = campos[5];
        añoDeuda.text = campos[6];
        cboMesDeuda.value = campos[7];
        txtFechaValorizacion.value = campos[8];
        txtMontoDeuda.value = campos[9];
        txtEstadoValorizacion.checked = (campos[10] == 1 ? true : false);
        txtFechaOrdenServicioECM.value = campos[11];
        txtOrdenServicioECM.checked = (campos[12] == 1 ? true : false);
        txtFechaFacturacion.value = campos[13];
        txtEstadoFacturacion.checked = (campos[14] == 1 ? true : false);
        txtFechaPago.value = campos[15];
        txtEstadoPago.checked = (campos[16] == 1 ? true : false);
    } else limpiarControles('form-control-modal');
}

function closeAllListsECM(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != objetoBusquedaECM) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
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
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function CrearListaECMs(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoECMs(lista)
    }
}
function ListaTemaCapacitacionCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoTemaCapacitacion(lista)
    }
}
function crearObjeto() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusqueda = [];
    //var nCamposObejetoFinal = 3;
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
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizado[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusqueda.push(valoresAInsertar);
    }
}
function crearObjetoECMs() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusquedaECM = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoECM.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoECM[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaECM.push(valoresAInsertar);
    }
}

