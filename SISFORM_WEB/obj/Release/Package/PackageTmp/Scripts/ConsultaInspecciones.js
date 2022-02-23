var idUsuario
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var cantidadTrabajadores;
var lstActualizacion = [];
var lstTrabajadores;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("SeguimientoNegocios/ListarInspecciones?idUsuario=" + idUsuario, CrearTablaCsv);
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        Http.get("SeguimientoNegocios/ListarEstadoInspeccionCsv", mostrarTipoInspeccionCbo);


        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    obtenerfechaActual();

    txtFechaInspeccion.value = fechaActual;

    btnGrabarInspeccion.onclick = function () {
        var frm = new FormData();
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("FK_ID_EstadoInspeccion", cboTipoInspeccion.value);
        frm.append("FK_ID_Usuario", idUsuario);
        frm.append("fechaInspeccion", txtFechaInspeccion.value);
        frm.append("detalleInspeccion", txtDetalleInspeccion.value);
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
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresa.value = this.getElementsByTagName("input")[0].value;
                    idEmpresa = objeto.IDEmpr;
                    Http.get("Trabajador/ListarTrabajadorPorEmpresaCsv?idEmpresa=" + idEmpresa, mostrarTrabajadoresEmpresa);
                    btnActualizar.style.display = "inline-block";
                    closeAllLists();

                    txtbuscarPorEmpresa.disabled = true;
                    
                });
                a.appendChild(b);
            }
        }
    }

    bntNuevo.onclick = function () {
        limpiarControles('form-control');
        location.reload();
    }

    btnActualizar.onclick = function () {
        var inicio = 0;

        mostrarActualizacion('ok');

        while (inicio < cantidadTrabajadores) {
            var valorCheck = "cb" + inicio;
            lisDatosTrabajadro = lstTrabajadores[inicio].split('|');
            lstActualizacion.push(lisDatosTrabajadro[0] + "|" + lisDatosTrabajadro[8] + "|" + document.getElementById(valorCheck).checked);
            inicio = inicio + 1;
        }

        checkSubmit(btnActualizar);
        Http.get("SeguimientoNegocios/ActualizarPuestoTrabajadorPorEmpresaCsv?FK_ID_Empresa=" + idEmpresa + "&listadoTrabajadores=" + lstActualizacion.toString() + "&FK_ID_Usuario=" + idUsuario/*, mostrarActualizacion*/);
        console.log(lstActualizacion.toString());
        
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
function mostrarTipoInspeccionCbo(rpta) {
    if (rpta) {
        lstCboTipoInspeccion = rpta.split("¬");
        CrearCombo(lstCboTipoInspeccion, cboTipoInspeccion, "Seleccione");
    }
}
function MostrarRegistroInspeccion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function mostrarActualizacion(rpta) {
    fechaInspeccion.style.display = "inline-block";
    estadoInspeccion.style.display = "inline-block";
    txtDetalleInspeccion.style.display = "inline-block";
    detalleInspeccion.style.display = "inline-block";
    btnGrabarInspeccion.style.display = "inline-block";
    if (rpta) {
        toastSuccessAlert("Se actualizo correctamente los Trabajadores", "¡Exito!");
        //limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo actualizar los trabajadores", "¡Error!");
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

function mostrarTrabajadoresEmpresa(rpta) {
    if (rpta) {
        lstTrabajadores = rpta.split('¬');
        lstCabeceras = lstTrabajadores[0].split('|');
        lstTrabajadores.shift();
        cantidadTrabajadores = lstTrabajadores.length
        var b, c, d, i = 0, j = 0, k = 0;
        b = document.createElement("tr");
        cantidadCabecera = lstCabeceras.length;
        while (i < cantidadCabecera) {
            if (i < cantidadCabecera - 1) {
                b.innerHTML += "<th>" + lstCabeceras[i] + "</th>";
            }
            i = i + 1;
        }
        document.getElementById('TrabajadoresEmpresa').appendChild(b);
        while (j < lstTrabajadores.length) {
            var nroCheck, datoCheck;
            c = document.createElement("tr");
            lstDatosTrabajador = lstTrabajadores[j].split('|');
            while (k < cantidadCabecera) {
                if (k < cantidadCabecera - 2)
                    if (lstDatosTrabajador[5] > 7) {
                        if (true) {
                            c.innerHTML += "<td style='background-color:red'>" + lstDatosTrabajador[k] + "</td>";
                        }                        
                    }
                    else {
                        c.innerHTML += "<td>" + lstDatosTrabajador[k] + "</td>";
                    }
                    
                else if (k < cantidadCabecera - 1) {

                }
                else {
                    nroCheck = "cb" + j;
                    datoCheck = lstDatosTrabajador[k];
                    c.innerHTML += "<td><input type='checkbox' id='" + nroCheck + "'></input>" + lstDatosTrabajador[k] + "</td>";
                }
                k = k + 1;
            }
            c.innerHTML += "</tr>";
            document.getElementById('TrabajadoresDeLaEmpresa').appendChild(c);
            document.getElementById(nroCheck).checked = (datoCheck == "ACT" ? true : false);
            k = 0;
            j = j + 1;
        }
    }
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