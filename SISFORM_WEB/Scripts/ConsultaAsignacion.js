var idUsuario
var idEmpresaECM;
var idEmpresaServicio;
var objetoParametrizado = [];
var objetoParametrizadoServicio = [];
var objetoBusqueda = [];
var objetoBusquedaServicio = [];
//var filtro;
//var filtroServicio;
var textoBusqueda;
var textoBusquedaServicio;

var idAsignacionServicios;

var ids = [];
var asignacion = [];

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Trabajador/ListarEmpresasEspecializadasCsv", CrearListaCsv);
        Http.get("Trabajador/ListarTipoEmpresaAsiganacionCbo", mostrarTipoEmpresa);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }

        obtenerfechaActual();
        txtFechaAsignacion.value = fechaActual;

        cboTipoEmpresa.onchange = function () {
            CargarCboTipoEmpresa();
            asignacionStaft.style.display = "none";
            if (cboTipoEmpresa.value == 3) {
                asignacionStaft.style.display = "inline-block";
            }
            empresaServicio.style.display = "inline-block";
            tipoDeEmpresa.style.display = "inline-block";
            asignacionObrero.style.display = "inline-block";
            fechaTermino.style.display = "inline-block";
            Http.get("Trabajador/ListarServiciosAsignadosPorEmpresaECM?FK_ID_EmpresaECM=" + idEmpresaECM + "&FK_ID_TipoEmpresa=" + cboTipoEmpresa.value, CrearTablaCsv);
        }
        //cboTipoHabitacion.onchange = function () {
        //    Http.get("Trabajador/ListarEmpresaGraficoHospedajeCsv?FK_ID_tipoHabitacion=" + cboTipoHabitacion.value, cargarData);
        //}

        txtbuscarPorEmpresaECM.onkeyup = function () {
            var a, b;
            closeAllLists();
            a = document.createElement("div");
            a.setAttribute("id", this.id + "predictivo-list");
            a.setAttribute("class", "predictivo-items");
            this.parentNode.appendChild(a);
            textoBusqueda = txtbuscarPorEmpresaECM.value.toLowerCase();
            for (let objeto of objetoBusqueda) {
                let Nombre = objeto.NombreComercial.toLowerCase();
                if (Nombre.indexOf(textoBusqueda) !== -1) {
                    b = document.createElement("div");
                    b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                    b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                    b.addEventListener("click", function (e) {
                        txtbuscarPorEmpresaECM.value = this.getElementsByTagName("input")[0].value;
                        idEmpresaECM = objeto.IDEmpr;
                        closeAllLists();
                        txtbuscarPorEmpresaECM.disabled = true;
                        tipoEmpresa.style.display = "inline-block";
                    });
                    a.appendChild(b);
                }
            }
        }

        txtEmpresaServicio.onkeyup = function () {
            var a, b;
            closeAllListsServicio();
            a = document.createElement("div");
            a.setAttribute("id", this.id + "predictivo-list");
            a.setAttribute("class", "predictivo-items");
            this.parentNode.appendChild(a);
            textoBusquedaServicio = txtEmpresaServicio.value.toLowerCase();
            for (let objeto of objetoBusquedaServicio) {
                let Nombre = objeto.NombreComercial.toLowerCase();
                if (Nombre.indexOf(textoBusquedaServicio) !== -1) {
                    b = document.createElement("div");
                    b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                    b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                    b.addEventListener("click", function (e) {
                        txtEmpresaServicio.value = this.getElementsByTagName("input")[0].value;
                        idEmpresaServicio = objeto.IDEmpr;
                        closeAllListsServicio();
                        txtEmpresaServicio.disabled = true;
                        if (cboTipoEmpresa.value == 3) {
                            Http.get("Trabajador/ObtenerCapacidadHospedajePorIDCsv?FK_ID_Empresa=" + idEmpresaServicio, capacidadHospedajes);
                        }
                    });
                    a.appendChild(b);
                }
            }
        }

        btnGrabar.onclick = function () {
            var frm = new FormData();
            if (idAsignacionServicios) {
                frm.append("ID_AsignacionServicios", idAsignacionServicios);
            }
            if (cboTipoEmpresa.value == 3) {
                //if (txtHabStaft.value <= txtCapHabStaft.value && txtHabObrero.value <= txtCapHabObrero.value) {
                if (parseInt(txtHabStaft.value, 10) <= parseInt(txtCapHabStaft.value, 10) && parseInt(txtHabObrero.value) <= parseInt(txtCapHabObrero.value)) {
                    frm.append("ID_AsignacionServicios", idAsignacionServicios);
                    frm.append("FK_ID_EmpresaECM", idEmpresaECM);
                    frm.append("FK_ID_EmpresaNNLL", idEmpresaServicio);
                    frm.append("FK_ID_EstadoAsignacionServicios", cboEstadoAsignacion.value);
                    frm.append("habStatf", txtHabStaft.value);
                    frm.append("habObrero", txtHabObrero.value);
                    frm.append("fechaAsignacion", txtFechaAsignacion.value);
                    frm.append("fechaTermino", txtFechaTermino.value);
                    frm.append("FK_ID_UsuarioCrea", idUsuario);
                    if (validarRequeridos('T')) {
                        checkSubmit(btnGrabar);
                        Http.post("Trabajador/AsignacionServiciosOperacion", MostrarGrabar, frm);
                    } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
                }
                else toastDangerAlert("El número de camas supera la capacidad del NNLL", "¡Aviso!");
            } else {
                frm.append("ID_AsignacionServicios", idAsignacionServicios);
                frm.append("FK_ID_EmpresaECM", idEmpresaECM);
                frm.append("FK_ID_EmpresaNNLL", idEmpresaServicio);
                frm.append("FK_ID_EstadoAsignacionServicios", cboEstadoAsignacion.value);
                frm.append("habStatf", txtHabStaft.value);
                frm.append("habObrero", txtHabObrero.value);
                frm.append("fechaAsignacion", txtFechaAsignacion.value);
                frm.append("fechaTermino", txtFechaTermino.value);
                frm.append("FK_ID_UsuarioCrea", idUsuario);
                if (validarRequeridos('T')) {
                    checkSubmit(btnGrabar);
                    Http.post("Trabajador/AsignacionServiciosOperacion", MostrarGrabar, frm);
                } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
            }

        }

        function checkSubmit(boton) {
            boton.value = "Enviando...";
            boton.disabled = true;
            return true;
        }

        bntNuevo.onclick = function () {
            location.reload();
        }

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
function closeAllListsServicio(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusquedaServicio) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function capacidadHospedajes(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        txtCapHabStaft.value = campos[0];
        txtCapHabObrero.value = campos[1];
    }
}

