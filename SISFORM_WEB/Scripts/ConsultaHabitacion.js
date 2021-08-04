var idHabitacion;
var idEmpresa;

var objetoBusqueda = [];
var objetoParametrizado = [];
var textoBusqueda;

window.onload = function () {
    if (!isMobile.any()) {
        document.querySelectorAll('.form-row').forEach(function (element) {
            element.classList.add('row-eq-spacing-sm');
        });
    }

    Http.get("Habitacion/ListarEmpresasHospedajesCsv", CrearTablaCsv);

    btnAgregarHabitacion.onclick = function () {
        var frm = new FormData();
        if (idHabitacion) { frm.append("ID_Habitacion", idHabitacion); }
        if (txtNumeroCamas.value == 1) {
            txtEstadoRAH.checked = 0;
        }
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("FK_ID_TipoHabitacion", cboTipoHabitacion.value);
        frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        frm.append("numeroHabitacion", txtNumeroHabitacion.value);
        frm.append("numeroCamas", txtNumeroCamas.value);
        frm.append("detalleHabitacion", txtDetalleHabitacion.value);
        frm.append("EstadoRAH", (txtEstadoRAH.checked == true ? 1 : 0));
        frm.append("numeroTV", txtNumeroTv.value);
        if (validarRequeridos('HD')) {
            if (validarTipoHabitacion()) {
                Http.post("Habitacion/GrabarHabitacion", MostrarGrabarHabitacion, frm);
            }
        }
    }

    btnModalHabitacion.onclick = function () {
        idHabitacion = undefined;
        Http.get("Habitacion/ListarHabitacionPorIdEmpresaCsv?idEmpresa=" + idEmpresa, CrearTablaCsvHabitaciones);
        Http.get("Habitacion/ListarTipoHabitacionCboCsv", mostrarTipoHabitacion);
        //Http.get("Habitacion/ListarEstadoHabitacionCboCsv", mostrarEstadoHabitacion);
    }

    btnNuevaHabitacion.onclick = function () {
        limpiarControles("HD");
        btnNuevaHabitacion.style.visibility = "hidden";
        btnEliminarHabitacion.style.visibility = "hidden";
        idHabitacion = undefined;
    }

    btnEliminarHabitacion.onclick = function () {
        console.log(idHabitacion);
        var frm = new FormData();
        if (idHabitacion) { frm.append("ID_Habitacion", idHabitacion); }
        if (validarTipoHabitacion()) {
            Http.post("Habitacion/EliminarHabitacion?op=D", MostrarGrabarHabitacion, frm);
        }
    }

}

function validarTipoHabitacion() {
    if (cboTipoHabitacion.value == '1') {
        if (txtNumeroCamas.value <= 0 || txtNumeroCamas.value > 1) {
            txtNumeroCamas.style.borderColor = "red";
            toastDangerAlert("Solo esta permitido el valor 1 para habitación STAFF", "¡Aviso!");
            return false;
        }
        else {
            txtNumeroCamas.style.borderColor = "";
            return true;
        }
    }

    else {
        if (txtNumeroCamas.value <= 0) {
            txtNumeroCamas.style.borderColor = "red";
            toastDangerAlert("Valor mínimo de 1 para habitación OBRERO", "¡Aviso!");
            return false;
        }
        else {
            txtNumeroCamas.style.borderColor = "";
            return true;
        }
    }
}


function MostrarGrabarHabitacion(rpta) {
    if (rpta) {
        btnLimpiardivTabla.dispatchEvent(new Event('click'));
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
        Http.get("Habitacion/ListarHabitacionPorIdEmpresaCsv?idEmpresa=" + idEmpresa, CrearTablaCsvHabitaciones);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function obtenerRegistroPorId(id) {
    idEmpresa = id;
    Http.get("Habitacion/ObtenerTotalHabitacionPorIdEmpresaCsv?idEmpresa=" + id, function (rpta) {
        rpta = rpta.split('|');
        txtNombreComercial.value = rpta[0];
        txtCantidadStaff.value = rpta[1];
        txtCantidadObrero.value = rpta[2];
        txtCantidadHabitaciones.value = rpta[3];
        txtCantidadCamasStaff.value = rpta[4];
        txtCantidadCamasObrero.value = rpta[5];
        txtCantidadCamas.value = rpta[6];
    });
    btnModalHabitacion.style.display = "inline-block";
}

function mostrarTipoHabitacion(rpta) {
    if (rpta) {
        lstCboTipoHabitacion = rpta.split('¬');
        CrearCombo(lstCboTipoHabitacion, cboTipoHabitacion, "Seleccione");
    }
}

//function mostrarEstadoHabitacion(rpta) {
//    if (rpta) {
//        lstCboEstadoHabitacion = rpta.split('¬');
//        CrearCombo(lstCboEstadoHabitacion, cboEstadoHabitacion, "Seleccione");
//    }
//}

function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        new Grilla(lista, "divTabla", 10, 3);
    }
}

function CrearTablaCsvHabitaciones(rpta) {
    lstHabitaciones = rpta.split('¬');
    new GrillaModal(lstHabitaciones, "divTablaHabitaciones", 10, 3);
}

function modalObtenerRegistroPorId(id) {
    btnNuevaHabitacion.style.visibility = "visible";
    Http.get("Habitacion/ObtenerHabitacionPorIdCsv?idHabitacion=" + id, function (rpta) {
        if (rpta) {
            btnEliminarHabitacion.style.visibility = "visible";
            var campos = rpta.split('|');
            idHabitacion = campos[0];
            cboTipoHabitacion.value = campos[1];
            cboTipoHabitacion.text = campos[2];
            txtNumeroHabitacion.value = campos[3];
            txtNumeroCamas.value = campos[4];
            txtDetalleHabitacion.value = campos[5];
            txtEstadoRAH.checked = (campos[6] == 0 ? false : true);
            //cboEstadoHabitacion.value = campos[6];
            //cboEstadoHabitacion.text = campos[7];
            txtNumeroTv.value = campos[7];
        } else {
            limpiarControles('form-control');
        }
    });
}

