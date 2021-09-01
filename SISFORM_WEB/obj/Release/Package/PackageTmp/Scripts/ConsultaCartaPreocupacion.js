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
        Http.get("Carta/ListarCartasPreocupacionCsv", CrearTablaCsv);
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
                    txtbuscarPorEmpresa.disabled = "disabled";
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
        toastDangerAlert("Empresa con 0 indicencias abiertas", "¡Error!");
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
        //var grilla = new Grilla(lista, "divTabla", 10, 3);
        Grilla(lista, "divTabla", 10, 3);
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

function Grilla(lista, divGrilla, registrosPagina, paginasBloque, sinFiltros) {
    var matriz = [];

    var indicePagina = 0;
    if (registrosPagina == null) registrosPagina = 20;
    var indiceBloque = 0;
    if (paginasBloque == null) paginasBloque = 10;
    var cabeceras = [];

    crearTabla();
    filtrarMatriz();
    configurarFiltros();
    configurarOrdenacion();
    configurarPaginacion();
    configurarBotones();

    function crearTabla() {
        cabeceras = lista[0].split("|");
        var nCampos = cabeceras.length;
        var contenido = "";

        contenido += `
            <div class='content'><h5>Registros encontrados: <span id='spnRegistros${divGrilla}'></span></h5>
            <input id='btnLimpiar${divGrilla}' type='button' value='Limpiar' class='btn'/></div>
        `;

        contenido += `<table class='table table-inner-bordered'><thead><tr>`;

        for (var j = 0; j < nCampos; j++) {
            contenido += `
                <th><span class='Enlace ${divGrilla}' data-ind='${j}'>${cabeceras[j]}</span><br/>
                <input type='text' class='${divGrilla}Cabecera form-control form-control-sm'></th>
            `;
        }
        contenido += `
            </tr></thead><tbody id='tbData${divGrilla}'>
            </tbody>
            <tfoot>
            <tr><th id='tdPagina${divGrilla}' colspan='${nCampos}' class='text-center'></th></tr>
            </tfoot>
            </table>
            </br>
        `;

        document.getElementById(divGrilla).innerHTML = contenido;
    }

    function crearMatriz() {
        matriz = [];
        var campos = [];
        var nRegistros = lista.length;
        var nCampos = lista[0].split('|').length;
        var contenido = "";
        var valores = [];
        var controles = document.getElementsByClassName(divGrilla + "Cabecera");
        var nControles = controles.length;
        var control;
        for (var j = 0; j < nControles; j++) {
            control = controles[j];
            if (control.className.indexOf("Combo") > -1) {
                valores.push(control.options[control.selectedIndex].text.toLowerCase());
            }
            else valores.push(control.value.toLowerCase());
        }
        var c = 0;
        var exito = false;
        var fila = [];
        for (var i = 1; i < nRegistros; i++) {
            campos = lista[i].split("|");
            for (var j = 0; j < nControles; j++) {
                control = controles[j];
                if (control.className.indexOf("Combo") > -1) {
                    exito = (valores[j] == "todos" || campos[j].toLowerCase() == valores[j]);
                }
                else exito = (valores[j] == "" || campos[j].toLowerCase().indexOf(valores[j]) > -1);
                if (!exito) break;
            }
            if (exito) {
                c++;
                fila = [];
                for (var j = 0; j < nCampos; j++) {
                    if (campos[j] == "" || isNaN(campos[j])) fila.push(campos[j]);
                    else {
                        if (campos[j].substr(0, 1) == "0") fila.push(campos[j]);
                        else fila.push(+campos[j]);
                    }
                }
                matriz.push(fila);
            }
        }
    }

    function mostrarMatriz() {
        var html = "";
        var nRegistros = matriz.length;
        if (nRegistros > 0) {
            var ncampos = matriz[0].length;
            var inicio = indicePagina * registrosPagina;
            var fin = inicio + registrosPagina;
            for (var i = inicio; i < fin; i++) {
                if (i < nRegistros) {
                    html += "<tr onclick='seleccionarFila(this);' ondblclick='obtenerRegistroPorId(\"";
                    html += matriz[i][0];
                    html += "\");'>";
                    for (var j = 0; j < ncampos; j++) {
                        if (j == 3) {
                            html += "<td><a href=" + matriz[i][j] + ">";
                            html += "carta Nro "+ matriz[i][j -1 ];
                            html += "</td>";
                        } else {
                        html += "<td>";
                        html += matriz[i][j];
                            html += "</td>";
                        }
                    }
                    html += "</tr>";
                }
                else break;
            }
        }
        document.getElementById("tbData" + divGrilla).innerHTML = html;
        document.getElementById("spnRegistros" + divGrilla).innerHTML = nRegistros;
        if (sinFiltros == null) crearPaginacion();
    }

    function configurarFiltros() {
        var cabeceras = document.getElementsByClassName(divGrilla + "Cabecera");
        var nCabeceras = cabeceras.length;
        var cabecera;
        for (var i = 0; i < nCabeceras; i++) {
            cabecera = cabeceras[i];
            if (cabecera.className.indexOf("Combo") > -1) {
                cabecera.onchange = function () { filtrarMatriz() };
            }
            else cabecera.onkeyup = function (event) { filtrarMatriz() };
        }
    }

    function configurarOrdenacion() {
        var enlaces = document.getElementsByClassName(divGrilla + "Enlace");
        var nEnlaces = enlaces.length;
        var enlace;
        for (var i = 0; i < nEnlaces; i++) {
            enlace = enlaces[i];
            enlace.onclick = function () { ordenar(this, this.getAttribute("data-ind") * 1); }
        }
    }

    function configurarPaginacion() {
        var paginas = document.getElementsByClassName(divGrilla + "Pagina");
        var nPaginas = paginas.length;
        var pagina;
        for (var i = 0; i < nPaginas; i++) {
            pagina = paginas[i];
            pagina.onclick = function () { paginar(this.getAttribute("data-pag") * 1); }
        }
    }

    function crearPaginacion() {
        var contenido = "";
        var nRegistros = matriz.length;
        var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
        if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
        var registrosBloque = Math.floor(registrosPagina * paginasBloque);
        var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
        if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
        if (indiceBloque > 0) {
            contenido += "<input type='button' class='Pagina ";
            contenido += divGrilla;
            contenido += "Pagina' value='<<' data-pag='-1'/>";
            contenido += "<input type='button' class='Pagina ";
            contenido += divGrilla;
            contenido += "Pagina' value='<' data-pag='-2'/>";
        }
        var inicio = indiceBloque * paginasBloque;
        var fin = inicio + paginasBloque;
        for (var i = inicio; i < fin; i++) {
            if (i <= indiceUltimaPagina) {
                contenido += "<input type='button' class='btn btn-square btn-sm btn-primary rounded-circle mx-5 ";
                contenido += divGrilla;
                contenido += "Pagina' value='";
                contenido += (i + 1);
                contenido += "' data-pag='";
                contenido += i;
                contenido += "'/>";
            }
            else break;
        }
        if (indiceBloque < indiceUltimoBloque) {
            contenido += "<input type='button' class='Pagina ";
            contenido += divGrilla;
            contenido += "Pagina' value='>' data-pag='-3'/>";
            contenido += "<input type='button' class='Pagina ";
            contenido += divGrilla;
            contenido += "Pagina' value='>>' data-pag='-4'/>";
        }
        document.getElementById("tdPagina" + divGrilla).innerHTML = contenido;
        configurarPaginacion();
    }

    function filtrarMatriz() {
        indicePagina = 0;
        indiceBloque = 0;
        crearMatriz();
        mostrarMatriz();
    }

    function paginar(indice) {
        if (indice > -1) indicePagina = indice;
        else {
            var nRegistros = matriz.length;
            var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
            if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
            var registrosBloque = Math.floor(registrosPagina * paginasBloque);
            var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
            if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
            switch (indice) {
                case -1: //Ir al primer bloque
                    indicePagina = 0;
                    indiceBloque = 0;
                    break;
                case -2: //Ir al bloque anterior
                    if (indiceBloque > 0) {
                        indiceBloque--;
                        indicePagina = indiceBloque * paginasBloque;
                    }
                    break;
                case -3: //Ir al bloque siguiente
                    if (indiceBloque < indiceUltimoBloque) {
                        indiceBloque++;
                        indicePagina = indiceBloque * paginasBloque;
                    }
                    break;
                case -4: //Ir al último bloque
                    indicePagina = indiceUltimaPagina;
                    indiceBloque = indiceUltimoBloque;
                    break;
            }
        }
        mostrarMatriz();
    }

    function configurarBotones() {
        var btnLimpiar = document.getElementById("btnLimpiar" + divGrilla);
        if (btnLimpiar != null) {
            btnLimpiar.onclick = function () {
                var textos = document.getElementsByClassName(divGrilla + "Cabecera");
                var nTextos = textos.length;
                for (var j = 0; j < nTextos; j++) {
                    textos[j].value = "";
                }
                filtrarMatriz();
            }
        }
    }
}