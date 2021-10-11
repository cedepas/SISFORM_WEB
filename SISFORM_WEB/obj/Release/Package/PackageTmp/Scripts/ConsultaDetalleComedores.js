var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var idDetalleComedor;
var idNNLL;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + 2, mostrarEmpresaPorTipoCbo);
        Http.get("Empresa/ListarDetallesEmpresasHospedajesCboCsv", mostrarDetallesEmpresasCbo);
        Http.get("SeguimientoNegocios/ListarDetallesComedoresCsv", CrearTablaCsv);
        
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
        if (idDetalleComedor) {
            frm.append("ID_detalleComedor", idDetalleComedor);
        }
        frm.append("ID_detalleComedor", idDetalleComedor);
        frm.append("FK_ID_Empresa", idNNLL);
        frm.append("FK_ID_Condicion", cboCondicion.value);
        frm.append("FK_ID_antiguedadEmpresa", cboAntiguedad.value);
        frm.append("FK_ID_PropiedadLocal", cboPropiedadLocal.value);
        frm.append("precioAlquiler", txtPrecioAlquiler.value);
        frm.append("concineroCertificado", (txtCertificacionCocinero.checked == true ? 1 : 0));
        frm.append("contraGuardiaCocinero", txtContraguardiCocinero.value);
        frm.append("numeroPisosUtilizados", txtNumeroDePisos.value);
        frm.append("FK_ID_MaterialEdificacion", cboMaterialEdificacion.value);
        frm.append("trampaGrasa", (txtTrampaGrasa.checked == true ? 1:0));
        frm.append("cantPosasCemento", txtPosasCemento.value);
        frm.append("cantPosasInox", txtPosasINOX.value);
        frm.append("FK_ID_TipoCocina", cboTipoCocina.value);
        frm.append("cantidadCocinas", txtCantidadCocinas.value);
        frm.append("cantidadHornillas", txtCantidadHornillas.value);
        frm.append("cantidadCongeladoras", txtCantidadCongeladoras.value);
        frm.append("cantidadRefrigeradoras", txtCantidadRefrigeradoras.value);
        frm.append("cantidadHornos", txtCantidadHornos.value);
        frm.append("cantidadMesasInox", txtCantidadMesasInox.value);
        frm.append("cantidadExtintoresPqs", txtCantidadExtintores.value);
        frm.append("FK_ID_Usuario", window.sessionStorage.getItem('idUsuario'));
        frm.append("FK_ID_categoriaComedor", cboCategoriaComedor.value);
        frm.append("capacidadOperativa", txtCapacidadOperativa.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabar);
            Http.post("SeguimientoNegocios/detallesComedores", MostrarGrabar, frm);
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

function mostrarDetallesEmpresasCbo(rpta) {
    if (rpta) {
        lstCombos = rpta.split('¯');
        lstcboCondicion = lstCombos[4].split("¬");
        CrearCombo(lstcboCondicion, cboCondicion, "Seleccione");
        lstcboAntiguedad = lstCombos[5].split("¬");
        CrearCombo(lstcboAntiguedad, cboAntiguedad, "Seleccione");
        lstcboPropiedadLocal= lstCombos[8].split("¬");
        CrearCombo(lstcboPropiedadLocal, cboPropiedadLocal, "Seleccione");
        lstcboMaterialEdificacion = lstCombos[1].split("¬");
        CrearCombo(lstcboMaterialEdificacion, cboMaterialEdificacion, "Seleccione");
        lstcboTipoCocina = lstCombos[9].split("¬");
        CrearCombo(lstcboTipoCocina, cboTipoCocina, "Seleccione");
        lstcboCategoriaComedor = lstCombos[10].split("¬");
        CrearCombo(lstcboCategoriaComedor, cboCategoriaComedor, "Seleccione");
    }
    else toastDangerAlert("No se pudo Cargar Detalles de Empresas", "¡Error!");
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
            Http.get("SeguimientoNegocios/ListarDetallesComedoresCsv", CrearTablaCsv);
        }
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
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
    Http.get("SeguimientoNegocios/ObtenerDetalleComedoresPorIdCsv?ID_detalleComedor=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {
    if (rpta) {
        btnGrabar.value = "Grabar Detalles";
        btnGrabar.disabled = false;
        campos = rpta.split('|');
        idDetalleComedor = campos[0];
        txtEmpresaNNLL.value = campos[1];
        idNNLL = campos[2];
        cboCondicion.value = campos[3];
        cboAntiguedad.value = campos[4];
        cboPropiedadLocal.value = campos[5];
        txtPrecioAlquiler.value = campos[6];
        txtCertificacionCocinero.checked = (campos[7] == 1 ? true : false);
        txtContraguardiCocinero.value = campos[8];
        txtNumeroDePisos.value = campos[9];
        cboMaterialEdificacion.value = campos[10];
        txtTrampaGrasa.checked = (campos[11] == 1 ? true : false);
        txtPosasCemento.value = campos[12];
        txtPosasINOX.value = campos[13];
        cboTipoCocina.value = campos[14];
        txtCantidadCocinas.value = campos[15];
        txtCantidadHornillas.value = campos[16];
        txtCantidadCongeladoras.value = campos[17];
        txtCantidadRefrigeradoras.value = campos[18];
        txtCantidadHornos.value = campos[19];
        txtCantidadMesasInox.value = campos[20];
        txtCantidadExtintores.value = campos[21];
        cboCategoriaComedor.value = campos[22];
        txtCapacidadOperativa.value = campos[23];
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