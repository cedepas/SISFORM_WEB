var idUsuario
var idNNLL;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var FK_ID_UnidadGestion;
var fechaActual;
var ID_VehiculosDelivery;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + 6, mostrarEmpresaPorTipoCbo);
        Http.get("SeguimientoNegocios/ListarVehiculoDeliverysCsv", CrearTablaCsv);
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaInspeccionTecnica.value = fechaActual;
    txtFechaVencimientoSOAT.value = fechaActual;
    txtfechaSeguroContraTerceros.value = fechaActual;

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

    btnGrabarVehiculo.onclick = function () {
        var frm = new FormData();
        if (ID_VehiculosDelivery) {
            frm.append("ID_VehiculosDelivery", ID_VehiculosDelivery);
        }
        frm.append("ID_VehiculosDelivery", ID_VehiculosDelivery);
        frm.append("FK_ID_Empresa", idNNLL);
        frm.append("placaVehiculo", txtPlacaVehiculo.value.toUpperCase());
        frm.append("tipoVehiculo", txtTipoVehiculo.value.toUpperCase());
        frm.append("propietarioVehiculo", txtPropietarioVehiculo.value.toUpperCase());
        frm.append("modeloVehiculo", txtModeloVehiculo.value.toUpperCase());
        frm.append("marcaVehiculo", txtMarcaVehiculo.value.toUpperCase());
        frm.append("sede", txtSede.value.toUpperCase());
        frm.append("anioFabricacionVehiculo", txtAñoFabricacion.value.toUpperCase());
        frm.append("fechaVencimientoSOAT", txtFechaVencimientoSOAT.value.toUpperCase());
        frm.append("breveteMinimo", txtBrevete.value.toUpperCase());
        frm.append("capacidadCoolers", txtCantidadCoolers.value.toUpperCase());
        frm.append("circulacionSUNARP", txtCirculacionSUNARP.value.toUpperCase());
        frm.append("vinculoVehiculo", txtVinculoVehiculo.value.toUpperCase());
        frm.append("FK_ID_Usuario_Crea", window.sessionStorage.getItem('idUsuario'));
        frm.append("fechaInspeccionTecnicaVehicular", txtFechaInspeccionTecnica.value.toUpperCase());
        frm.append("seguroContraTerceros", txtSeguroContraTerceros.value.toUpperCase());
        frm.append("categoriaVehiculo", txtCategoriaVehiculo.value.toUpperCase());
        frm.append("combustible", txtCombustible.value.toUpperCase());
        frm.append("fechaSeguroContraTerceros", txtfechaSeguroContraTerceros.value.toUpperCase());
        /*  */
        frm.append("VehiculoActivo", (txtVehiculoActivo.checked == true ? 1 : 0));
        

        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarVehiculo);
            Http.post("SeguimientoNegocios/VehiculosDelivery", MostrarGrabar, frm);
            
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
    Http.get("SeguimientoNegocios/ObtenerVehiculoDeliveryPorIdCsv?idVehiculo=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        ID_VehiculosDelivery = campos[0];
        txtEmpresaNNLL.value = campos[1];
        idNNLL = campos[2];
        txtPlacaVehiculo.value = campos[3];
        txtTipoVehiculo.value = campos[4];
        txtPropietarioVehiculo.value = campos[5];
        txtModeloVehiculo.value = campos[6];
        txtMarcaVehiculo.value = campos[7];
        txtSede.value = campos[8];
        txtAñoFabricacion.value = campos[9];
        txtFechaVencimientoSOAT.value = campos[10];
        txtBrevete.value = campos[11];
        txtCantidadCoolers.value = campos[12];
        txtCirculacionSUNARP.value = campos[13];
        txtVinculoVehiculo.value = campos[14];
        txtFechaInspeccionTecnica.value = campos[15]
        txtSeguroContraTerceros.value = campos[16];
        txtCategoriaVehiculo.value = campos[17];
        txtCombustible.value = campos[18];
        txtfechaSeguroContraTerceros.value = campos[19];

        txtVehiculoActivo.checked = (campos[20] == 1 ? true : false); /*lineaadd*/
       

    } else limpiarControles('form-control-modal');
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


