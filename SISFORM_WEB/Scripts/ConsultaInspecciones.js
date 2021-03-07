﻿var idUsuario
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;

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
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarInspeccion);
            Http.post("SeguimientoNegocios/GrabarInspeccion?op=I"  , MostrarRegistroInspeccion, frm);
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
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
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
function mostrarTipoInspeccionCbo(rpta) {
    if (rpta) {
        lstCboTipoInspeccion= rpta.split("¬");
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