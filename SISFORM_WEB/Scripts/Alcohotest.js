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

var idPuestoTrabajo;


let fechaActual = new Date();
let horaActual = new Date();


window.onload = function () {
    if (!isMobile.any()) {

        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Incidencia/ListarEmpresaBusquedaCsv", CrearListaCsv);
        Http.get("Incidencia/ListarTrabajadorBusquedaCsv", CrearListaCsvAllEmpresas);
        //focus
        document.getElementById("txtDNITrabajador").focus();
        //funcion para crear la lista general
        //Listar registros
        Http.get("Alcohotest/ListarRegistroAlcohotest", CrearTablaCsv);
            
        var fechaConsultaCodigo = fechaActual.toISOString().split('T')[0];
        txtCodigoPruebaAlc.value = Http.get("Alcohotest/ObtenerCodigoAlcohotestActualCsv?BuscarFechaCodigo=" + fechaConsultaCodigo, ActualizarFechaCodigo);

        

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }

    }

    //Codigo provisional 
    var rptaturno = '1|Dia¬2|Noche¬3|Tarde';
    lstCboTurno = rptaturno.split('¬');
    CrearCombo(lstCboTurno, cboTurnos, "Seleccione");
    //Codigo Provisional,
    var rptaresultado = '1|NEGATIVO¬2|POSITIVO';
    lstCboResultado = rptaresultado.split('¬');
    CrearCombo(lstCboResultado, cboResultados, "Seleccione");

    //pre cargar Codigo de Prueba
    //console.log(horaActual.getHours());

    //PRE CARGADO DE DATOS NUEVOS 
    dtFechaPrueba.value = fechaActual.toISOString().split('T')[0];
    
    //Turno
    if      ( ((horaActual.getHours()) >= 3 ) && (( horaActual.getHours()) <= 8))
    {
        cboTurnos.value = '1';
    }
    else if ( ((horaActual.getHours()) >= 9 ) && (( horaActual.getHours()) <= 14))
    {
        cboTurnos.value = '3';
    }
    else if (((horaActual.getHours()) >= 15) && ((horaActual.getHours()) <= 21)) 
    {
        cboTurnos.value = '2';
    }

    cboResultados.value = '1';
    //txtCodigoPruebaAlc.value -> se tiene que obtener el ultimo codigo ingresado

    

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
        frm.append("FK_ID_puestoTrabajo", cboPuestoTrabajo.value);

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

                    //llamar a funcion que buscara los cargos
                    listarPuestoTrabajo();

                    closeAllLists();


                    //txtBuscarPorEmpresaAlcohotest.disabled = true;

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

    //para buscar los puestos de trabajo, luego de seleccionar empresa
    //txtbuscarPorEmpresa.onkeyup = function () {
    //    var a, b;
    //    closeAllLists();
    //    a = document.createElement("div");
    //    a.setAttribute("id", this.id + "predictivo-list");
    //    a.setAttribute("class", "predictivo-items");
    //    this.parentNode.appendChild(a);
    //    textoBusqueda = txtbuscarPorEmpresa.value.toLowerCase();
    //    for (let objeto of objetoBusqueda) {
    //        let Nombre = objeto.NombreComercial.toLowerCase();
    //        if (Nombre.indexOf(textoBusqueda) !== -1) {
    //            b = document.createElement("div");
    //            b.innerHTML = "<strong>" + objeto.NombreComercial + "</strong>";
    //            b.innerHTML += "<input type='hidden' value='" + objeto.NombreComercial + "'>";
    //            b.addEventListener("click", function (e) {
    //                txtbuscarPorEmpresa.value = this.getElementsByTagName("input")[0].value;
    //                idEmpresaPuesto = objeto.IDEmpr;
    //                listarPuestoTrabajo();
    //                closeAllLists();
    //            });
    //            a.appendChild(b);
    //        }
    //    }
    //}



}

function listarPuestoTrabajo() {
    //idEmpresa = campos[1];
    
    Http.get("Trabajador/ListarPuestoTrabajoPorEmpresaCboCsv?idEmpresa=" + idEmpresa, mostrarPuestoTrabajoCbo);
    //console.log(idEmpresa);

}

function mostrarPuestoTrabajoCbo(rpta) {
    if (rpta) {
        lstCboPuesto = rpta.split("¬");
        CrearCombo(lstCboPuesto, cboPuestoTrabajo, "Seleccione");

        //asignamos el cargo
        cboPuestoTrabajo.value = idPuestoTrabajo;//campos[12];

    }
}


function ActualizarFechaCodigo(rpta) {
    if (rpta) {
        campos = rpta.split('|');
        txtCodigoPruebaAlc.value = campos[0];
        toastSuccessAlert("Datos Cargados!", "¡Exito!");
        
        
    }
    else toastDangerAlert("No se Registro Codigo del Día!");
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

        idPuestoTrabajo = campos[12];

        idEmpresa = campos[1];

        listarPuestoTrabajo();
        //setTimeout('', 10000);

        txtBuscarPorEmpresaAlcohotest.value = campos[2];
        
        idRepresentante = campos[3];
        txtTrabajadorAlcohotest.value = campos[5];
        dtFechaPrueba.value = campos[6];
        cboTurnos.value = campos[7];
        varhora = campos[8];
        cboResultados.value = campos[9];
        txtCodigoPruebaAlc.value = campos[10];
        txtdetalleRegAlcohotest.value = campos[11];

        //cboPuestoTrabajo.value = campos[12];


        //cboPuestoTrabajo.value = campos[12];

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


function consulta(e) {
    // continuar 18 05 2022 
    if (e.keyCode === 13 && !e.shiftKey) {       

        Http.get("Alcohotest/ObtenerRegistroAlcohotestPorDNICsv?DNIRegistroAlcohotest=" + txtDNITrabajador.value, AsignarCamposBusqueda);

    }
}

function AsignarCamposBusqueda(rpta) {
    if (rpta) {
        
        var campos = rpta.split('|');
        idEmpresa = campos[1];
        idPuestoTrabajo = campos[12];
        listarPuestoTrabajo();

        txtBuscarPorEmpresaAlcohotest.value = campos[2];
        idRepresentante = campos[3];
        txtTrabajadorAlcohotest.value = campos[5];
        
        cboPuestoTrabajo.value = campos[12];

        toastSuccessAlert("Registro encontrado con Exito!");

    }
    else {

        toastDangerAlert("Registro no Encontrado!");
        txtDNITrabajador.value = "";
        
    }
}



