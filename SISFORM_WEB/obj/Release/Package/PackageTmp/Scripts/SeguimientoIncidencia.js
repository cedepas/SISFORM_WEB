
var lstCboTipoSeguimiento;
var idIncidente;
var IdTrabajador;
var cabeseraImagen;
var TipoDato;
var fechaSeguimiento;
var ids = [];
var colId = 0;
var matriz2 = [];

window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoSeguimientoIncidenciaCsv", mostrarCboTipoSeguimiento);
    Http.get("Trabajador/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);

    btnGrabarSeguimiento.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidente);
        frm.append("fechaSeguimientoIncidencia", txtFechaSeguimiento.value);
        frm.append("ID_TipoSeguimiento", cboTipoSeguimiento.value);
        frm.append("FK_ID_TrabajadorSeguimiento", IdTrabajador);
        frm.append("detalleSeguimientoIncidencia", txtSeguimiento.value);

        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarSeguimiento);
            Http.post("Incidencia/RegistrarSeguimiento", MostrarGrabarSeguimiento, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnModalECM.onclick = function () {
        Http.get("Incidencia/ListarIncidenciasAbiertasECMCsv", CrearTablaCsvECM);
    }

    btnSeguimientoECM.onclick = function () {
        var nDatos = ids.length;
        if (nDatos > 0) {
            var data = "";

            for (var i = 0; i < nDatos; i++) {
                data += ids[i];
                data += '|';
            }
            //var fecha = txtFechaPrueba.value;
            data = data.substring(0, data.length - 1);
            //data = fecha + '_' + data;
            var frm = new FormData();
            frm.append("lstIncidencias", data);
            frm.append("fechaSeguimiento", txtFechaSeguimientoECM.value);
            frm.append("detalleSeguimiento", txtSeguimientoECM.value);
            frm.append("FK_ID_Usuario", window.sessionStorage.getItem('idUsuario'));
            if (validarRequeridos('F')) {
                checkSubmit(btnSeguimientoECM);
                Http.post("Incidencia/SeguimientoIncidenciasECM", MostrarGrabarSeguimiento, frm);
            } else {
                toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
                data = "";
            }
        } else toastDangerAlert("No selecciono ningun trabajador", "¡Aviso!");
    }
}

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
}
function consulta(e) {

    if (e.keyCode === 13 && !e.shiftKey) {
        Http.get("Incidencia/ObtenerIncidenciaPorIdParaSolucionCsv?idIncidencia=" + txtIdIncidente.value, AsignarCamposBusqueda);
    }
}
function AsignarCamposBusqueda(rpta) {
    if (rpta) {
        var campos = rpta.split('|');
        txtIdIncidente.value = campos[0];
        idIncidente = campos[0];
        cboEmpresaIncidente.value = campos[1];
        txtfechaIncidente.value = campos[2];
        txtBloque.value = campos[3];
        txtEspecificacion.value = campos[4];
        txtDetalles.value = campos[5];
        divSeguimiento.style.display = "inline-block";
    }
}
function mostrarCboTipoSeguimiento(rpta) {
    if (rpta) {
        lstCboTipoSeguimiento = rpta.split('¬');
        CrearCombo(lstCboTipoSeguimiento, cboTipoSeguimiento, "Seleccionar");
    }

}
function MostrarGrabarSeguimiento(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del seguimiento se registró correctamente", "¡Exito!");
        divSeguimiento.style.display = "none";
        Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);

    }

}
function MostrarGrabarSeguimientoECM(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del seguimiento se registró correctamente", "¡Exito!");
        Http.get("Incidencia/ListarIncidenciaParaSolucionCsv", CrearTablaCsv);
    }
    else toastDangerAlert("Ocurrio un error en el registro!", "¡Aviso!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function obtenerRegistroPorId(id) {

    Http.get("Incidencia/ObtenerIncidenciaPorIdParaSolucionCsv?idIncidencia=" + id, AsignarCamposBusqueda);
}

function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}

function CrearTablaCsvECM(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla2(lista, "divTablaECM", 10, 3);
    }
}

function Grilla2(lista, divGrilla, registrosPagina, paginasBloque, sinFiltros) {
    //var matriz2 = [];

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
                matriz2.push(fila);
            }
        }
    }

    function mostrarMatriz() {
        var html = "";
        var nRegistros = matriz2.length;

        if (nRegistros > 0) {
            var ncampos = matriz2[0].length;
            var inicio = indicePagina * registrosPagina;
            var fin = inicio + registrosPagina;
            var seleccionada = false;

            for (var i = inicio; i < fin; i++) {
                if (i < nRegistros) {
                    seleccionada = (ids.indexOf(matriz2[i][0]) > -1);
                    html += "<tr ";
                    if (matriz2[i][5] > 7) {
                        html += "class='table-danger'";
                    } else if (matriz2[i][5] >= 4 & matriz2[i][5] <= 7) {
                        html += "class='table-secondary'";
                    } else if (matriz2[i][5] >= 0 & matriz2[i][5] <= 3) {
                        html += "class='table-success'";
                    } else if (matriz2[i][5] < 0) {
                        html += "class='table-primary'";
                    }

                    html += ">";
                    html += "<td><input class='check' type='checkbox' ";
                    html += (seleccionada ? 'checked ' : '');
                    html += "onclick='seleccionar(this,";
                    html += matriz2[i][colId];
                    html += ");'/></td>";

                    for (var j = 0; j < ncampos; j++) {
                        html += "<td>";
                        html += matriz2[i][j];
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
        var nRegistros = matriz2.length;
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
            var nRegistros = matriz2.length;
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
        }
    }
    else {
        if (ids.length > 0 && pos > -1) {
            var n = ids.length;
            for (var i = 0; i < n; i++) {
                if (ids[i] == id) {
                    ids.splice(i, 1);
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
    if (seleccion) {
        var n = matriz2.length;
        for (var i = 0; i < n; i++) {
            ids.push(matriz2[i][0]);
        }
    }
}
