var idUsuario
var idEmpresa;
var idTipoEmpresa;
var objetoParametrizado = [];
var objetoParametrizadoTrabajador = [];
var objetoParametrizadoTemaImplementacion = [];
var objetoBusqueda = [];
var objetoBusquedaTrabajador = [];
var objetoBusquedaTemaImplementacion = [];
var filtro;
var textoBusqueda;
var textoBusquedaTrabajador;
var textoBusquedaTemaImplementacion;
var idTrabajadorImplementado;
var DNITrabajador;
var idTemaImplementacion;
var FK_ID_UnidadGestion;
var lstTrabajadoresImplementacion;
//var contadorTrabajdoresCapacitados = 0; 

window.onload = function () {
    if (!isMobile.any()) {
        idUsuario = window.sessionStorage.getItem('idUsuario');
        Http.get("Cheff/ListarImplementacionesCsv?idUsuario=" + idUsuario, CrearTablaCsv); 
        Http.get("Incidencia/ListarComedorBusquedaCsv", CrearListaCsv);
        Http.get("Incidencia/ListarTrabajadorBusquedaCsv", CrearListaTrabajadorCsv);
        Http.get("Cheff/ListarEstadoImplementacionCsv", mostrarEstadoImplementacionCbo);

        var divRows = document.getElementsByClassName('form-row');
        for (var i = 0; i < divRows.length; i++) {
            divRows[i].classList.add("row-eq-spacing-sm");
        }
    }
    obtenerfechaActual();

    txtFechaImplementacion.value = fechaActual;

    btnGrabarImplementacion.onclick = function () {
        if (lstTrabajadoresImplementacion === undefined) {
            lstTrabajadoresImplementacion = 0;
        } else {
            lstTrabajadoresImplementacion = lstTrabajadoresImplementacion.substring(9, lstTrabajadoresImplementacion.length);
            lstTrabajadoresImplementacion = lstTrabajadoresImplementacion.substring(0, lstTrabajadoresImplementacion.length - 1);
        }
        var frm = new FormData();
        if (idTemaImplementacion === undefined) {
            toastDangerAlert("Digite y Seleccione el Tema de  Implementación*", "¡Aviso!");
        }
        frm.append("FK_ID_Empresa", idEmpresa);
        frm.append("Id_usuario", idUsuario);
        frm.append("FechaImplementacion", txtFechaImplementacion.value);
        frm.append("FK_ID_TemaImplementacion", idTemaImplementacion);
        frm.append("FK_ID_EstadoImplementacion", cboEstadoImplementacion.value);
        frm.append("NumeroAsistentes", lstTrabajadoresImplementacion);
        if (validarRequeridos('E')) {
            checkSubmit(btnGrabarImplementacion);
            Http.post("Cheff/ImplementacionCheff?op=I", MostrarRegistroImplementacion, frm);
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
                    FK_ID_UnidadGestion = objeto.UnidadGestion;
                    Http.get("Cheff/ListarTemaImplementacionCsv?tipoServicio=" + 1 + "&FK_ID_UnidadGestion=" + FK_ID_UnidadGestion, ListaTemaImplementacionCsv);
                    temaImplementacion.style.display = "inline-block";
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
    txtBuscarTrabajador.onkeyup = function () {
        var a, b;
        closeAllListsTrabajador();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaTrabajador = txtBuscarTrabajador.value.toLowerCase();
        for (let objeto of objetoBusquedaTrabajador) {
            let Nombre = objeto.NombreApellido.toLowerCase();
            if (Nombre.indexOf(textoBusquedaTrabajador) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreApellido + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreApellido + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscarTrabajador.value = this.getElementsByTagName("input")[0].value;
                    idTrabajadorImplementado = objeto.IDTrab;
                    DNITrabajador = objeto.DNI;
                    agregandoTrabajador();
                    closeAllListsTrabajador();
                });
                a.appendChild(b);
            }
        }
    }
    txtBuscaTemaImplementacion.onkeyup = function () {
        var a, b;
        closeAllListsTemaImplementacion();
        a = document.createElement("div");
        a.setAttribute("id", this.id + "predictivo-list");
        a.setAttribute("class", "predictivo-items");
        this.parentNode.appendChild(a);
        textoBusquedaTemaImplementacion = txtBuscaTemaImplementacion.value.toLowerCase();
        for (let objeto of objetoBusquedaTemaImplementacion) {
            let Nombre = objeto.NombreTemaImple.toLowerCase();
            if (Nombre.indexOf(textoBusquedaTemaImplementacion) !== -1) {
                b = document.createElement("div");
                b.innerHTML = "<strong>" + objeto.NombreTemaImple + "</strong>";
                //b.innerHTML += Nombre;
                b.innerHTML += "<input type='hidden' value='" + objeto.NombreTemaImple + "'>";
                b.addEventListener("click", function (e) {
                    txtBuscaTemaImplementacion.value = this.getElementsByTagName("input")[0].value;
                    idTemaImplementacion = objeto.IDTemaImple;
                    closeAllListsTemaImplementacion();
                });
                a.appendChild(b);
            }
        }
    }

    bntNuevo.onclick = function () {
        location.reload();
    }
}


