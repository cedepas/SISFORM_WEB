var fechaActual;

window.onload = function () {
    if (!isMobile.any()) {
        //Llenar Combo Zona
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    //Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);
    Http.get("Cheff/ListarTiemposComidaCboCsv", mostrarTiemposComidaCbo);
    Http.get("Cheff/ListarCumplimientoMenuCsv?FK_ID_Usuario=" + window.sessionStorage.getItem('idUsuario'), CrearTablaCsv);

    obtenerfechaActual();

    datosEnDuro =
        [
            {
                'Negocio Local': 'RIHANNA'
                , 'Fecha Cumplimiento': fechaActual
                , 'Tiempos Comida': 'Almuerzo'
                , 'Tipo Comida': 'Guarnición'
                , 'Estado Cumplimiento': 'SI CUMPLIO'
                , 'Detalle Cumplimiento': '-'
            }
        ]
}

function mostrarTiemposComidaCbo(rpta) {
    if (rpta) {
        lstCabeceraChef = rpta.split("¯");
        lstTiempoComida = lstCabeceraChef[0].split("|");
        lstTipoComida = lstCabeceraChef[1].split("|");
        lstSeguimientoComida = lstCabeceraChef[2].split("|");
        lstComedores = lstCabeceraChef[3].split("|");
        lstCumplimiento = lstCabeceraChef[4].split("|");
        llenarDatos(datosEnDuro);
    }
}
function llenarDatos(llegoDato) {
    //console.log(llegoDato);
    var datosDB = llegoDato;
    configuraciones = {
        data: datosDB,
        colHeaders: [
            'Negocio Local', 'Fecha Cumplimiento', 'Tiempos Comida', 'Tipo Comida', 'Estado Cumplimiento', 'Detalle Cumplimiento'
        ],
        rowHeaders: true,
        licenseKey: 'non-commercial-and-evaluation',
        fillHandle: true,
        columns: [
            { data: "Negocio Local", type: 'dropdown', source: lstComedores },
            { data: "Fecha Cumplimiento", type: 'date', dateFormat: 'DD/MM/YYYY' },
            { data: "Tiempos Comida", type: 'dropdown', source: lstTiempoComida },
            { data: "Tipo Comida", type: 'dropdown', source: lstTipoComida },
            { data: "Estado Cumplimiento", type: 'dropdown', source: lstCumplimiento },
            { data: "Detalle Cumplimiento", }
        ],

        filters: true,
        dropdownMenu: true,
        contextMenu: true,
        language: 'es-MX',
        afterSelection: function (row, col, row2, col2) {
            var meta = this.getCellMeta(row2, col2);
            if (meta.readOnly) {
                this.updateSettings({ fillHandle: false });
            }
            else {
                this.updateSettings({ fillHandle: true });
            }
        },
        cells: function (row, col) {
            var cellProperties = {};
            var data = this.instance.getData();

            cellProperties.renderer = "negativeValueRenderer";
            //if (row === 0 || data[row] && data[row][col] === 'readOnly') {
            //    cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
            //}
            //else {
            //    cellProperties.renderer = "negativeValueRenderer"; // uses lookup map
            //}
            return cellProperties;
        },
        //afterChange: function (registroModificado, accionesHandsontable) {
        //    if (accionesHandsontable != 'loadData') {
        //        registroModificado.forEach(function (elemento) {
        //            var fila = tblExcel.getData()[elemento[0]];
        //            //console.log(fila);
        //            //lstTrabajadores = fila.toString();
        //            //console.log(lstTrabajadores);
        //        });
        //    }
        //}
    };
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    tblExcel = new Handsontable(document.getElementById('ResultadoTabla'), configuraciones, { language: 'es-MX' });
    tblExcel.render();

    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        if (!value || value === '') {
            td.style.background = '#F43E17';
        }
    }

    document.getElementById("btnGuardar").addEventListener("click", function (event) {
        lstCumplimientos = tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', });
        console.log(tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', }));
        lstFilas = tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', }).split('¬');
        errorVacio = 0;
        for (var i = 0; i < lstFilas.length; i++) {
            lstColumnas = lstFilas[i].split('|');
            var textoBusqueda;
            for (var j = 0; j < lstColumnas.length; j++) {
                if (lstColumnas[j] == "") {
                    errorVacio = 1;
                } else {
                    if (j == 0) {
                        var comedor = 0;
                        for (var k = 0; k < lstComedores.length; k++) {
                            textoBusqueda = lstColumnas[j].toLowerCase();
                            var datoComedor = lstComedores[k].toLowerCase();
                            if (datoComedor.indexOf(textoBusqueda) !== -1) {
                                comedor = 1;
                            }
                        }
                        //if (comedor == 0) {
                        //    errorVacio = 2;
                        //    toastDangerAlert("Dato no valido", "!Error¡");
                        //}
                    }
                    if (j == 2) {
                        var tiempoComida = 0;
                        for (var k = 0; k < lstTiempoComida.length; k++) {
                            textoBusqueda = lstColumnas[j].toLowerCase();
                            var datoTiempoComida = lstTiempoComida[k].toLowerCase();
                            if (datoTiempoComida.indexOf(textoBusqueda) !== -1) {
                                tiempoComida = 1;
                            }
                        }
                        if (tiempoComida == 0) {
                            errorVacio = 2;
                            toastDangerAlert("Dato no valido TIEMPO comida", "!Error¡");
                        }
                    }
                    if (j == 3) {
                        var tipoComida = 0;
                        for (var k = 0; k < lstTipoComida.length; k++) {
                            textoBusqueda = lstColumnas[j].toLowerCase();
                            var datoTiempoComida = lstTipoComida[k].toLowerCase();
                            if (datoTiempoComida.indexOf(textoBusqueda) !== -1) {
                                tipoComida = 1;
                            }
                        }
                        if (tipoComida == 0) {
                            errorVacio = 2;
                            toastDangerAlert("Dato no valido TIEMPO comida", "!Error¡");
                        }
                    }
                    if (j == 4) {
                        var estadoCumplimiento = 0;
                        for (var k = 0; k < lstCumplimiento.length; k++) {
                            textoBusqueda = lstColumnas[j].toLowerCase();
                            var datoTiempoComida = lstCumplimiento[k].toLowerCase();
                            if (datoTiempoComida.indexOf(textoBusqueda) !== -1) {
                                estadoCumplimiento = 1;
                            }
                        }
                        if (estadoCumplimiento == 0) {
                            errorVacio = 2;
                            toastDangerAlert("Dato no valido estado", "!Error¡");
                        }
                    }
                }

            }
        }
        if (errorVacio == 1) {
            toastDangerAlert("Existe una celda Vacia Favor de Verificar", "¡Aviso!");
        }
        else {
            checkSubmit(btnGuardar);
            Http.get("Cheff/GuardarCumplimientoMenu?FK_ID_Usuario=" + window.sessionStorage.getItem('idUsuario') + "&lstCumplimientos=" + lstCumplimientos, MostrarGrabarCumplimiento);
        }
    })
}

function MostrarGrabarCumplimiento(rpta) {
    if (rpta) {
        //btnLimpiardivTabla.dispatchEvent(new Event('click'));
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
        Http.get("Cheff/ListarCumplimientoMenuCsv?FK_ID_Usuario=" + window.sessionStorage.getItem('idUsuario'), CrearTablaCsv);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

function checkSubmit(boton) {
    boton.value = "Enviando...";
    boton.disabled = true;
    return true;
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
    fechaActual = dia + "/" + mes + "/" + ano;
}