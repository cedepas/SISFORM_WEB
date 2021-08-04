var idUsuario
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var idTipoEmpresa;
var cantidadSelect;
var idTipoServicio;
var idUnidadGestion;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        //Http.get("SeguimientoNegocios/ListarCheckListCsv?idUsuario=" + idUsuario, CrearTablaCsv);
        Http.get("Trabajador/ListarEmpresasEspecializadasCsv", CrearListaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaCarta.value = fechaActual;

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
                    //idTipoEmpresa = objeto.TipoEmpresa;
                    Http.get("Carta/ListarIncidenciasAbiertasPorECMCsv?ID_Empresa=" + idEmpresa, mostrarIncidencias);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    bntNuevo.onclick = function () {
        location.reload();
    }
    btnVerificarCarta.onclick = function () {
        document.cookie = "idEmpresa=" + idEmpresa;
        document.cookie = "fechaCarta=" + txtFechaCarta.value;
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
function MostrarRegistroInspeccion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function mostrarIncidencias(rpta) {
    if (rpta) {
        listadoIncidencias.style.display = "inline-block";
        lstInciYDatosEmpresa = rpta.split("¯")
        lstIncidencias = lstInciYDatosEmpresa[0].split('¬');
        lstCabeceras = lstIncidencias[0].split('|');
        lstIncidencias.shift();
        cantidadIncidencias = lstIncidencias.length;
        document.getElementById("lblNumeroIncidencias").innerHTML = cantidadIncidencias;
        var b, c, d, i = 0, j = 0, k = 0;
        b = document.createElement("tr");
        cantidadCabecera = lstCabeceras.length;
        while (i < cantidadCabecera) {
            if (i < cantidadCabecera ){
                b.innerHTML += "<th>" + lstCabeceras[i] + "</th>";
            }
            i = i + 1;
        }
        document.getElementById('IncidenciasEmpresa').appendChild(b);
        while (j < lstIncidencias.length) {
            var nroCheck, datoCheck;
            c = document.createElement("tr");
            lstDatosIncidencia = lstIncidencias[j].split('|');
            while (k < cantidadCabecera) {
                c.innerHTML += "<td>" + lstDatosIncidencia[k] + "</td>";
                k = k + 1;
            }
            c.innerHTML += "</tr>";
            document.getElementById('IncidenciasDeLaEmpresa').appendChild(c);
            k = 0;
            j = j + 1;
        }
    }
    else
        toastDangerAlert("El tipo de empresa no cuenta con CheckList", "¡Error!");
}
function MostrarRegistroCheckList(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
        location.reload();
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