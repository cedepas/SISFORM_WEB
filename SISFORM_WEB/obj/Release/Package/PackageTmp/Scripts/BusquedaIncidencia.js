var idTipoTiltro;
var lista;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    //Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoFiltroIncidenciaCsv", mostrarCboTipoFiltroIncidencia);
    //Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);

    btnBuscarIncidencias.onclick = function () {
        checkSubmit(btnBuscarIncidencias);
        if (filtro) {
            filtro = filtro;
        } else {
            filtro = txtfechaIncidente.value;
        }
        Http.get("Incidencia/ObtenerIncidenciaPorFiltroCsv?ID_TipoFilto=" + cboTipoFiltroIncidencia.value.toString() + "&Filtro=" + filtro, CrearTablaCsv);
    }
    
    txtbuscarPorTrajador.onkeyup = function () {
        filtro = "";
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtbuscarPorTrajador.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorTrajador.value = this.getElementsByTagName("input")[0].value;
                    filtro = objeto.IDTrab;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        } 
    }

    txtbuscarPorEmpresa.onkeyup = function () {
        filtro = "";
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
                    filtro = objeto.IDEmpr;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }

    bntNuevo.onclick = function () {
        limpiarControles('form-control');
        location.reload();
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

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
}

function mostrarCboTipoFiltroIncidencia(rpta) {
    if (rpta) {
        lstCboTipoFiltroIncidencia = rpta.split('¬');
        CrearCombo(lstCboTipoFiltroIncidencia, cboTipoFiltroIncidencia, "Seleccionar");
    }
}
cboTipoFiltroIncidencia.onchange = function () {
    idTipoTiltro = cboTipoFiltroIncidencia.value;
    if (idTipoTiltro == 1) {
        buscarPorTrajador.style.display = "inline-block";
        buscarPorEmpresa.style.display = "none";
        buscarPorFecha.style.display = "none";
        Http.get("Incidencia/ListarTrabajadorBusquedaCsv", CrearListaCsv);

    }
    else if (idTipoTiltro == 3) {
        buscarPorEmpresa.style.display = "inline-block";
        buscarPorTrajador.style.display = "none";
        buscarPorFecha.style.display = "none";
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
    }
    else if (idTipoTiltro == 4) {
        buscarPorFecha.style.display = "inline-block";
        buscarPorTrajador.style.display = "none";
        buscarPorEmpresa.style.display = "none";
        
    }
    else {
        console.log(22222);
    }
}
//function consulta(e) {

//    if (e.keyCode === 3 && !e.shiftKey) {
//        Http.get("Incidencia/ObtenerIncidenciaPorIdParaSolucionCsv?idIncidencia=" + txtIdIncidente.value, AsignarCamposBusqueda);
//    }
//}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    } else toastDangerAlert("No existen datos con el filtro Indicado*", "¡Aviso!")
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
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 1; i <= nRegistros - 1; i++) {
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