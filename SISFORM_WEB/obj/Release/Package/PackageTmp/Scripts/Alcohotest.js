var idUsuario;
var idEmpresa;
var varhora='00:00:00';
var objetoParametrizado = [];
var ID_RegistroAlcohotest;

var objetoParametrizadoAllEmpresas = [];
var objetoBusquedaAllEmpresas = [];

var objetoBusqueda = [];
var filtro;
var textoBusqueda;
var cantidadTrabajadores;
var lstActualizacion = [];
var lstTrabajadores;


window.onload = function () {
    if (!isMobile.any()) {

        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        Http.get("Incidencia/ListarTrabajadorBusquedaCsv", CrearListaCsvAllEmpresas);

        //funcion para crear la lista general
        //Listar registros
        Http.get("Alcohotest/ListarRegistroAlcohotest", CrearTablaCsv);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }

    }

    //Codigo provisional 
    var rptaturno = '1|Dia¬2|Noche';
    lstCboTurno = rptaturno.split('¬');
    CrearCombo(lstCboTurno, cboTurnos, "Seleccione");
    //Codigo Provisional,
    var rptaresultado = '1|NEGATIVO¬2|POSITIVO';
    lstCboResultado = rptaresultado.split('¬');
    CrearCombo(lstCboResultado, cboResultados, "Seleccione");

    //Boton Grabar
    btnGrabar.onclick = function () {
        var frm = new FormData();

        if (ID_RegistroAlcohotest) {
            frm.append("ID_RegistroAlcohotest", ID_RegistroAlcohotest);
        }
        
        //frm.append("ID_RegistroAlcohotest", ID_RegistroAlcohotest);
        //frm.append("FK_ID_Empresa", (idEmpresa == "" ? "0" : idEmpresa));
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("FK_ID_Trabajador", idRepresentante);
        frm.append("FK_ID_Usuario", window.sessionStorage.getItem('idUsuario'));
        frm.append("fecha", dtFechaPrueba.value);  
        frm.append("hora", varhora);
        frm.append("FK_ID_Turno", cboTurnos.value);
        frm.append("FK_ID_Resultado", cboResultados.value);
        frm.append("codigo", txtCodigoPruebaAlc.value);
        frm.append("detalles", txtdetalleRegAlcohotest.value);
        //frm.append("razonSocial", txtRazonSocial.value);
        //frm.append("tieneRuc", (txtTieneRuc.checked == true ? "SI" : "NO"));
        //frm.append("regimenTributario", cboRegimenTributario.value);
        //frm.append("tipoPersona", cboTipoPersona.value);
        //frm.append("ruc", txtRuc.value);
        //frm.append("telefono", txtTelefono.value);
        //frm.append("direccion", txtDireccion.value);
        ////frm.append("estado", (txtEstado.checked == true ? "ACT" : "ANU"));
        //frm.append("FK_ID_UsuarioCrea", window.sessionStorage.getItem('idUsuario'));
        //frm.append("email", txtEmail.value);
        //frm.append("FK_ID_UnidadGestion", cboUnidadGestion.value);
        //frm.append("FK_ID_EstadoEmpresa", CboEstadoEmpresa.value);
        //frm.append("FK_ID_TrabajadorRepresentante", idRepresentante);
        //frm.append("latitud", txtLatitud.value);
        //frm.append("longitud", txtLongitud.value);
        //frm.append("asociado", (txtAsociado.checked == true ? 1 : 0));
        //frm.append("inicioActividades", txtFechaInicioActividades.value);
        if (validarRequeridos('E')) {
           // checkSubmit(btnGrabar);
            Http.post("Alcohotest/Grabar", MostrarGrabar, frm);
        } else toastDangerAlert("Ingrese todos los campos obligatorios*", "¡Aviso!");
    }
    
    //Buscar Empresa - guardamos el valor seleccionado en idEmpresa 
    txtBuscarPorEmpresaAlcohotest.onkeyup = function () {
        var a, b;
        closeAllLists();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusqueda = txtBuscarPorEmpresaAlcohotest.value.toLowerCase();
        for (let objeto of objetoBusqueda) {
            let Nombre = objeto.NombreComercial.toLowerCase();
            if (Nombre.indexOf(textoBusqueda) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";

                b.addEventListener("click", function (e) {
                    txtBuscarPorEmpresaAlcohotest.value = this.getElementsByTagName("input")[0].value;
                    idEmpresa = objeto.IDEmpr;
                    //Http.get("Trabajador/ListarTrabajadorPorEmpresaCsv?idEmpresa=" + idEmpresa, mostrarTrabajadoresEmpresa);
                    //btnActualizar.style.display = "inline-block";
                    closeAllLists();

                    txtBuscarPorEmpresaAlcohotest.disabled = true;

                });
                a.appendChild(b);
            }
        }
    }
    //Buscar Trabajador
    txtTrabajadorAlcohotest.onkeyup = function () {
        var a, b;
        closeAllListsAllEmpresas();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaTrabajador = txtTrabajadorAlcohotest.value.toLowerCase();
        for (let objeto of objetoBusquedaAllEmpresas) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusquedaTrabajador) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtTrabajadorAlcohotest.value = this.getElementsByTagName("input")[0].value;
                    idRepresentante = objeto.IDTrab;
                    closeAllListsAllEmpresas();
                });
                a.appendChild(b);
            }
        }
    }

    //limpiar y recargar
    bntNuevo.onclick = function () {
        limpiarControles('form-control');
        location.reload();
    }

}

