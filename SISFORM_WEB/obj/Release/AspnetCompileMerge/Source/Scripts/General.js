var filaAnterior = null;

var Http = (function () {
    function Http() {
    }
    Http.get = function (url, callBack) {
        requestServer(url, "get", callBack);
    }

    Http.post = function (url, callBack, data) {
        requestServer(url, "post", callBack, data);
    }

    function requestServer(url, metodoHttp, callBack, data, tipoRpta) {
        var urlBase = window.sessionStorage.getItem("urlBase");
        if (urlBase == null) urlBase = "";
        var xhr = new XMLHttpRequest();
        xhr.open(metodoHttp, urlBase + url);
        if (tipoRpta != null && tipoRpta != "") xhr.responseType = tipoRpta;
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                if (tipoRpta != null && tipoRpta != "") callBack(xhr.response);
                else callBack(xhr.responseText);
            }
        }
        if (metodoHttp == "get") xhr.send();
        else xhr.send(data);
    }
    return Http;
})();
window.Http = Http;

function navegar(url) {
    var urlBase = window.sessionStorage.getItem("urlBase");
    window.location.href = urlBase + url;
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

function seleccionarFila(fila) {
    if (filaAnterior != null) {
        filaAnterior.className = "";
    }
    fila.className = "table-primary";
    filaAnterior = fila;
}

function CrearCombo(lista, cbo, primerItem) {
    var html = "";
    if (primerItem != null && primerItem != "") {
        html += `
            <option value=''>${primerItem}</option>
        `;
    }
    var nRegistros = lista.length;
    var campos = [];
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("|");
        html += `
            <option value='${campos[0]}'>${campos[1]}</option>
        `;
    }
    cbo.innerHTML = html;
}

function predictivo(inp, lista) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < lista.length; i++) {
            if (lista[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + lista[i].substr(0, val.length) + "</strong>";
                b.innerHTML += lista[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + lista[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "predictivo-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("predictivo-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("predictivo-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("predictivo-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// Toasts success alert
function toastSuccessAlert(contenido = "This is a success alert that will be filled only in light mode.", titulo = "Success alert") {
    halfmoon.initStickyAlert({
        content: contenido,//"This is a success alert that will be filled only in light mode.",
        title: titulo,//"Success alert",
        alertType: "alert-success",
        fillType: "filled-lm"
    });
}

// Toasts danger alert
function toastDangerAlert(contenido = "This is a danger alert that will be always filled.", titulo = "Danger alert") {
    halfmoon.initStickyAlert({
        content: contenido,//"This is a danger alert that will be always filled.",
        title: titulo,//"Danger alert",
        alertType: "alert-danger",
        fillType: "filled"
    });
}

// Toasts primary alert
function toastPrimaryAlert(contenido = "This is a danger alert that will be always filled.", titulo = "Danger alert") {
    halfmoon.initStickyAlert({
        content: contenido,//"This is a primary alert without a close button, that will stay up for 10 seconds.",
        title: titulo,//"Primary alert",
        alertType: "alert-primary",
        hasDismissButton: false,
        timeShown: 10000
    });
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function validarRequeridos(clase) {
    var ce = 0;
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        if (controles[j].required) {
            if (controles[j].value == "") {
                controles[j].style.borderColor = "red";
                ce++;
            } else {
                controles[j].style.borderColor = "";
            }
        }        
    }
    return (ce == 0);
}

function limpiarControles(clase) {
    //spnValida.innerHTML = "";
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        controles[j].value = "";
        controles[j].style.borderColor = "";
    }
}