function mostrarTipoEmpresa(rpta) {
    if (rpta) {
        lstCbos = rpta.split('¯');
        lstCboTipoEmpresa = lstCbos[0].split('¬');
        lstCboTipoHabitacion = lstCbos[1].split('¬');
        lstCboEstadoAsignacion = lstCbos[2].split('¬');
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
        //CrearCombo(lstCboTipoHabitacion, cboTipoHabitacion, "Seleccione");
        CrearCombo(lstCboEstadoAsignacion, cboEstadoAsignacion, "Seleccione");
    }
}

function CargarCboTipoEmpresa() {
    ids = [];
    asignacion = [];
    Http.get("Trabajador/ListarEmpresaPorTipoCbo?idTipoEmpresa=" + cboTipoEmpresa.value, CrearListaEmpresaServicioCsv);

    //Http.get("Trabajador/ListarEmpresaGrafico?idTipoEmpresa=" + cboTipoEmpresa.value, cargarData);

    //if (cboTipoEmpresa.value == 3) {
    //    tipoHabitacion.style.display = "inline-block";
    //}
}

function MostrarGrabar(rpta) {
    if (rpta) {
        Http.get("Trabajador/ListarServiciosAsignadosPorEmpresaECM?FK_ID_EmpresaECM=" + idEmpresaECM + "&FK_ID_TipoEmpresa=" + cboTipoEmpresa.value, CrearTablaCsv);
        toastSuccessAlert("Los registros se guardaron correctamente", "¡Exito!");
    }
    else toastDangerAlert("No se pudieron grabar los registros", "¡Error!");
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

function CrearListaEmpresaServicioCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoServicio(lista)
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

function crearObjetoServicio() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusquedaServicio = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoServicio.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoServicio[i][j];
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaServicio.push(valoresAInsertar);
    }
}

