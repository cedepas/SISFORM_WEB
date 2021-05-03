var lstCboTipoEmpresa;
var idTipoEmpresa;

var lista;
var objetoBusqueda = [];
var objetoParametrizado = [];
var textoBusqueda;
var idEmpresa;

window.onload = function () {
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
            case "FAVORABLE":
                element.classList.remove("bg-primary");
                element.classList.remove("bg-danger");
                element.classList.add("bg-success");
                break;
            case "NEUTRAL":
                element.classList.remove("bg-danger");
                element.classList.remove("bg-success");
                element.classList.add("bg-primary");
                break;
            case "CONTRARIA":
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

    btnGrabarAnalisis.onclick = function () {
    }

}

function mostrarPosicion() {
    var rptaPosicion = 'FAVORABLE|FAVORABLE¬NEUTRAL|NEUTRAL¬CONTRARIA|CONTRARIA';
    lstCboPosicion = rptaPosicion.split('¬');
    CrearCombo(lstCboPosicion, cboPosicion, "Seleccione");
}

function mostrarPoderConvocatoria() {
    var rptaPoderConvocatoria = 'ALTO|ALTO¬MEDIO|MEDIO¬BAJO|BAJO';
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