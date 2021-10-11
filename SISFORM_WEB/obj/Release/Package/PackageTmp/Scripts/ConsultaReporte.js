window.onload = function () {
    if (!isMobile.any()) {
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }

    btnConsulta.onclick = function () {
        if (validarRequeridos('E')) {
            Http.get("Reporte/ListarReporteCovid?fechaInicio=" + txtFechaInicio.value + "&fechaFin=" + txtFechaFin.value, dibujarGrafico);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    google.load("visualization", "1", { packages: ["corechart"] });
}

function dibujarGrafico(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var dataArray = [];
        var optionsArray = [];
        optionsArray.push(0);

        for (var i = 0; i < lista.length; i++) {
            dataArray.push(lista[i].split('|'));
        }

        var campos = [];
        for (var i = 1; i < lista.length; i++) {
            campos = lista[i].split('|');
            for (var j = 1; j < campos.length; j++) {
                dataArray[i][j] = campos[j] * 1;
            }
            optionsArray.push(i, { calc: "stringify", sourceColumn: i, type: "string", role: "annotation" });
        }

        var data = google.visualization.arrayToDataTable(dataArray);
        var view = new google.visualization.DataView(data);
        view.setColumns(optionsArray);

        var options = {
            title: 'Contagios en la empresa',
            hAxis: { title: 'Resultado de pruebas COVID', titleTextStyle: { color: 'red' } }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('divReporte'));
        chart.draw(view, options);
    } else toastPrimaryAlert("No hay registros en el rango de fechas","¡Informacion!")    
}
