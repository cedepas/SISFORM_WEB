var lstCboTipoEmpresa;
var idTipoEmpresa;
var idStakeholder;

var lista;
var objetoBusqueda = [];
var objetoParametrizado = [];
var textoBusqueda;
var idTrabajador;

window.onload = function () {
    if (!isMobile.any()) {
        /*Http.get("Empresa/ListarStakeholder", CrearTablaCsv);*/
        document.querySelectorAll('.form-row').forEach(function (element) {
            element.classList.add('row-eq-spacing-sm');
        });
    }

    document.querySelectorAll('.servicio').forEach(function (element) {
        element.addEventListener('change', function () {
            txtTotalServicios.value =
                parseInt(txtAlojamiento.value ? txtAlojamiento.value : 0) +
                parseInt(txtComedor.value ? txtComedor.value : 0) +
                parseInt(txtTransporte.value ? txtTransporte.value : 0) +
                parseInt(txtLavanderia.value ? txtLavanderia.value : 0) +
                parseInt(txtCompania.value ? txtCompania.value : 0) +
                parseInt(txtRiesgo.value ? txtRiesgo.value : 0) +
                parseInt(txtOtros.value ? txtOtros.value : 0);
        });
    });

    document.getElementById('txtBuscarPorTrabajador').addEventListener('search', function () {
        closeAllLists();
    });

    Http.get("Incidencia/ListarTrabajadorBusquedaCsv", mostrarListarTrabajador);
    Http.get("Stakeholder/ListarPoderConvocatoriaCbo", mostrarPoderConvocatoria);
    Http.get("Stakeholder/ListarTipoPosicionamientoCbo", mostrarPosicion);
    CrearListado();

    cboPosicion.onchange = function () {
        var element = document.getElementById("PosicionColor");
        switch (cboPosicion.value) {
            case '':
                element.classList.remove("bg-success");
                element.classList.remove("bg-danger");
                element.classList.remove("bg-primary");
                break;
            case '1':
                element.classList.remove("bg-primary");
                element.classList.remove("bg-danger");
                element.classList.add("bg-success");
                break;
            case '2':
                element.classList.remove("bg-danger");
                element.classList.remove("bg-success");
                element.classList.add("bg-primary");
                break;
            case '3':
                element.classList.remove("bg-primary");
                element.classList.remove("bg-danger");
                element.classList.add("bg-danger");
                break;
        }
    }

    txtBuscarPorTrabajador.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtBuscarPorTrabajador.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarPorTrabajador.value = this.getElementsByTagName("input")[0].value;
                    idTrabajador = objeto.IDTrab;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (!txtBuscarPorTrabajador.value) {
            txtBuscarPorTrabajador.value = "";
        }
    }

    btnGuardar.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Stakeholder", idStakeholder);
        frm.append("FK_ID_Trabajador", idTrabajador);
        frm.append("FK_ID_PoderConvocatoria", cboPoderConvocatoria.value);
        frm.append("FK_ID_TipoPosicionamiento", cboPosicion.value);
        frm.append("transporte", txtTransporte.value);
        frm.append("compania", txtCompania.value);
        frm.append("riesgo", txtRiesgo.value);
        frm.append("otros", txtOtros.value);
        frm.append("fecha", txtFechaStakeholder.value);
        frm.append("analisis", txtAnalisis.value);
        if (validarRequeridos('E')) {
            checkSubmit(btnGuardar);
            Http.post("Stakeholder/GrabarStakeholder", MostrarGrabarStakeholder, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }

    btnModalSuceso.onclick = function () {
        console.log(idStakeholder);
        Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=5", mostrarECM);
        mostrarEstado();
        mostrarTipoSuceso();
    }

    btnNuevo.onclick = function () {
        limpiarControles('form-control');
        document.querySelectorAll('.servicio').forEach(function (element) {
            element.value = 0;
        });
        btnGuardar.value = "Guardar";
        idTrabajador = undefined;
        cboPosicion.value = '';
        cboPosicion.dispatchEvent(new Event('change'));
        btnNuevo.style.visibility = "hidden";
        btnModalSuceso.style.display = "none";
    }

}

