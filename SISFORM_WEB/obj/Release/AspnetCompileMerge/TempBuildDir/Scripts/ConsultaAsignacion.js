var ids = [];
var serv = [];
var campos = [];
var ocupado = [];
var espera = [];
var libre = [];
var matriz = [];
var asignacion = [];
var lstCboTipoEmpresa = [];
var lstCboEmpresa = [];
var lstCboHabitacion = [];
var pos;
var colId = 0;

window.onload = function () {
    Http.get("Trabajador/ListarTipoEmpresaCbo", mostrarTipoEmpresa);

    cboTipoEmpresa.onchange = function () {
        CargarCboTipoEmpresa();
    }

    cboEmpresa.onchange = function () {
        if (cboTipoEmpresa.value != 3) {
            pos = serv.indexOf(cboEmpresa.value);
        } else {
            Http.get("Trabajador/ListarAlojamientoCboPorId?idEmpresa=" + cboEmpresa.value, mostrarHabitacion);
            Http.get("Trabajador/ListarEmpresaGrafico?idTipoEmpresa=" + cboTipoEmpresa.value + "&alojamiento=" + cboEmpresa.value, cargarData);
        }
    }

    cboHabitacion.onchange = function () {
        pos = serv.indexOf(cboHabitacion.value);
    }

    btnGrabar.onclick = function () {
        var nDatos = asignacion.length;
        var dato = [];
        var data = "";
        for (var i = 0; i < nDatos; i++) {
            dato = asignacion[i];
            data += dato[0].toString() + '|' + dato[1].toString() + '¬'
        }
        data += '_' + dtFecAsi.value;
        if (cboTipoEmpresa.value != 3) {
            if (validarRequeridos('T')) {
                Http.get("Trabajador/SPAsignacionMasivo?data=" + data + "&idUsuario=" + window.sessionStorage.getItem('idUsuario') + "&op=" + cboTipoEmpresa.value, MostrarGrabar);
            } else toastDangerAlert("Complete todos los campos", "¡Error!");
        } else {
            if (validarRequeridos('H')) {
                Http.get("Trabajador/SPAsignacionMasivo?data=" + data + "&idUsuario=" + window.sessionStorage.getItem('idUsuario') + "&op=" + cboTipoEmpresa.value, MostrarGrabar);
            } else toastDangerAlert("Complete todos los campos", "¡Error!");
        }
    }

    btnCargar.onclick = function () {
        if (validarRequeridos('F')) {
            var frm = new FormData();
            frm.append("file", txtFile.files[0]);
            Http.post("Trabajador/CargarExcel?idUsuario=" + window.sessionStorage.getItem('idUsuario') + "&fecha=" + dtFecAsi.value, MostrarFile, frm);
        }
    }
}

function MostrarFile(rpta) {
    if (rpta) {
        toastSuccessAlert("Los registros se cargaron correctamente", "¡Exito!");
    }
    else toastDangerAlert("No se pudieron cargar los registros", "¡Error!");
}

function AddAsig(id) {
    if (libre[pos] > 0) {
        if (indexItemInArray(asignacion, [serv[pos], id]) == -1) {
            ocupado[pos] += 0;
            espera[pos]++;
            libre[pos]--;

            asignacion.push([serv[pos], id]);
        }
        dibujarGrafico();
    }
}

function DelAsig(id) {
    if (espera[pos] > 0) {
        var index = indexItemInArray(asignacion, [serv[pos], id]);
        if (index != -1) {
            ocupado[pos] += 0;
            espera[pos]--;
            libre[pos]++;
            dibujarGrafico();
            asignacion.splice(index, 1);
        }
    }
}

function mostrarTipoEmpresa(rpta) {
    if (rpta) {
        lstCboTipoEmpresa = rpta.split('¬');
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
    }
}

function mostrarEmpresa(rpta) {
    if (rpta) {
        lstCboEmpresa = rpta.split('¬');
        CrearCombo(lstCboEmpresa, cboEmpresa, "Seleccione");
    }
}

function mostrarHabitacion(rpta) {
    if (rpta) {
        lstCboHabitacion = rpta.split('¬');
        CrearCombo(lstCboHabitacion, cboHabitacion, "Seleccione");
    }
}

function dibujarGrafico() {
    new Chartist.Bar('.ct-chart', {
        labels: campos,
        series: [
            { className: "stroke-ocupado", meta: "Ocupado", data: ocupado },
            { className: "stroke-espera", meta: "Espera", data: espera },
            { className: "stroke-libre", meta: "Libre", data: libre }
        ]
    }, {
        stackBars: true,
        horizontalBars: true,
        // reverseData: true,
        axisY: {
            offset: 250
        },
    }).on('draw', function (data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 10px'
            });
        }
    });
}

