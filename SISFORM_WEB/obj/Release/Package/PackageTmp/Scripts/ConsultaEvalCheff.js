
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
    datosEnDuro =
        [
            {
                'Numeracion': '1'
                , 'Tiempos Comida': 'Desayuno'
                , 'Tipo Comida' : 'Postre'
            }
        ]
}
function mostrarTiemposComidaCbo(rpta) {
    if (rpta) {
        lstCabeceraChef = rpta.split("¯");
        lstTiempoComida = lstCabeceraChef[0].split("|");
        lstTipoComida = lstCabeceraChef[1].split("|");
        lstCriterioComida = lstCabeceraChef[2].split("|");
        llenarDatos(datosEnDuro);
    }
}
function llenarDatos(llegoDato) {
    //console.log(llegoDato);
    var datosDB = llegoDato;
    configuraciones = {
        data: datosDB,
        colHeaders: [
            'Numeracion', 'Tiempos Comida', 'Tipo Comida'
        ],
        rowHeaders: true,
        licenseKey: 'non-commercial-and-evaluation',
        fillHandle: true,
        columns: [
            { data: "Numeracion", type: 'numeric' },
            { data: "Tiempos Comida", type: 'dropdown', source: lstTiempoComida },
            { data: "Tipo Comida", type: 'dropdown', source: lstTipoComida }
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

    document.getElementById("guardaTrabajadores").addEventListener("click", function (event) {
        lstTrabajadores = tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', });
        console.log(tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', }));
        lstFilas = tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|', rowDelimiter: '¬', }).split('¬');
        errorVacio = 0;
        for (var i = 0; i < lstFilas.length; i++) {
            lstColumnas = lstFilas[i].split('|');
            var textoBusqueda;
            for (var j = 1; j < lstColumnas.length; j++) {
                if (j == 1) {
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
                        toastDangerAlert("Dato no valido", "!Error¡");
                    }
                }
                else {
                    if (lstColumnas[j] == "") {
                        errorVacio = 2;
                        var nroColumna, nroFila;
                        nroColumna = i + 1;
                        nroFila = j + 1;
                        Swal.fire({
                            icon: 'error',
                            title: '¡Celda Vacia!',
                            text: 'Columna ' + nroColumna + ' y la fila ' + nroFila + ' No permite datos Vacios',
                        });
                    }
                }
            }
        }
        if (errorVacio == 1) {
            Swal.fire({
                icon: 'error',
                title: 'Celda Vacia!',
                text: 'Existe una celda Vacia! favor de verificar',
            });
        }
        else if (errorVacio == 2) {

        }
        else {
            var frm = new FormData();
            frm.append("FK_ID_Empresa", idEmpresa);
            frm.append("FK_ID_Usuario", idUsuario);
            frm.append("lstTrabajadores", lstTrabajadores);
            Swal.fire({
                title: 'Esta Seguro de Registrar los Trabajadores?',
                text: "Favor de verificar las celdas de rojo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Registrar Trabajadores!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Http.post("Trabajador/RegistroTrabajorExcel", MostrarGrabar, frm)
                    Swal.fire(
                        'Procesando',
                        'Se ha procedido a realizar el Registro.',
                        'success'
                    )
                }
            });
        }
        //console.log(tblExcel.getPlugin("exportFile").exportAsString("csv", { columnDelimiter: '|' }));
    })
}