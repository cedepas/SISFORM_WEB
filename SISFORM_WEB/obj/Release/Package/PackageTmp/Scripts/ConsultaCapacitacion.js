var idUsuario
var idEmpresa;
var idTipoEmpresa;
var objetoParametrizado = [];
var objetoParametrizadoTrabajador = [];
var objetoParametrizadoTemaCapacitacion = [];
var objetoBusqueda = [];
var objetoBusquedaTrabajador = [];
var objetoBusquedaTemaCapacitacion = [];
var filtro;
var textoBusqueda;
var textoBusquedaTrabajador;
var textoBusquedaTemaCapacitacion;
var idTrabajadorCapacitado;
var DNITrabajador;
var idTemaCapacitacion;
var lstTrabajadoresCapacitados;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("SeguimientoNegocios/ListarCapacitacionesCsv?idUsuario=" + idUsuario, CrearTablaCsv);
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        Http.get("Incidencia/ListarTrabajadorBusquedaCsv", CrearListaTrabajadorCsv);
        Http.get("SeguimientoNegocios/ListarEstadoCapacitacionCsv", mostrarEstadoCapacitacionCbo);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaCapacitacion.value = fechaActual;

    btnGrabarCapacitacion.onclick = function () {
        var frm = new FormData();
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("FK_ID_EstadoInspeccion", cboTipoInspeccion.value);
        frm.append("FK_ID_Usuario", idUsuario);
        frm.append("fechaInspeccion", txtFechaInspeccion.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarInspeccion);
            Http.post("SeguimientoNegocios/GrabarInspeccion?op=I", MostrarRegistroInspeccion, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
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
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresa.value = this.getElementsByTagName("input")[0].value;
                    idEmpresa = objeto.IDEmpr;
                    idTipoEmpresa = objeto.TipoEmpresa;
                    obtenerTipoServicio(objeto.TipoEmpresa);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }

    txtBuscarTrabajador.onkeyup = function () {
        var a, b;
        closeAllListsTrabajador();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaTrabajador = txtBuscarTrabajador.value.toLowerCase();
        for (let objeto of objetoBusquedaTrabajador) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusquedaTrabajador) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarTrabajador.value = this.getElementsByTagName("input")[0].value;
                    idTrabajadorCapacitado = objeto.IDTrab;
                    DNITrabajador = objeto.DNI;
                    closeAllListsTrabajador();
                });
                a.appendChild(b);
            }
        }
    }
    txtBuscaTemaCapacitacion.onkeyup = function () {
        var a, b;
        closeAllListsTemaCapacitacion();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaTemaCapacitacion = txtBuscaTemaCapacitacion.value.toLowerCase();
        for (let objeto of objetoBusquedaTemaCapacitacion) {
            let Nombre = objeto.NombreTemaCapa.toLowerCase();
            if (Nombre.indexOf(textoBusquedaTemaCapacitacion) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreTemaCapa + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreTemaCapa + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscaTemaCapacitacion.value = this.getElementsByTagName("input")[0].value;
                    idTemaCapacitacion = objeto.IDTemaCapa;
                    closeAllListsTemaCapacitacion();
                });
                a.appendChild(b);
            }
        }
    }

    bntAgregarTrabajador.onclick = function () {
        if (txtBuscarTrabajador.value != "") {
            if (idTrabajadorCapacitado === undefined) {
                toastDangerAlert("Seleccione un trabajador para ser agregado en la capacitación", "¡Error!");
            }
            else {
                lstTrabajadoresCapacitados = idTrabajadorCapacitado + "|";
                var b;
                b = document.createElement("tr");
                b.innerHTML = "<td>" + txtBuscarTrabajador.value.substring(0, txtBuscarTrabajador.value.length - 8);  + "</td>";
                b.innerHTML += "<td>" + DNITrabajador + "</td>";
                document.getElementById('TrabajadoresCapacitados').appendChild(b);
                txtBuscarTrabajador.value = "";
                idTrabajadorCapacitado = undefined;
            }
        } else toastDangerAlert("Digite datos del trabajador", "¡Error!");
        
        
    }
    cboTipoServicio.onchange = function () {
        idTipoServicio = cboTipoServicio.value;
        Http.get("SeguimientoNegocios/ListarTemaCapacitacionCsv?tipoEmpresa=" + idTipoEmpresa + "&tipoServicio=" + cboTipoServicio.value, ListaTemaCapacitacionCsv);
    }

    bntNuevo.onclick = function () {
        limpiarControles('form-control');
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
function closeAllListsTrabajador(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != objetoBusquedaTrabajador) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
function closeAllListsTemaCapacitacion(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != objetoBusquedaTemaCapacitacion) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
function obtenerTipoServicio(tipoEmpresa) {
    Http.get("SeguimientoNegocios/ListarTipoOperacionEmpresaCsv?tipoEmpresa=" + tipoEmpresa, mostrarTipoServicioCbo);
}
function mostrarTipoServicioCbo(rpta) {
    if (rpta) {
        lstCboTipoServicio = rpta.split("¬");
        if (lstCboTipoServicio.length >= 2) {
            tipoServicio.style.display = "inline-block";
            CrearCombo(lstCboTipoServicio, cboTipoServicio, "Seleccione");
        }
        else {
            lstCboTipoDeServicio = lstCboTipoServicio[0].split("|");
            idTipoServicio = lstCboTipoDeServicio[0];
            Http.get("SeguimientoNegocios/ListarTemaCapacitacionCsv?tipoEmpresa=" + idTipoEmpresa + "&tipoServicio=" + lstCboTipoDeServicio[0], ListaTemaCapacitacionCsv );
        }

    }
    else {
        limpiarControles('form-control');
        toastDangerAlert("La empresa Seleciona no Presta algun Servicio", "¡Error!");
    }
}
function mostrarEstadoCapacitacionCbo(rpta) {
    if (rpta) {
        lstCboEstadoCapacitacion = rpta.split("¬");
        CrearCombo(lstCboEstadoCapacitacion, cboEstadoCapacitacion, "Seleccione");
    }
}
function MostrarRegistroInspeccion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarTrabajadoresCapacitados() {
    
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

function CrearListaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}

function CrearListaTrabajadorCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoTrabajador(lista)
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

function crearObjetoTrabajador() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusquedaTrabajador = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoTrabajador.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoTrabajador[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaTrabajador.push(valoresAInsertar);
    }
}

function crearObjetoTemaCapacitacion() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    //objetoBusquedaTemaCapacitacion = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoTemaCapacitacion.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoTemaCapacitacion[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaTemaCapacitacion.push(valoresAInsertar);
    }
}