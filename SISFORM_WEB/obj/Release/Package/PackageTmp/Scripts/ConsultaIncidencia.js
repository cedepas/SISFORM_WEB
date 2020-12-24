var lstZona;
var idZona;
var lstUbicacion;
var lstCboEmpresa;
var fechaActual;
var IdTrabajador;
var lstCboTipoProgrInci;
var idIncidenciaTemp;
var idCategoria;
var lstCboCategoria;
var idBloque;
var lstCboBloque;
var lsEspecificacion;
var lstCboEspecificacion;
var lstCboTipoEvento;
var lstCboBarrera;
var lstCboRangoCumplimiento;
var idIncidencia;
var idBarrera;
var lstCboTipoBarrera;
var lstCboEmpresaIncidente;
var lstCboTipoEmpresa;
var idTipoEmpresa;
var imagB64;
var cabeseraImagen;
var TipoImagen;

var lista;
var objetoParametrizado = [];
var objetoBusqueda = [];
var textoBusqueda;
var idEmpresaInfractora;
var idEmpresaInvolucrada

window.onload = function () {
    if (!isMobile.any()) {
        //Llenar Combo Zona
        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    //Http.get("Trabajador/ListarEmpresaCbo", mostrarEmpresaCbo);
    Http.get("Incidencia/ListarTipoEmpresaCbo", mostrarTipoEmpresaCbo);
    Http.get("Incidencia/ListarTipoProgramacionIncidenciaCsv", mostrarTipoProgrInciCbo);
    Http.get("Incidencia/ListarZonaCbo", mostrarZonaCbo);
    Http.get("Incidencia/ObtenerIdTrabajadorPorIdUsuarioCsv?idUsuario=" + window.sessionStorage.getItem('idUsuario'), obtenerIdTrabajador);
    Http.get("Incidencia/ListarIncidenciasActCsv", CrearTablaCsv);
    Http.get("Incidencia/ListarTipoEventoCsv", mostrarTipoEventoCbo);
    Http.get("Incidencia/ListarCategoriaCsv", mostrarCategoriaCbo);
    Http.get("Incidencia/ListarBarreraCsv", mostrarBarreraCbo);
    obtenerfechaActual();

    txtFechaIncidencia.value = fechaActual;
    //Grabar Registro cabecera de la incidencia

    btnGrabarIncidencia.onclick = function () {
        var frm = new FormData();
        frm.append("fechaHecho", txtFechaIncidencia.value);
        frm.append("FK_ID_EmpresaInfractora", idEmpresaInfractora);
        frm.append("FK_ID_Zona", cboZona.value);
        frm.append("FK_ID_Ubicacion", cboUbicacion.value);
        frm.append("FK_ID_TrabajadorReporta", IdTrabajador);
        frm.append("FK_ID_TipoProgramacionIncidencia", cboTipoProgInci.value);
        frm.append("fechaLimiteSolucion", txtFechaIncidencia.value);

        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarIncidencia);
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarCabecera, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");

    }
    btnRegDeta.onclick = function () {
        
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidencia);
        frm.append("FK_ID_TipoEvento", cboTipoEvento.value);
        frm.append("FK_ID_Categoria", cboCategoria.value);
        frm.append("FK_ID_Bloque", cboBloque.value);
        frm.append("FK_ID_Especificacion", cboEspecificacion.value);
        frm.append("FK_ID_EmpresaInvolucrada", idEmpresaInvolucrada);
        frm.append("detalleHecho", txtDetalles.value);

        if (validarRequeridos('DE')) {
            checkSubmit(btnRegDeta);
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarTipoEvento, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    btnBarrera.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidencia);
        frm.append("FK_ID_Barrera", cboBarrera.value);
        frm.append("FK_ID_TipoBarrera", cboTipoBarrera.value);
        frm.append("detalleBarrera", txtBarrera.value);

        if (validarRequeridos('DB')) {
            checkSubmit(btnBarrera);
            Http.post("Incidencia/GrabarIncidencia", MostrarGrabarBarrera, frm);
            btnModalImagen.style.display = "inline-block";
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    btnImagenIndicencia.onclick = function () {
        var frm = new FormData();
        frm.append("ID_Incidencia", idIncidencia);
        frm.append("imagen", imagB64);
        frm.append("tipoimagen", TipoImagen);
        frm.append("FK_ID_TrabajadorSoluciona", IdTrabajador);
        frm.append("cabeseraImg", cabeseraImagen);
        if (validarRequeridos('E')) {
            checkSubmit(btnImagenIndicencia);
            Http.post("Incidencia/IncidenciaImagen", MostrarIncidenciaImagen, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }
    //Llenar Combo Ubicación
    cboZona.onchange = function () {
        idZona = cboZona.value;
        listarUbicacionCbo();
    }
    cboCategoria.onchange = function () {
        idCategoria = cboCategoria.value;
        listarBloqueCbo();
    }
    cboBloque.onchange = function () {
        idBloque = cboBloque.value;
        listarEspecificacionCbo();
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
    }
    cboBarrera.onchange = function () {
        idBarrera = cboBarrera.value;
        listarTipoBarreraCbo();
    }
    cboTipoEmpresa.onchange = function () {
        idTipoEmpresa = cboTipoEmpresa.value;
        listarEmpresaPorTipoCbo();

    }
    txtbuscarPorEmpresaInfractora.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtbuscarPorEmpresaInfractora.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresaInfractora.value = this.getElementsByTagName("input")[0].value;
                    idEmpresaInfractora = objeto.IDEmpr;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    txtbuscarPorEmpresaInvolucrada.onkeyup = function () {
        //objetoParametrizado = [];
        //objetoBusqueda = [];
        //Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtbuscarPorEmpresaInvolucrada.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresaInvolucrada.value = this.getElementsByTagName("input")[0].value;
                    idEmpresaInvolucrada = objeto.IDEmpr;
                    closeAllLists();
                });
                a.appendChild(b);
            }
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
function mostrarZonaCbo(rpta) {
    if (rpta) {
        lstZona = rpta.split("¬");
        CrearCombo(lstZona, cboZona, "Seleccione");
    }
}
function listarUbicacionCbo() {
    Http.get("Incidencia/ListarUbicacionCbo?idZona=" + idZona, mostrarUbicacionCbo);
}
function mostrarUbicacionCbo(rpta) {
    if (rpta) {
        lstUbicacion = rpta.split("¬");
        CrearCombo(lstUbicacion, cboUbicacion, "Seleccione");
    }
}
function listarBloqueCbo() {
    Http.get("Incidencia/ListarBloqueCsv?idCategoria=" + idCategoria, mostrarBloqueCbo);
}
function mostrarBloqueCbo(rpta) {
    if (rpta) {
        lstCboCategoria = rpta.split("¬");
        CrearCombo(lstCboCategoria, cboBloque, "Seleccione");
    }
}
function listarEspecificacionCbo() {
    Http.get("Incidencia/ListarEspecificacionCsv?idCategoria=" + idCategoria + "&idBloque=" + idBloque, mostrarEspecificacionCbo);
}
function mostrarEspecificacionCbo(rpta) {
    if (rpta) {
        lstCboEspecificacion = rpta.split("¬");
        CrearCombo(lstCboEspecificacion, cboEspecificacion, "Seleccione");
    }
}
function listarTipoBarreraCbo() {
    Http.get("Incidencia/ListarTipoBarreraCsv?idBarrera=" + idBarrera, mostrarTipoBarreraCbo);
}
function mostrarTipoBarreraCbo(rpta) {
    if (rpta) {
        lstCboTipoBarrera = rpta.split("¬");
        CrearCombo(lstCboTipoBarrera, cboTipoBarrera, "Seleccione");
    }
}
//function mostrarEmpresaCbo(rpta) {
//    if (rpta) {
//        lstCboEmpresa = rpta.split("¬");
//        CrearCombo(lstCboEmpresa, cboEmpresaInvolucrada, "Seleccione");
//    }
//}

function CrearListaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}
function mostrarTipoEmpresaCbo(rpta) {
    if (rpta) {
        lstCboTipoEmpresa = rpta.split("¬");
        CrearCombo(lstCboTipoEmpresa, cboTipoEmpresa, "Seleccione");
    }
}
function listarEmpresaPorTipoCbo() {
    Http.get("Incidencia/ListarEmpresaPorTipoCboCsv?idTipoEmpresa=" + idTipoEmpresa, mostrarEmpresaPorTipoCbo);

}
function mostrarEmpresaPorTipoCbo(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}
function mostrarTipoEventoCbo(rpta) {
    if (rpta) {
        lstCboTipoEvento = rpta.split("¬");
        CrearCombo(lstCboTipoEvento, cboTipoEvento, "Seleccione");
    }
}
function mostrarTipoProgrInciCbo(rpta) {
    if (rpta) {
        lstCboTipoProgrInci = rpta.split("¬");
        CrearCombo(lstCboTipoProgrInci, cboTipoProgInci, "Seleccione");
    }
}
function mostrarCategoriaCbo(rpta) {
    if (rpta) {
        lstCboCategoria = rpta.split("¬");
        CrearCombo(lstCboCategoria, cboCategoria, "Seleccione");
    }
}
function mostrarBarreraCbo(rpta) {
    if (rpta) {
        lstCboBarrera = rpta.split("¬");
        CrearCombo(lstCboBarrera, cboBarrera, "Seleccione");
    }
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
function obtenerIdTrabajador(rpta) {
    if (rpta) {
        IdTrabajador = rpta;
    }
}
function MostrarGrabarCabecera(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        document.getElementById("lblNumeroIncidencia").innerHTML = rpta;
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "1/4 Completos";
        btnModalTipoEvento.style.display = "inline-block";
        btnGrabarIncidencia.style.display = "none";
        idIncidencia = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
} function MostrarGrabarTipoEvento(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro del Tipo de Evento se registró correctamente", "¡Exito!");
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "2/4 Completos";
        btnGrabarIncidencia.style.display = "none";
        btnModalBarrera.style.display = "inline-block";
        btnModalTipoEvento.style.display = "none";
        idIncidencia = rpta;
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarGrabarBarrera(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la Barrera se registró correctamente", "¡Exito!");
        lblRegTitu.style.visibility = "visible";
        lblAlertaRegistro.style.visibility = "visible";
        document.getElementById("lblAlertaRegistro").innerHTML = "3/4 Completos";
        btnGrabarIncidencia.style.display = "none";
        btnModalBarrera.style.display = "none";
        btnModalTipoEvento.style.display = "none";
        idIncidencia = rpta;
        Http.get("Incidencia/EnviarCorreo?idIncidencia=" + idIncidencia, mostrarEnvioCorreo);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function MostrarIncidenciaImagen(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro de la incidencia fue correcto", "¡Exito!");
        btnModalImagen.style.display = "none";
        idIncidencia = rpta;
        //Http.get("Incidencia/EnviarCorreo?idIncidencia=" + idIncidencia, mostrarEnvioCorreo);
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}
function mostrarEnvioCorreo(rpta) {
    if (rpta) {
        toastSuccessAlert("Se envió el correo al Infractor correctamente.", "¡Exito!");
    }

}
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}
function obtenerRegistroPorId(id) {
    Http.get("Incidencia/ObtenerIncidenciaPorIdCsv?idIncidencia=" + id, AsignarCampos);
}
function AsignarCampos(rpta) {

    if (rpta) {
        var campos = rpta.split('|');

        document.getElementById("lblNumeroIncidencia").innerHTML = campos[0];
        idIncidencia = campos[0];
        txtFechaIncidencia.value = campos[1];
        cboEmpresaIncidente.value = campos[2];
        cboZona.value = campos[3];
        cboUbicacion.value = campos[4];
        cboTipoProgInci.value = campos[5];
        cboTipoEvento.value = campos[6];
        cboCategoria.value = campos[7];
        cboBloque.value = campos[8];
        cboEspecificacion.value = campos[9];
        cboEmpresaInvolucrada.value = campos[10];
        txtDetalles.value = campos[11];
        cboBarrera.value = campos[12];
        cboTipoBarrera.value = campos[13];
        txtBarrera.value = campos[14];
        if (cboTipoEvento.value == 0 || cboTipoEvento.value == "") {
            btnGrabarIncidencia.style.display = "none";
            btnModalTipoEvento.style.display = "inline-block";
            lblRegTitu.style.visibility = "visible";
            lblAlertaRegistro.style.visibility = "visible";
            document.getElementById("lblAlertaRegistro").innerHTML = "1/4 Completos";
        } else {
            if (cboTipoEvento.value > 0) {
                btnGrabarIncidencia.style.display = "none";
                btnModalTipoEvento.style.display = "none";
                lblRegTitu.style.visibility = "visible";
                lblAlertaRegistro.style.visibility = "visible";
                document.getElementById("lblAlertaRegistro").innerHTML = "2/4 Completos";
            }
            if (cboBarrera.value == 0 || cboBarrera.value == "") {
                btnModalBarrera.style.display = "inline-block";

            }
        }
    } else {
        limpiarControles('form-control');
    }
}
function codificarImg(event) {
    for (let i = 0; i < 2; i++) {
        var selectFile = event.files[0];
        var reader = new FileReader();
        TipoImagen = selectFile.type;



        reader.onload = function (e) {

            img = e.target.result;
            imgVistaPrevia.src = img;
        }
        reader.readAsDataURL(selectFile);

        imgVistaPrevia.onload = function () {
            if (img) {
                imgre = resizing(img, 650, 500);
                imgVistaPrevia.style.display = "inline-block";
                imgVistaPrevia.src = imgre;
                imagB64 = imgre.substring(22, imgre.length).toString();
                cabeseraImagen = imgre.substring(0, 22).toString()
            }
        }
    }
}
function resizing(base64, maxWidth, maxHeight) {
    if (typeof (maxWidth) === 'undefined') var maxWidth = 500;
    if (typeof (maxHeight) === 'undefined') var maxHeight = 500;

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var copyCanvas = document.createElement("canvas");
    var copyCtx = copyCanvas.getContext("2d");

    var img = new Image();
    img.src = base64;

    var ratio = 1;
    if (img.width > maxWidth)
        ratio = maxWidth / img.width;
    else if (img.height > maxHeight)
        ratio = maxHeight / img.height;

    copyCanvas.width = img.width;
    copyCanvas.height = img.height;
    copyCtx.drawImage(img, 0, 0);

    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(copyCanvas, 0, 0, copyCanvas.width, copyCanvas.height, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
}
function crearObjeto() {
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    var objetoBusqueda = [];
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizado.push(datos);
    }
    for (var i = 1; i <= nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizado[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusqueda.push(valoresAInsertar);
    }
}