function cargarData(rpta) {
    var listas = rpta.split('¬');

    serv = listas[0].split('|');
    campos = listas[1].split('|');
    ocupado = listas[2].split('|');
    espera = listas[3].split('|');
    libre = listas[4].split('|');

    ocupado = ocupado.map(function (x) {
        return parseInt(x, 10);
    });

    espera = espera.map(function (x) {
        return parseInt(x, 10);
    });

    libre = libre.map(function (x) {
        return parseInt(x, 10);
    });
    dibujarGrafico()
}

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;
        }
    }
    return false;
}

function indexItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return i;
        }
    }
    return -1;
}

function MostrarFile(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            ids = [];
            Http.get("PruebaCovid/ListarPruebas", CrearTablaCsv);
        }
        toastSuccessAlert("Los registros se cargaron correctamente", "¡Exito!");
    }
    else toastDangerAlert("No se pudieron cargar los registros", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla2(lista, "divTabla", 10, 3);
    }
}

function CargarCboTipoEmpresa() {
    ids = [];
    asignacion = [];
    Http.get("Trabajador/ListarEmpresaPorTipoCbo?idTipoEmpresa=" + cboTipoEmpresa.value, mostrarEmpresa);
    var habitacion = document.getElementsByClassName('habitacion');

    if (cboTipoEmpresa.value != 3) {
        Http.get("Trabajador/ListarEmpresaGrafico?idTipoEmpresa=" + cboTipoEmpresa.value, cargarData);
        habitacion[0].style.display = "none";
    } else {
        habitacion[0].style.display = "inline-block";
    }

    if (!isMobile.any()) {
        Http.get("Trabajador/ListarTrabajadorAsignacion?idTipoEmpresa=" + cboTipoEmpresa.value, CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
}

function MostrarGrabar(rpta) {
    if (rpta) {
        CargarCboTipoEmpresa();
        toastSuccessAlert("Los registros se guardaron correctamente", "¡Exito!");
        var habitacion = document.getElementsByClassName('habitacion');
        habitacion[0].style.display = "none";
    }
    else toastDangerAlert("No se pudieron grabar los registros", "¡Error!");
}

function Grilla2(lista, divGrilla, registrosPagina, paginasBloque, sinFiltros) {
    matriz = [];

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

        contenido += `<th><input type='checkbox' onclick='selecionarTodo(this);'/></th>`;
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
            var seleccionada = false;

            for (var i = inicio; i < fin; i++) {
                if (i < nRegistros) {
                    seleccionada = (ids.indexOf(matriz[i][0]) > -1);
                    html += "<tr>";
                    html += "<td><input class='check' type='checkbox' ";
                    html += (seleccionada ? 'checked ' : '');
                    html += "onclick='seleccionar(this,";
                    html += matriz[i][colId];
                    html += ");'/></td>";

                    for (var j = 0; j < ncampos; j++) {
                        html += "<td>";
                        html += matriz[i][j];
                        html += "</td>";
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
            contenido += "<input type='button' class='Pagina btn btn-square btn-sm btn-success rounded-circle mx-5  ";
            contenido += divGrilla;
            contenido += "Pagina' value='<<' data-pag='-1'/>";
            contenido += "<input type='button' class='Pagina btn btn-square btn-sm btn-success rounded-circle mx-5  ";
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
            contenido += "<input type='button' class='Pagina btn btn-square btn-sm btn-success rounded-circle mx-5  ";
            contenido += divGrilla;
            contenido += "Pagina' value='>' data-pag='-3'/>";
            contenido += "<input type='button' class='Pagina btn btn-square btn-sm btn-success rounded-circle mx-5  ";
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

function seleccionar(check, id) {
    var pos = ids.indexOf(id);
    var fila = check.parentNode.parentNode;
    if (check.checked) {
        if (ids.length == 0 || (ids.length > 0 && pos == -1)) {
            ids.push(id);
            AddAsig(id);
        }
    }
    else {
        if (ids.length > 0 && pos > -1) {
            var n = ids.length;
            for (var i = 0; i < n; i++) {
                if (ids[i] == id) {
                    ids.splice(i, 1);
                    DelAsig(id);
                }
            }
        }
    }
}

function selecionarTodo(checkCabecera) {
    var checks = document.getElementsByClassName("check");
    var nchecks = checks.length;
    var seleccion = checkCabecera.checked;
    var fila;
    for (var i = 0; i < nchecks; i++) {
        fila = checks[i].parentNode.parentNode;
        checks[i].checked = seleccion;
    }
    ids = [];
    asignacion = [];
    if (seleccion) {
        var n = matriz.length;
        for (var i = 0; i < n; i++) {
            ids.push(matriz[i][0]);
            AddAsig(matriz[i][0]);
        }
    }
}
