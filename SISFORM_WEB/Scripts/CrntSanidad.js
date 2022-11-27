var lstPrueba;
var idEmpresaTrab;
var idTrabajador;
var numeroPrueba;
var idEmpresaPuesto;
var idPruebaCovid;
var fk_id_UnidadGestion;

window.onload = function () {
    fk_id_UnidadGestion = window.sessionStorage.getItem('FK_ID_UnidadGestion');
    if (!isMobile.any()) {
        Http.get("SeguimientoNegocios/ListarCarnetEmisionCsv", CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    btnExportar.onclick = function () {
        console.log(btnExportar.value);
        var downloadLink;
        //var dataType = 'application/vnd.ms-excel;charset=utf-8';

        var tableSelect = document.getElementById('divTabla');


        var tableHTML = tableSelect.outerHTML.replace(/input /g, '').replace(/ /g, '%20');
        console.log(tableHTML);
        var filename = 'PruebasCovid';
        // Nombre Archivo
        filename = filename ? filename + '.xls' : 'excel_data.xls';

        // Crear Link del Elemento a descargar
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Crear Link del Archivo
            downloadLink.href = 'data:application/vnd.ms-excel;charset=utf-8,' + tableHTML;

            // Configuración del nombre del archivo
            downloadLink.download = filename;

            //ejecutando la funcion de descarga
            downloadLink.click();
        }
    }

}

function resulExcel(rpta) {
    console.log(rpta);
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


function mostrarResultadosPorFecha(rpta) {
    document.getElementById('cantidadPruebas').innerHTML = "";
    document.getElementById('resultadosPruebas').innerHTML = "";
    if (rpta) {
        var b, c;
        var listas = rpta.split('¯');
        b = document.createElement("div");
        b.innerHTML = "<p>Cantidad de pruebas fecha " + txtfechaResultados.value + "</p>";
        c = document.createElement("div");
        c.innerHTML = "<p>Resultados de fecha " + txtfechaResultados.value + "</p>";
        if (listas[0].includes('¬')) {
            lstCantidad = listas[0].split('¬');
            for (var i = 0 in lstCantidad) {
                var LstAmostrar = lstCantidad[i].split('|');
                b.innerHTML += "&nbsp;&nbsp; <label>" + LstAmostrar[0] + "</label>";
                b.innerHTML += "&nbsp; <label>" + LstAmostrar[1] + "</label>";
                document.getElementById('cantidadPruebas').appendChild(b);
            }
        }
        else {
            var lista1 = listas[0].split('|');
            //contadorTrabajdoresCapacitados = contadorTrabajdoresCapacitados + 1;
            //b = document.createElement("div");
            b.innerHTML += "&nbsp;&nbsp; <label>" + lista1[0] + "</label>";
            b.innerHTML += "&nbsp; <label>" + lista1[1] + "</label>";
            document.getElementById('cantidadPruebas').appendChild(b);
        }
        if (listas[1].includes('¬')) {
            lstResultados = listas[1].split('¬');
            for (var i = 0 in lstResultados) {
                var LstAmostrar = lstResultados[i].split('|');
                c.innerHTML += "&nbsp;&nbsp; <label>" + LstAmostrar[0] + "</label>";
                c.innerHTML += "&nbsp; <label>" + LstAmostrar[1] + "</label>";
                document.getElementById('resultadosPruebas').appendChild(c);
            }
        }
        else {
            var lista1 = listas[1].split('|');
            //contadorTrabajdoresCapacitados = contadorTrabajdoresCapacitados + 1;
            //b = document.createElement("div");
            c.innerHTML += "&nbsp;&nbsp; <label>" + lista1[0] + "</label>";
            c.innerHTML += "&nbsp; <label>" + lista1[1] + "</label>";
            document.getElementById('resultadosPruebas').appendChild(c);
        }
    }
    else toastDangerAlert("No se realizaron pruebas Covid en esta fecha", "¡Error!");
}


function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla3(lista, "divTabla", 10, 3);
    }
}


function crearTablaTodosLosResultados(rpta) {
    if (rpta) {
        lstResultadosDias = rpta.split('¬');
        var grillaModal = new GrillaModal(lstResultadosDias, "divTablaPuestos", 10, 3);
    }
}



function Grilla3(lista, divGrilla, registrosPagina, paginasBloque, sinFiltros) {
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
                //if (i < nRegistros) {
                //    html += "<tr onclick='seleccionarFila(this);' ondblclick='obtenerRegistroPorId(\"";
                //    html += matriz[i][0];
                //    html += "\");'>";

                //    for (var j = 0; j < ncampos; j++) {
                //        html += "<td>";
                //        html += matriz[i][j];
                //        html += "</td>";
                //    }
                //    html += "</tr>";
                //}
                //else break;

                if (i < nRegistros) {
                    //seleccionada = (ids.indexOf(matriz[i][0]) > -1);
                    html += "<tr ";
                    if (matriz[i][5] > 14) {
                        html += "class='table-danger'";
                    } else if (matriz[i][5] >= 4 & matriz[i][5] <= 7) {
                        html += "class='table-secondary'";
                    } else if (matriz[i][5] >= 0 & matriz[i][5] <= 3) {
                        html += "class='table-success'";
                    } else if (matriz[i][5] < 0) {
                        html += "class='table-primary'";
                    }

                    //html += ">";
                    //html += "<td><input class='check' type='checkbox' ";
                    //html += (seleccionada ? 'checked ' : '');
                    //html += "onclick='seleccionar(this,";
                    html += matriz[i][0];
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


