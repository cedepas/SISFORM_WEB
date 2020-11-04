var idTipoTiltro;
var lista;
var objetoParametrizado = [];
var objetoBusqueda = [];

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



        //bontoBuscar.addEventListener('click', filtrar);
        //buscarTrabajador.addEventListener('keyup'.filtrar);
        //filtrar();

        //Http.get("Incidencia/ObtenerIncidenciaPorFiltroCsv?ID_TipoFilto=" + cboTipoFiltroIncidencia.value.toString() + "&Filtro=" + txtfechaIncidente.value.toString(), CrearTablaCsv);
    }
    //const buscarTrabajador = document.querySelector('#txtbuscarPorTrajador');
    //const bontoBuscar = document.querySelector('#btnBuscarIncidencias');
    ////const resultado = document.querySelector('#resultado');

    //const filtrar = () => {
    //    //console.log(buscarTrabajador.value);
    //    const texto = buscarTrabajador.value.toLowerCase();
    //    for (let objeto of objetoBusqueda) {
    //        let Nombre = objeto.Nombre.toLowerCase();
    //        if (Nombre.indexOf(texto) !== -1) {
    //            console.log(objeto.Nombre);
    //        }
    //    }
    //}
    txtbuscarPorTrajador.onkeyup = function () {
        //console.log(txtbuscarPorTrajador.value.length);
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        const texto = txtbuscarPorTrajador.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.Nombre.toLowerCase();
            if (Nombre.indexOf(texto) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + Nombre + "</strong>";
                b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + Nombre + "'>";
                a.appendChild(b);
            }
        }
    }

}
function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != txtbuscarPorTrajador.value) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
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
        Http.get("Trabajador/ListarTrabajador", CrearListaCsv);

    }
    else if (idTipoTiltro == 3) {
        buscarPorEmpresa.style.display = "inline-block";
        buscarPorTrajador.style.display = "none";
        buscarPorFecha.style.display = "none";
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
    }
}
function CrearListaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}
function crearObjeto() {
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 1; i < nRegistros - 1; i++) {
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