function CrearListado() {
    var rpta = "ID Stakeholder|Nombres y Apellidos|Poder Convocatoria|Posicion a MINSUR|Fecha¬1|DEYSI VANESSA BENITO DE LA CRUZ|ALTO|NEUTRAL|2021-05-04¬2|ANDREA LUNA QUISPE DE HUANCONDORI|MEDIO|FAVORABLE|2021-03-30"
    var lista = rpta.split('¬');
    var grilla = new Grilla(lista, "divTabla", 10, 3);
}

function obtenerRegistroPorId(id) {
/*    Http.get("Stakeholder/ObtenerStakeholderPorIdCsv?idStakeholder=" + id, AsignarCampos);*/
    //Http.get("Stakeholder/ListarStakeholderSucesosPorIdCsv?idTrabajador=" + id, CrearTablaCsvPuestos);
    AsignarCampos("2|206|2|1|1|0|1|0|1|0|0|2021-03-30|empresa cuenta con tienda y servicio de internet|ANDREA LUNA QUISPE DE HUANCONDORI");
}

function AsignarCampos(rpta) {
    if (rpta) {
        var campos = rpta.split('|');
        document.getElementById("txtIdStakeholder").innerHTML = campos[0];
        idStakeholder = campos[0];
        idTrabajador = campos[1];
        cboPosicion.value = campos[3];
        cboPosicion.dispatchEvent(new Event('change'));
        cboPoderConvocatoria.value = campos[2];
        txtAlojamiento.value = campos[4];
        txtComedor.value = campos[5];
        txtTransporte.value = campos[6];
        txtLavanderia.value = campos[7];
        txtCompania.value = campos[8];
        txtRiesgo.value = campos[9];
        txtOtros.value = campos[10];
        txtFechaStakeholder.value = campos[11];
        txtAnalisis.value = campos[12];
        txtTotalServicios.dispatchEvent(new Event('change'));
        txtBuscarPorTrabajador.value = campos[13];
        txtNombresApellidosProveedor.value = campos[13];
        btnNuevo.style.visibility = "visible";
        btnModalSuceso.style.display = "inline-block";
        btnGuardar.value = "Editar";
    } else {
        limpiarControles('form-control');
    }
}

function MostrarGrabarStakeholder(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function mostrarECM(rpta) {
    if (rpta) {
        lstCboECM = rpta.split('¬');
        CrearCombo(lstCboECM, cboECM, "Seleccione");
    }
}

function mostrarEstado() {
    lstCboEstado = ('1|ABIERTO¬2|CERRADO¬3|EN PROCESO').split('¬');
    CrearCombo(lstCboEstado, cboEstado, "Seleccione");
}

function mostrarTipoSuceso() {
    lstCboTipoSuceso = ('1|A FAVOR¬2|EN CONTRA').split('¬');
    CrearCombo(lstCboTipoSuceso, cboTipoSuceso, "Seleccione");
}

function mostrarPosicion(rpta) {
    if (rpta) {
        lstCboPosicion = rpta.split('¬');
        CrearCombo(lstCboPosicion, cboPosicion, "Seleccione");
    }
}

function mostrarPoderConvocatoria(rpta) {
    if (rpta) {
        lstCboPoderConvocatoria = rpta.split('¬');
        CrearCombo(lstCboPoderConvocatoria, cboPoderConvocatoria, "Seleccione");
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

function mostrarListarTrabajador(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoAllTrabajador(lista)
    }
}

function crearObjetoAllTrabajador() {
    objetoBusqueda = [];
    objetoParametrizado = [];
    cabeceras = lista[0].split('|');
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split('|');
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 0; i < (nRegistros - 1); i++) {
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