//
function MostrarGrabar(rpta) {
    if (rpta) {
        if (!isMobile.any()) {
            Http.get("Alcohotest/ListarRegistroAlcohotest", CrearTablaCsv);
        }
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        //txtIdAlcohotest.value = rpta;
        //btnModalObs.style.visibility = "hidden";
        //btnModalLic.style.visibility = "hidden";
        //btnModalSal.style.visibility = "hidden";
        //btnModalDef.style.visibility = "hidden";
        //btnNuevo.style.visibility = "visible";
        btnGrabar.style.visibility = "hidden";
    }
    else toastDangerAlert("No se pudo grabar el registro", "¡Error!");
}


//Cerramos lista de Trabajadores
function closeAllListsAllEmpresas(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusquedaTrabajador) {
            x[i].parentNode.removeChild(x[i]);
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

//Crea Lista Lista Trabajador
function CrearListaCsvAllEmpresas(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoAllEmpresas(lista)
    }
}




//Crear Objeto para trabajador
function crearObjetoAllEmpresas() {
    //este objeto es para el predictivo
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusquedaAllEmpresas = [];
    var clave;
    var valor;
    for (var i = 1; i < nRegistros; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoAllEmpresas.push(datos);
    }
    for (var i = 0; i <= nRegistros - 2; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoAllEmpresas[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaAllEmpresas.push(valoresAInsertar);
    }
}






//crear lista para Empresa
function CrearListaCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjeto(lista)
    }
}


//Crear el Objeto para Empresa
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


//Listar Tabla
function CrearTablaCsv(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTabla", 10, 3);
    }
}

//Listar Tabla
function CrearTablaCsvObs(rpta) {
    if (rpta) {
        var lista = rpta.split('¬');
        var grilla = new Grilla(lista, "divTablaObs", 5, 3);
    }
}


//asignar campos de la lista grilla (list)

function obtenerRegistroPorId(id) {
    Http.get("Alcohotest/ObtenerRegistroAlcohotestPorIdCsv?IDRegistroAlcohotest=" + id, AsignarCampos);
}

function AsignarCampos(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        txtIdAlcohotest.value = campos[0];
        ID_RegistroAlcohotest = campos[0];
        idEmpresa = campos[1];
        txtBuscarPorEmpresaAlcohotest.value = campos[2];
        idRepresentante = campos[3];
        txtTrabajadorAlcohotest.value = campos[5];
        dtFechaPrueba.value = campos[6];
        cboTurnos.value = campos[7];
        varhora = campos[8];
        cboResultados.value = campos[9];
        txtCodigoPruebaAlc.value = campos[10];
        txtdetalleRegAlcohotest.value = campos[11];
        //txtSede.value = campos[8];
        //txtAñoFabricacion.value = campos[9];
        //txtFechaVencimientoSOAT.value = campos[10];
        //txtBrevete.value = campos[11];
        //txtCantidadCoolers.value = campos[12];
        //txtCirculacionSUNARP.value = campos[13];
        //txtVinculoVehiculo.value = campos[14];
        //txtFechaInspeccionTecnica.value = campos[15]
        //txtSeguroContraTerceros.value = campos[16];
        //txtCategoriaVehiculo.value = campos[17];
        //txtCombustible.value = campos[18];
        //txtfechaSeguroContraTerceros.value = campos[19];

        //txtVehiculoActivo.checked = (campos[20] == 1 ? true : false); /*lineaadd*/


    } else limpiarControles('form-control-modal');
}