function obtenerRegistroPorId(id) {
    Http.get("Trabajador/ObtenerAsignacionServicioPorId?idAsignacionServicio=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        var campos = rpta.split('|');
        fechaTermino.style.display = "inline-block";
        btnGrabar.disabled = false;
        btnGrabar.value = "Grabar";
        idAsignacionServicios = campos[0];
        document.getElementById("lblNumeroAsignacion").innerHTML = campos[0];
        txtbuscarPorEmpresaECM.value = campos[1];
        idEmpresaECM = campos[2];
        cboTipoEmpresa.value = campos[3];
        txtEmpresaServicio.value = campos[4];
        idEmpresaServicio = campos[5];
        txtEmpresaServicio.disabled = true;
        cboEstadoAsignacion.value = campos[6];
        txtFechaAsignacion.value = campos[7];
        txtFechaTermino.value = campos[8];
        txtHabStaft.value = campos[9];
        txtHabObrero.value = campos[10];
        txtCapHabStaft.value = campos[11];
        txtCapHabObrero.value = campos[12];
    }
}

function dibujarGrafico() {
    new Chartist.Bar('.ct-chart', {
        labels: campos,
        series: [
            { className: "stroke-ocupado", meta: "Ocupado", data: ocupado },
            { className: "stroke-ocupado", meta: "Reservado", data: reservado },
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

function dibujarGrafico2() {
    var divChart = document.querySelector("#ct-chart");
    divChart.innerHTML = "";

    var options = {
        series: [
            { className: "stroke-ocupado", name: 'Ocupados', data: ocupado },
            { name: 'Reservados', data: reservado },
            { name: 'Capacidad', data: espera },
            { name: 'Libres', data: libre }
        ],
        colors: ['#ff2626', '#ffa726', '#2982ff', '#3ba331'],
        chart: {
            type: 'bar',
            height: nDatos * 30,
            stacked: true,
            foreColor: '#fff',
            width: '100%',
            toolbar: {
                show: false
            }, animations: {
                enabled: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: 'Ocupacion de servicios'
        },
        xaxis: {
            type: 'category',
            categories: campos,
            labels: {
                style: {
                    fontSize: '12px',
                }
            }
        },
        yaxis: {
            labels: {
                minWidth: 200,
                maxWidth: 200,
                style: {
                    fontSize: '12px',
                }
            }
        },
        tooltip: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        responsive: [
            {
                breakpoint: 500,
                options: {
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ]
    };

    var chart = new ApexCharts(divChart, options);
    chart.render();
}

function cargarData(rpta) {
    var listas = rpta.split('¬');

    serv = listas[0].split('|');
    campos = listas[1].split('|');
    ocupado = listas[2].split('|');
    reservado = listas[3].split('|');
    espera = listas[4].split('|');
    libre = listas[5].split('|');

    nDatos = campos.length;

    ocupado = ocupado.map(function (x) {
        return parseInt(x, 10);
    });

    espera = espera.map(function (x) {
        return parseInt(x, 10);
    });

    libre = libre.map(function (x) {
        return parseInt(x, 10);
    });
    dibujarGrafico2()
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
