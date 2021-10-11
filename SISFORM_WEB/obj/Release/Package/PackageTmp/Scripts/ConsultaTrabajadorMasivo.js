window.onload = function () {
    if (!isMobile.any()) {
        Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
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
        Http.get("Trabajador/ListarTrabajador", CrearTablaCsv);
    }
    else toastDangerAlert("No se pudieron cargar los registros", "¡Error!");
}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}