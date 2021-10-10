var idUsuario
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var idDirectorioECM;
window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Empresa/ListarDirectorioECMCsv", CrearTablaCsv);
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    //obtenerfechaActual();

    //txtFechaInspeccion.value = fechaActual;

    btnGrabar.onclick = function () {
        var frm = new FormData();
        if (idDirectorioECM) {
            frm.append("ID_DirectorioECM", idDirectorioECM);
        }
        frm.append("ID_DirectorioECM", idDirectorioECM);
        frm.append("FK_ID_EmpresaECM", idEmpresa);
        frm.append("NombreContacto", txtNombreContacto.value.toUpperCase());
        frm.append("Cargo", txtCargo.value.toUpperCase());
        frm.append("telefono", txtTelefono.value.toUpperCase());
        frm.append("email", txtEmail.value.toUpperCase());
        frm.append("estado", (txtEstado.checked == true ? 1 : 0));
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabar);
            Http.post("Empresa/SPDirectorioECM", MostrarRegistroDirectorioECM, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }

    txtNombreECM.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtNombreECM.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtNombreECM.value = this.getElementsByTagName("input")[0].value;
                    idEmpresa = objeto.IDEmpr;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }

    btnNuevo.onclick = function () {
        window.location.reload();
        limpiarControles('form-control');
        btnGrabar.value = "Grabar";
        btnGrabar.disabled = false;
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

function MostrarRegistroDirectorioECM(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
            Http.get("Empresa/ListarDirectorioECMCsv", CrearTablaCsv);
            limpiarControles('form-control');
        }
    } else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Empresa/ObtenerDirectorioECMPorId?idDirectorioECM=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        var campos = rpta.split('|');
        idDirectorioECM = campos[0];
        idEmpresa = campos[1];
        txtNombreECM.value = campos[2];
        txtNombreContacto.value = campos[3];
        txtCargo.value = campos[4];
        txtTelefono.value = campos[5];
        txtEmail.value = campos[6];
        txtEstado.checked = (campos[7] == "ACT" ? true : false);
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