function agregandoTrabajador () {
    if (txtBuscarTrabajador.value != "") {
        if (idTrabajadorImplementado === undefined) {
            toastDangerAlert("Seleccione un trabajador para ser agregado en la capacitación", "¡Error!");
        }
        else {
            lstTrabajadoresImplementacion = lstTrabajadoresImplementacion + idTrabajadorImplementado + "|";
            var b;
            //contadorTrabajdoresCapacitados = contadorTrabajdoresCapacitados + 1;
            b = document.createElement("tr");
            b.innerHTML = "<td>" + txtBuscarTrabajador.value.substring(0, txtBuscarTrabajador.value.length - 8); + "</td>";
            b.innerHTML += "<td>" + DNITrabajador + "</td>";
            //b.innerHTML += "<td><button class='btn btn-danger' id='bnt" + contadorTrabajdoresCapacitados + "'><i class='bi bi-x'>X</i></button></td>";
            document.getElementById('TrabajadoresImplementacion').appendChild(b);
            txtBuscarTrabajador.value = "";
            idTrabajadorImplementado = undefined;
        }
    } else toastDangerAlert("Digite datos del trabajador", "¡Error!"); 
}
function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != textoBusqueda) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
function closeAllListsTrabajador(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != objetoBusquedaTrabajador) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
function closeAllListsTemaImplementacion(elmnt) {
    var x = document.getElementsByClassName("predictivo-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != objetoBusquedaTemaImplementacion) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

function mostrarEstadoImplementacionCbo(rpta) {
    if (rpta) {
        lstCboEstadoCapacitacion = rpta.split("¬");
        CrearCombo(lstCboEstadoCapacitacion, cboEstadoImplementacion, "Seleccione");
    }
}
function MostrarRegistroImplementacion(rpta) {
    if (rpta) {
        toastSuccessAlert("El registro se guardo correctamente", "¡Exito!");
        limpiarControles('form-control');
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
function CrearListaTrabajadorCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoTrabajador(lista)
    }
}
function ListaTemaImplementacionCsv(rpta) {
    if (rpta) {
        lista = rpta.split('¬');
        crearObjetoTemaImplementacion(lista)
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
function crearObjetoTrabajador() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    objetoBusquedaTrabajador = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoTrabajador.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoTrabajador[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaTrabajador.push(valoresAInsertar);
    }
}
function crearObjetoTemaImplementacion() {
    //crea el objeto para busqueda segun los datos
    cabeceras = lista[0].split("|");
    var nRegistros = lista.length;
    var nCampos = cabeceras.length;
    //objetoBusquedaTemaCapacitacion = [];
    //var nCamposObejetoFinal = 3;
    var clave;
    var valor;
    for (var i = 1; i <= nRegistros - 1; i++) {
        for (var j = 0; j < nCampos; j++) {
            datos = lista[i].split("|");
        }
        objetoParametrizadoTemaImplementacion.push(datos);
    }
    for (var i = 0; i < nRegistros - 1; i++) {
        var valoresAInsertar = {};
        //console.log(i);
        for (var j = 0; j < nCampos; j++) {
            clave = cabeceras[j];
            valor = objetoParametrizadoTemaImplementacion[i][j];
            //console.log(valor);
            Object.defineProperty(valoresAInsertar, clave.toString(), {
                value: valor,
                writable: false
            });
        }
        objetoBusquedaTemaImplementacion.push(valoresAInsertar);
    }
   
}