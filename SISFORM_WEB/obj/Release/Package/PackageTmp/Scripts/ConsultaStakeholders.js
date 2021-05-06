var lstCboTipoEmpresa;
var idTipoEmpresa;
var idStakeholder;

var lista;
var objetoBusqueda = [];
var objetoParametrizado = [];
var textoBusqueda;
var idEmpresa;

window.onload = function () {
    if (!isMobile.any()) {
        /*Http.get("Empresa/ListarStakeholder", CrearTablaCsv);*/
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

    Http.get("Empresa/ListarTipoEmpresaCbo", mostrarTipoEmpresaCbo);
    mostrarPosicion();
    mostrarPoderConvocatoria();

    cboTipoEmpresa.onchange = function () {
        txtbuscarPorEmpresa.value = "";
        idTipoEmpresa = cboTipoEmpresa.value;
        listarEmpresaPorTipoCbo();
        if (!cboTipoEmpresa.value) {
            closeAllLists();
            txtNombresApellidosProveedor.value = "";
            txtbuscarPorEmpresa.value = "";
        }
    }

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
                    txtNombresApellidosProveedor.value = objeto.RazonSocial;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (!txtbuscarPorEmpresa.value) {
            txtNombresApellidosProveedor.value = "";
        }
    }

    btnGuardar.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Stakeholder", idStakeholder);
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("FK_ID_PoderConvocatoria", cboPoderConvocatoria.value);
        frm.append("FK_ID_TipoPosicionamiento", cboPosicion.value);
        frm.append("alojamiento", txtAlojamiento.value);
        frm.append("comedor", txtComedor.value);
        frm.append("transporte", txtTransporte.value);
        frm.append("lavanderia", txtLavanderia.value);
        frm.append("compania", txtCompania.value);
        frm.append("riesgo", txtRiesgo.value);
        frm.append("otros", txtOtros.value);
        frm.append("fecha", txtFechaStakeholder.value);
        frm.append("analisis", txtAnalisis.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGuardar);
            Http.post("Empresa/GrabarStakeholder", MostrarGrabarStakeholder, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }

}

function MostrarGrabarStakeholder(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function mostrarPosicion() {
    var rptaPosicion = '1|FAVORABLE¬2|NEUTRAL¬3|CONTRARIA';
    lstCboPosicion = rptaPosicion.split('¬');
    CrearCombo(lstCboPosicion, cboPosicion, "Seleccione");
}

function mostrarPoderConvocatoria() {
    var rptaPoderConvocatoria = '1|ALTO¬2|MEDIO¬3|BAJO';
    lstCboPoderConvocatoria = rptaPoderConvocatoria.split('¬');
    CrearCombo(lstCboPoderConvocatoria, cboPoderConvocatoria, "Seleccione");
}

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusqueda) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function CrearListaCsvAllEmpresas(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoAllEmpresas(lista)
    }
}

function listarEmpresaPorTipoCbo() {
    Http.get("Empresa/ListarEmpresaRazonSocialPorTipoCboCsv?idTipoEmpresa=" + idTipoEmpresa, mostrarEmpresaPorTipoCbo);
}

function mostrarTipoEmpresaCbo(rpta) {
    if (rpta) {
        lstCboTipoEmpresa = rpta.split('¬');
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
    }
}

function mostrarEmpresaPorTipoCbo(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}

function crearObjeto() {
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
    document.getElementById('txtbuscarPorEmpresa').onkeyup();
}