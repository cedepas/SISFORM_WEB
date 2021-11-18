//const { default: html2pdf } = require("../plugins/html2pdf/html2pdf");
var pdfEnBase64;

window.onload = function () {
    idUsuario = window.sessionStorage.getItem('idUsuario');
    var lasCookies = document.cookie;
    lstCoockies = lasCookies.split(';');
    lstDatosEmpresa = lstCoockies[0].split('=');
    lstDatosFecha = lstCoockies[1].split('=');
    idEmpresa = lstDatosEmpresa[1];
    fechaCarta = lstDatosFecha[1];

    var meses = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ]

    var date = new Date(fechaCarta);
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var yyy = date.getFullYear();

    var fecha_formateada = dia + ' de ' + meses[mes] + ' de ' + yyy;
    document.getElementById("fechaCarta").innerHTML = fecha_formateada;
    document.getElementById("fechaCartaFinal").innerHTML = fecha_formateada;

    document.getElementById("soloMes").innerHTML = mes;
    document.getElementById("soloAño").innerHTML = yyy;

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
    Http.get("Carta/ListarIncidenciasAbiertasPorECMCsv?ID_Empresa=" + idEmpresa, mostrarIncidencias);
    Http.get("Carta/ObenerterCorrelativoCartaECMCsv?ID_Empresa=" + idEmpresa, mostrarCorrelativoCarta);

    var divRows = document.getElementsByClassName('form-row');
    for (var i = 0; i < divRows.length; i++) {
        divRows[i].classList.add("row-eq-spacing-sm");
    }
    bntGrabarCarta.onclick = function () {
        bntGrabarCarta.style.display = "none";

        //Http.get("Carta/GrabarCarta?ID_Empresa=" + idEmpresa, mostrarResultado);
        var datapdfff = "Holii";

        const elemento = document.getElementById("totaldelaCarta");
        //html2pdf()
        //    .from(elemento)
        //    .save();
        //var worker = html2pdf().from(elemento).save();
        var opcionesPDF = {
            margin: [0, 20]
            //filename: 'myfile.pdf',
            //image: { type: 'jpeg', quality: 0.98 },
            //html2canvas: { scale: 2 },
            //jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(elemento).set(opcionesPDF).outputPdf().then(function (pdf) {
            //This logs the right base64
            pdfEnBase64 = (btoa(pdf));
            //console.log(pdfEnBase64);
            var frm = new FormData();
            frm.append("dataPDF", pdfEnBase64);
            frm.append("FK_ID_EmpresaECM", idEmpresa);
            frm.append("fechaCarta", fechaCarta);
            frm.append("correlativoCarta", correlativoCarta);
            frm.append("usuario", idUsuario);
            if (validarRequeridos('E')) {
                checkSubmit(bntGrabarCarta);
                Http.post("Carta/GrabarCarta", mostrarRegistroDeCartas, frm);
            } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
            
        });
        //var worker = html2pdf().from(elemento).outputPdf();
        //var frm = new FormData();
        //frm.append("dataPDF", pdfEnBase64);
        //Http.post("Carta/ListarIncidenciasAbiertasPorECMCsv", mostrarIncidencias);

    }
}

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
}
function mostrarCorrelativoCarta(rpta) {
    if (rpta) {
        corre = parseInt(rpta, 10) + 1;
        correlativoCarta = agregarCeros(corre, 4);
        document.getElementById("correlativoCarta").innerHTML = correlativoCarta;
    }
    else toastDangerAlert("Error al obtener Numeración de carta", "¡Error!");
}

function mostrarRegistroDeCartas(rpta) {
    if (rpta) {
        window.location.href = "https://cedepasgs.org/Carta/CartaPreocupacion";
    }
    else toastDangerAlert("Error al obtener Numeración de carta", "¡Error!");
}

function agregarCeros(value, length) {
    return (value.toString().length < length) ? agregarCeros("0" + value, length) :
        value;
}

function mostrarIncidencias(rpta) {
    if (rpta) {
        listadoIncidencias.style.display = "inline-block";
        lstInciYDatosEmpresa = rpta.split("¯")
        lstIncidencias = lstInciYDatosEmpresa[0].split('¬');
        lstCabeceras = lstIncidencias[0].split('|');
        lstIncidencias.shift();
        cantidadIncidencias = lstIncidencias.length;
        lstDatoseECM = lstInciYDatosEmpresa[1].split('|');
        document.getElementById("nombreECM").innerHTML = lstDatoseECM[0];
        document.getElementById("encargadoECM").innerHTML = lstDatoseECM[1];
        document.getElementById("cargoRepresentante").innerHTML = lstDatoseECM[2];
        document.getElementById("lblNumeroIncidencias").innerHTML = cantidadIncidencias;
        document.getElementById("cantidadIncidenciastexto").innerHTML = cantidadIncidencias;

        var b, c, d, i = 0, j = 0, k = 0;
        b = document.createElement("tr");
        cantidadCabecera = lstCabeceras.length;
        while (i < cantidadCabecera) {
            if (i < cantidadCabecera) {
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
function mostrarResultado(rpta) {
    if (rpta) {
    }
}

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