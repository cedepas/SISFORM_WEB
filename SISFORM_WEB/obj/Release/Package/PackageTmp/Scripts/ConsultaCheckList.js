var idUsuario
var idEmpresa;
var objetoParametrizado = [];
var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var idTipoEmpresa;
var cantidadSelect;
var idTipoServicio;
var idUnidadGestion;

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("SeguimientoNegocios/ListarCheckListCsv?idUsuario=" + idUsuario, CrearTablaCsv);
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaCheckList.value = fechaActual;

    btnGrabarCheckList.onclick = function () {
        var inicio = 1;
        var lstPuntajes = 0;
        var lstDescripciones = 0;
        while (inicio <= cantidadSelect) {
            var seleccion = "select" + inicio;
            var descripcion = "input" + inicio;
            lstPuntajes = lstPuntajes + document.getElementById(seleccion).value + "|";
            lstDescripciones = lstDescripciones + document.getElementById(descripcion).value + "|";
            inicio = inicio +1;
        }

        lstPuntajes = lstPuntajes.substring(1, lstPuntajes.length);
        lstPuntajes = lstPuntajes.substring(0, lstPuntajes.length - 1);

        lstDescripciones = lstDescripciones.substring(1, lstDescripciones.length);
        lstDescripciones = lstDescripciones.substring(0, lstDescripciones.length - 1);

        
        var frm = new FormData();
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("fechaPuntaje", txtFechaCheckList.value);
        frm.append("NumeroEvaluacion", nroEvaluacion.value);
        frm.append("VersionCheckList", versionCheckList.value);
        frm.append("FK_ID_TRABAJADOR", idUsuario);
        frm.append("FK_ID_UnidadGestion", idUnidadGestion);
        frm.append("FK_ID_TipoServicio", idTipoServicio);
        frm.append("PUNTAJES", lstPuntajes);
        frm.append("DESCRIPCIONES", lstDescripciones);
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarCheckList);
            Http.post("SeguimientoNegocios/CheckListOperacion?op=I", MostrarRegistroCheckList, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }

    function checkSubmit(boton) {
        boton.value = "Enviando...";
        boton.disabled = true;
        return true;
    }

    txtbuscarPorEmpresa.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtbuscarPorEmpresa.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
                b.addEventListener("click", function (e) {
                    txtbuscarPorEmpresa.value = this.getElementsByTagName("input")[0].value;
                    idEmpresa = objeto.IDEmpr;
                    idTipoEmpresa = objeto.TipoEmpresa;
                    obtenerTipoServicio(objeto.TipoEmpresa);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }

    cboTipoServicio.onchange = function () {
        idTipoServicio = cboTipoServicio.value;
        Http.get("SeguimientoNegocios/ListarCantidadPreguntasChecklistCsv?tipoEmpresa=" + idTipoEmpresa + "&tipoServicio=" + cboTipoServicio.value, mostrarPreguntas);
    }

    bntNuevo.onclick = function () {
        location.reload();
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
function obtenerTipoServicio(tipoEmpresa) {
    Http.get("SeguimientoNegocios/ListarTipoOperacionEmpresaCsv?tipoEmpresa=" + tipoEmpresa, mostrarTipoServicioCbo);
}
function MostrarRegistroInspeccion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}

function mostrarTipoServicioCbo(rpta) {
    if (rpta) {
        lstCboTipoServicio = rpta.split("¬");
        if (lstCboTipoServicio.length >= 2) {
            tipoServicio.style.display = "inline-block";
            CrearCombo(lstCboTipoServicio, cboTipoServicio, "Seleccione");
        }
        else {
            lstCboTipoDeServicio = lstCboTipoServicio[0].split("|");
            idTipoServicio = lstCboTipoDeServicio[0];
            Http.get("SeguimientoNegocios/ListarCantidadPreguntasChecklistCsv?tipoEmpresa=" + idTipoEmpresa + "&tipoServicio=" + lstCboTipoDeServicio[0], mostrarPreguntas);
        }
            
    }
    else {
        limpiarControles('form-control');
        toastDangerAlert("La empresa Seleciona no Presta algun Servicio", "¡Error!");
    }
}
function mostrarPreguntas(rpta) {
    if (rpta) {
        lstPreguntas = rpta.split('¬');
        lstCabeceras = lstPreguntas[0].split('|');
        lstValores = lstPreguntas[1].split('|');
        var b;
        idUnidadGestion = lstValores[5];
        cantidadSelect = lstValores[3];
        for (var i = 1; i <= lstValores[3]; i++) {
            b = document.createElement("div");
            b.innerHTML = "<label>N° : " + i + "</label>&nbsp; &nbsp; &nbsp; ";
            b.innerHTML += "<span>Puntuacion</span>&nbsp; ";
            if (lstValores[2] == 1) {
                b.innerHTML += "<select class='form-control-sm E' id='select" + i + "' required='required'><option value='0'>0</option><option value='1'>1</option>";
            }
            else {
                b.innerHTML += "<select class='form-control-sm E' id='select" + i + "' required='required'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option>";
            }
            b.innerHTML += "<input type='text' id='input" + i + "' placeholder='Detalle Item " + i + "'/></div >";
            document.getElementById('preguntas').appendChild(b);
        }
        datosServicio.style.display = "inline-block";
        document.getElementById('nombreTipoEmpresa').value = lstValores[0];
        document.getElementById('nombreTipoServicio').value = lstValores[1];
        document.getElementById('nroEvaluacion').value = lstValores[2];
        document.getElementById('versionCheckList').value = lstValores[4];
        document.getElementById('UnidadGestion').value = lstValores[6];
        
    }
    else
        toastDangerAlert("El tipo de empresa no cuenta con CheckList", "¡Error!");
}
function MostrarRegistroCheckList(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
        location.reload();
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
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