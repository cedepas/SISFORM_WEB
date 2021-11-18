var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var idDetalleLavanderias;
var idNNLL;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + 4, mostrarEmpresaPorTipoCbo);
        Http.get("Empresa/ListarDetallesEmpresasHospedajesCboCsv", mostrarDetallesEmpresasCbo);
        Http.get("SeguimientoNegocios/ListarDetallesLavanderiasCsv", CrearTablaCsv);
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
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

    btnGrabar.onclick = function () {
        var frm = new FormData();
        if (idDetalleLavanderias) {
            frm.append("ID_detalleLavanderias", idDetalleLavanderias);
        }
        frm.append("ID_detalleLavanderias", idDetalleLavanderias);
        frm.append("FK_ID_Empresa", idNNLL);
        frm.append("FK_ID_condicion", cboCondicion.value);
        frm.append("FK_ID_antiguedadEmpresa", cboAntiguedad.value);
        frm.append("FK_ID_propiedadLocal", cboPropiedadLocal.value);
        frm.append("cantidadLavadoras", txtCantidadLavadoras.value);
        frm.append("cantidadSercadoras", txtCantidadSecadoras.value);
        frm.append("cantidadInstalada", txtCapacidadInstalada.value);
        frm.append("termaSolar", (txtTermaSolar.checked == true ? 1: 0));
        frm.append("llaveDiferencial", (txtLlaveDiferencial.checked == true ? 1 : 0));
        frm.append("extintorVigente", (txtExtintoVigente.checked == true ? 1 : 0));
        frm.append("lucesEmergencia", (txtLucesEmergencia.checked == true ? 1 : 0));
        frm.append("termometro", (txtTermometro.checked == true ? 1 : 0));
        frm.append("FK_ID_tipoPiso", cboTipoPiso.value);
        frm.append("FK_ID_tipoParedes", cboTipoPeredes.value);
        frm.append("FK_ID_tipoTecho", cboTipoTecho.value);
        frm.append("pediluvio", (txtPediluvio.checked == true ? 1 : 0));
        frm.append("puntoDesinfeccion", (txtPuntoDesinfeccion.checked == true ? 1 : 0));
        frm.append("bitacora", (txtBitacora.checked == true ? 1 : 0));
        frm.append("registroTemperatura", (txtRegistroTemperatura.checked == true ? 1 : 0));
        frm.append("tamizaje", (txtTamizaje.checked == true ? 1 : 0));
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabar);
            Http.post("SeguimientoNegocios/detallesLavanderias", MostrarGrabar, frm);
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
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function MostrarGrabar(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la incidencia fue correcto", "¡Exito!");
        if (!isMobile.any()) {
            Http.get("SeguimientoNegocios/ListarDetallesLavanderiasCsv", CrearTablaCsv);
        }
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function mostrarDetallesEmpresasCbo(rpta) {
    if (rpta) {
        lstCombos = rpta.split('¯');
        lstcboCondicion = lstCombos[4].split("¬");
        CrearCombo(lstcboCondicion, cboCondicion, "Seleccione");
        lstcboAntiguedad = lstCombos[5].split("¬");
        CrearCombo(lstcboAntiguedad, cboAntiguedad, "Seleccione");
        lstcboPropiedadLocal = lstCombos[8].split("¬");
        CrearCombo(lstcboPropiedadLocal, cboPropiedadLocal, "Seleccione");
        lstcboTipoPiso = lstCombos[11].split("¬");
        CrearCombo(lstcboTipoPiso, cboTipoPiso, "Seleccione");
        lstcboTipoParedes = lstCombos[12].split("¬");
        CrearCombo(lstcboTipoParedes, cboTipoPeredes, "Seleccione");
        lstcboTipoTecho = lstCombos[13].split("¬");
        CrearCombo(lstcboTipoParedes, cboTipoTecho, "Seleccione");
    }
    else toastDangerAlert("No se pudo Cargar Detalles de Empresas", "¡Error!");
}

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusqueda) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function mostrarEmpresaPorTipoCbo(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista);
    }
}
function obtenerRegistroPorId(id) {
    Http.get("SeguimientoNegocios/ObtenerDetalleLavanderiasPorIdCsv?ID_detalleLavanderias=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {
    if (rpta) {
        btnGrabar.value = "Grabar Detalles";
        btnGrabar.disabled = false;
        campos = rpta.split('|');
        idDetalleLavanderias = campos[0];
        txtEmpresaNNLL.value = campos[1];
        idNNLL = campos[2];
        cboCondicion.value = campos[3];
        cboAntiguedad.value = campos[4];
        cboPropiedadLocal.value = campos[5];
        txtCantidadLavadoras.value = campos[6];
        txtCantidadSecadoras.value = campos[7];
        txtCapacidadInstalada.value = campos[8];
        txtTermaSolar.checked = (campos[9] == 1 ? true : false);
        txtLlaveDiferencial.checked = (campos[10] == 1 ? true : false);
        txtExtintoVigente.checked = (campos[11] == 1 ? true : false);
        txtLucesEmergencia.checked = (campos[12] == 1 ? true : false);
        txtTermometro.checked = (campos[13] == 1 ? true : false);
        cboTipoPiso.value = campos[14];
        cboTipoPeredes.value = campos[15];
        cboTipoTecho.value = campos[16];
        txtPediluvio.checked = (campos[17] == 1 ? true : false);
        txtPuntoDesinfeccion.checked = (campos[18] == 1 ? true : false);
        txtBitacora.checked = (campos[19] == 1 ? true : false);
        txtRegistroTemperatura.checked = (campos[20] == 1 ? true : false);
        txtTamizaje.checked = (campos[21] == 1 ? true : false);
    } else limpiarControles('form-control-modal');
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